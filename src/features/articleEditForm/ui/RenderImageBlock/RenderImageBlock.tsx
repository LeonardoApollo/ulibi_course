import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleImageBlock } from '@/entities/Article';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { articleEditFormSliceActions } from '../../model/slice/articleEditFormSlice';
import cls from './RenderImageBlock.module.scss';

interface RenderImageBlockProps {
    className?: string;
    block: ArticleImageBlock;
}

export const RenderImageBlock = memo((props: RenderImageBlockProps) => {
    const { t } = useTranslation('articleForm');
    const { className, block } = props;
    const dispatch = useAppDispatch();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [newBlock, setNewBlock] = useState<ArticleImageBlock>(block);

    const onSrcChange = (value: string) => {
        setNewBlock({ ...newBlock, src: value });
    };

    const onTitleChange = useCallback(
        (value: string) => {
            setNewBlock({ ...newBlock, title: value });
        },
        [newBlock],
    );

    const onClickHandle = (isDisabled: boolean) => () => {
        if (isDisabled) {
            setIsDisabled(false);
        } else {
            dispatch(
                articleEditFormSliceActions.updateImageBlock({
                    ...newBlock,
                }),
            );
            setIsDisabled(true);
        }
    };

    return (
        <VStack max gap="16" align="center" className={className}>
            <HStack max justify="between">
                <Text text={t('Изображение')} />
                <Button onClick={onClickHandle(isDisabled)}>
                    {isDisabled ? t('Изменить') : t('Сохранить')}
                </Button>
            </HStack>
            <Input
                readonly={isDisabled}
                onChange={onTitleChange}
                label={t('Название')}
                value={newBlock.title}
            />
            {newBlock.src && (
                <AppImage
                    className={cls.img}
                    fallback={<Skeleton width={300} height={150} />}
                    errorFallback={
                        <Text
                            align="center"
                            variant="error"
                            text={t('Ошибка загрузки изображения')}
                            className={cls.Error}
                        />
                    }
                    src={newBlock.src}
                />
            )}
            <Input
                readonly={isDisabled}
                onChange={onSrcChange}
                label={t('Ссылка')}
                value={newBlock.src}
            />
        </VStack>
    );
});
