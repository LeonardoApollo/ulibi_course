import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArticleBlock, ArticleBlockType } from '@/entities/Article';

import arrowLeft from '@/shared/assets/icons/ArrowLeft.svg';
import arrowRight from '@/shared/assets/icons/ArrowRight.svg';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { getArticleEditBlocks } from '../../model/selectors/getArticleEditFormData';
import { articleEditFormSliceActions } from '../../model/slice/articleEditFormSlice';
import { RenderCodeBlock } from '../RenderCodeBlock/RenderCodeBlock';
import { RenderImageBlock } from '../RenderImageBlock/RenderImageBlock';
import { RenderTextBlock } from '../RenderTextBlock/RenderTextBlock';
import cls from './ArticleEditBlocks.module.scss';

interface ArticleEditBlocksProps {
    className?: string;
    handleErrors: (action: any) => void;
}

export const ArticleEditBlocks = memo((props: ArticleEditBlocksProps) => {
    const { t } = useTranslation('articleForm');
    const { className, handleErrors } = props;
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

    const onDeleteBlockHandle = useCallback(
        (block: ArticleBlock) => () => {
            dispatch(articleEditFormSliceActions.deleteBlock(block));
        },
        [dispatch],
    );

    const onBlockMoveUp = useCallback(
        (index: number) => () => {
            dispatch(
                articleEditFormSliceActions.changeBlockPosition({
                    from: index,
                    to: index - 1,
                }),
            );
        },
        [dispatch],
    );

    const onBlockMoveDown = useCallback(
        (index: number) => () => {
            dispatch(
                articleEditFormSliceActions.changeBlockPosition({
                    from: index,
                    to: index + 1,
                }),
            );
        },
        [dispatch],
    );

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
            {blocks?.map((block, index) => {
                if (block.type === ArticleBlockType.TEXT) {
                    return (
                        <VStack max gap="8" key={block.id}>
                            <div className={cls.blockWrapper}>
                                <RenderTextBlock
                                    block={block}
                                    handleErrors={handleErrors}
                                />
                                <HStack max gap="16">
                                    <Icon
                                        clickable
                                        onClick={onBlockMoveUp(index)}
                                        disabled={index === 0}
                                        className={cls.btnUp}
                                        Svg={arrowRight}
                                    />
                                    <Button
                                        colorType="error"
                                        onClick={onDeleteBlockHandle(block)}
                                        className={cls.deleteBtn}
                                    >
                                        {t('Удалить блок')}
                                    </Button>
                                    <Icon
                                        clickable
                                        onClick={onBlockMoveDown(index)}
                                        disabled={index === blocks.length - 1}
                                        className={cls.btnDown}
                                        Svg={arrowLeft}
                                    />
                                </HStack>
                            </div>
                        </VStack>
                    );
                }
                if (block.type === ArticleBlockType.CODE) {
                    return (
                        <VStack max gap="8" key={block.id}>
                            <div className={cls.blockWrapper}>
                                <RenderCodeBlock
                                    block={block}
                                    handleErrors={handleErrors}
                                />
                                <HStack max gap="16">
                                    <Icon
                                        clickable
                                        onClick={onBlockMoveUp(index)}
                                        disabled={index === 0}
                                        className={cls.btnUp}
                                        Svg={arrowRight}
                                    />
                                    <Button
                                        colorType="error"
                                        onClick={onDeleteBlockHandle(block)}
                                        className={cls.deleteBtn}
                                    >
                                        {t('Удалить блок')}
                                    </Button>
                                    <Icon
                                        clickable
                                        onClick={onBlockMoveDown(index)}
                                        disabled={index === blocks.length - 1}
                                        className={cls.btnDown}
                                        Svg={arrowLeft}
                                    />
                                </HStack>
                            </div>
                        </VStack>
                    );
                }
                if (block.type === ArticleBlockType.IMAGE) {
                    return (
                        <VStack max gap="16" key={block.id}>
                            <div className={cls.blockWrapper}>
                                <RenderImageBlock
                                    block={block}
                                    handleErrors={handleErrors}
                                />
                                <HStack max gap="16">
                                    <Icon
                                        clickable
                                        onClick={onBlockMoveUp(index)}
                                        disabled={index === 0}
                                        className={cls.btnUp}
                                        Svg={arrowRight}
                                    />
                                    <Button
                                        colorType="error"
                                        onClick={onDeleteBlockHandle(block)}
                                        className={cls.deleteBtn}
                                    >
                                        {t('Удалить блок')}
                                    </Button>
                                    <Icon
                                        clickable
                                        onClick={onBlockMoveDown(index)}
                                        disabled={index === blocks.length - 1}
                                        className={cls.btnDown}
                                        Svg={arrowLeft}
                                    />
                                </HStack>
                            </div>
                        </VStack>
                    );
                }
                return null;
            })}
        </VStack>
    );
});
