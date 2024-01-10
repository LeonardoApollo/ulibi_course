import { ChangeEvent, Children, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleTextBlock } from '@/entities/Article';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { articleEditFormSliceActions } from '../../model/slice/articleEditFormSlice';
import cls from './RenderTextBlock.module.scss';

interface RenderTextBlockProps {
    className?: string;
    handleErrors: (action: any) => void;
    block: ArticleTextBlock;
}

export const RenderTextBlock = memo((props: RenderTextBlockProps) => {
    const { t } = useTranslation('articleForm');
    const { className, block, handleErrors } = props;
    const dispatch = useAppDispatch();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [newBlock, setNewBlock] = useState<ArticleTextBlock>(block);
    const [paragraphs, setParagraphs] = useState<string[]>(block.paragraphs);
    const [isError, setIsError] = useState<boolean>(false);

    const onClickHandle = (isDisabled: boolean) => () => {
        if (isDisabled) {
            setIsDisabled(false);
            return;
        }
        if (!newBlock.title || newBlock.title.length < 3) {
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
            articleEditFormSliceActions.updateTextBlock({
                ...newBlock,
                paragraphs,
            }),
        );
        setIsDisabled(true);
    };

    const onTitleChange = (value: string) => {
        setNewBlock({ ...newBlock, title: value });
    };

    const onChangeParagraph =
        (idx: number) => (e: ChangeEvent<HTMLTextAreaElement>) => {
            setParagraphs(
                paragraphs.map((paragraph, innerIdx) => {
                    if (innerIdx !== idx) {
                        return paragraph;
                    }
                    return e.target.value;
                }),
            );
        };

    const onAddParagraph = () => {
        setParagraphs([...paragraphs, '']);
    };

    const onDeleteParagraph = (idx: number) => () => {
        setParagraphs(paragraphs.filter((_, innerIdx) => innerIdx !== idx));
    };

    return (
        <VStack max gap="16" className={className}>
            {isError && (
                <Text
                    variant="error"
                    text={t('Минимальная длина заголовка 3 символа')}
                />
            )}
            <HStack max gap="24" justify="between">
                <Text text={t('Текст')} />

                <HStack gap="24">
                    <Button
                        disabled={isDisabled}
                        colorType="success"
                        onClick={onAddParagraph}
                    >
                        {t('Добавить параграф')}
                    </Button>
                    <Button onClick={onClickHandle(isDisabled)}>
                        {isDisabled ? t('Изменить') : t('Сохранить')}
                    </Button>
                </HStack>
            </HStack>
            <Input
                readonly={isDisabled}
                onChange={onTitleChange}
                label={t('Заголовок')}
                value={newBlock.title}
            />
            {Children.toArray(
                paragraphs.map((paragraph, idx) => (
                    <HStack max gap="16">
                        <VStack gap="8" align="center">
                            <Text text={t('Параграф')} />
                            <Button
                                disabled={isDisabled}
                                onClick={onDeleteParagraph(idx)}
                                colorType="error"
                                variant="filled"
                            >
                                {t('Удалить')}
                            </Button>
                        </VStack>
                        <textarea
                            disabled={isDisabled}
                            maxLength={1000}
                            value={paragraph}
                            onChange={onChangeParagraph(idx)}
                            className={cls.textarea}
                        />
                    </HStack>
                )),
            )}
        </VStack>
    );
});
