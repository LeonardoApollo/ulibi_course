import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArticleBlock, ArticleBlockType } from '@/entities/Article';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { getArticleEditBlocks } from '../../model/selectors/getArticleEditFormData';
import { articleEditFormSliceActions } from '../../model/slice/articleEditFormSlice';
import { RenderCodeBlock } from '../RenderCodeBlock/RenderCodeBlock';
import { RenderImageBlock } from '../RenderImageBlock/RenderImageBlock';
import { RenderTextBlock } from '../RenderTextBlock/RenderTextBlock';

interface ArticleEditBlocksProps {
    className?: string;
}

export const ArticleEditBlocks = memo((props: ArticleEditBlocksProps) => {
    const { t } = useTranslation('articleForm');
    const { className } = props;
    const id = Math.floor(Date.now() + Math.random() * 100).toString(16);
    const dispatch = useAppDispatch();
    const blocks = useSelector(getArticleEditBlocks);

    const onAddTextBlockHandle = () => {
        dispatch(
            articleEditFormSliceActions.addBlock({
                id,
                type: ArticleBlockType.TEXT,
                title: '',
                paragraphs: [],
            }),
        );
    };

    const onAddCodeBlockHandle = () => {
        dispatch(
            articleEditFormSliceActions.addBlock({
                id,
                type: ArticleBlockType.CODE,
                code: '',
            }),
        );
    };

    const onAddImageBlockHandle = () => {
        dispatch(
            articleEditFormSliceActions.addBlock({
                id,
                type: ArticleBlockType.IMAGE,
                title: '',
                src: '',
            }),
        );
    };

    const onDeleteBlockHandle = (block: ArticleBlock) => () => {
        dispatch(articleEditFormSliceActions.deleteBlock(block));
    };

    return (
        <VStack max gap="16" className={className}>
            <HStack max gap="24">
                <Text text={t('Содержание')} />
                <Button onClick={onAddTextBlockHandle}>{t('Текст')}</Button>
                <Button onClick={onAddCodeBlockHandle}>{t('Код')}</Button>
                <Button onClick={onAddImageBlockHandle}>
                    {t('Изображение')}
                </Button>
            </HStack>
            {blocks?.map((block) => {
                if (block.type === ArticleBlockType.TEXT) {
                    return (
                        <VStack max gap="8" key={block.id}>
                            <RenderTextBlock block={block} />
                            <Button
                                colorType="error"
                                onClick={onDeleteBlockHandle(block)}
                            >
                                {t('Удалить')}
                            </Button>
                        </VStack>
                    );
                }
                if (block.type === ArticleBlockType.CODE) {
                    return (
                        <VStack max gap="8" key={block.id}>
                            <RenderCodeBlock block={block} />
                            <Button
                                colorType="error"
                                onClick={onDeleteBlockHandle(block)}
                            >
                                {t('Удалить')}
                            </Button>
                        </VStack>
                    );
                }
                if (block.type === ArticleBlockType.IMAGE) {
                    return (
                        <VStack max gap="16" key={block.id}>
                            <RenderImageBlock block={block} />
                            <Button
                                colorType="error"
                                onClick={onDeleteBlockHandle(block)}
                            >
                                {t('Удалить')}
                            </Button>
                        </VStack>
                    );
                }
                return null;
            })}
        </VStack>
    );
});
