import { LegacyRef, memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleCodeBlock } from '@/entities/Article';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { articleEditFormSliceActions } from '../../model/slice/articleEditFormSlice';
import cls from './RenderCodeBlock.module.scss';

interface RenderCodeBlockProps {
    className?: string;
    handleErrors: (action: any) => void;
    block: ArticleCodeBlock;
}

export const RenderCodeBlock = memo((props: RenderCodeBlockProps) => {
    const { t } = useTranslation('articleForm');
    const { className, block, handleErrors } = props;
    const dispatch = useAppDispatch();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const onClickHandle = (isDisabled: boolean) => () => {
        if (isDisabled) {
            setIsDisabled(false);
            return;
        }
        if (!textareaRef.current?.value) {
            setIsError(true);
            handleErrors({
                type: 'handleError',
                errorBlock: { [block.id]: true },
            });
            return;
        }
        if (isError) {
            setIsError(false);
            handleErrors({
                type: 'handleError',
                errorBlock: { [block.id]: false },
            });
        }
        dispatch(
            articleEditFormSliceActions.updateCodeBlock({
                ...block,
                code: textareaRef.current?.value ?? '',
            }),
        );
        setIsDisabled(true);
    };

    return (
        <VStack gap="16" max className={className}>
            {isError && (
                <Text variant="error" text={t('Блок не может быть пустым')} />
            )}
            <HStack gap="8" max justify="between">
                <Text text={t('Код')} />
                <Button type="button" onClick={onClickHandle(isDisabled)}>
                    {isDisabled ? t('Изменить') : t('Сохранить')}
                </Button>
            </HStack>
            <textarea
                disabled={isDisabled}
                defaultValue={block.code}
                ref={textareaRef as LegacyRef<HTMLTextAreaElement>}
                className={cls.textarea}
                maxLength={350}
            />
        </VStack>
    );
});
