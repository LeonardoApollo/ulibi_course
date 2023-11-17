import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CalendarIcon from '@/shared/assets/icons/Calendar.svg';
import EyeIcon from '@/shared/assets/icons/Eye.svg';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { classNames } from '@/shared/libs/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures, toggleFeatures } from '@/shared/libs/features';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import {
    TextAlign,
    Text as TextDeprecated,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { ArticleBlockType } from '../../model/consts/consts';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetcArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/ArticleDetailsSlice';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from '../ArtilceImageBlockComponent/ArticleImageBlockComponent';
import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

const renderBlock = (block: ArticleBlock) => {
    switch (block.type) {
        case ArticleBlockType.CODE:
            return (
                <ArticleCodeBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        case ArticleBlockType.IMAGE:
            return (
                <ArticleImageBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        case ArticleBlockType.TEXT:
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        default:
            return null;
    }
};

const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
});

const Deprecated = () => {
    const article = useSelector(getArticleDetailsData);
    const { t } = useTranslation('article');
    return (
        <>
            <HStack justify="center" max className={cls.avatarWrapper}>
                <AppImage
                    errorFallback={
                        <TextDeprecated
                            align={TextAlign.CENTER}
                            theme={TextTheme.ERROR}
                            text={t('Ошибка загрузки изображения')}
                            className={cls.Error}
                        />
                    }
                    fallback={
                        <Skeleton width={200} height={200} border="50%" />
                    }
                    border="50%"
                    size={200}
                    src={article?.img}
                    className={cls.avatar}
                />
            </HStack>
            <VStack gap="4" max data-testid="ArticleDetails.Info">
                <TextDeprecated
                    head="h1"
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />
                <HStack gap="8" className={cls.articleInfo}>
                    <IconDeprecated Svg={EyeIcon} className={cls.icon} />
                    <TextDeprecated text={String(article?.views)} />
                </HStack>
                <HStack gap="8" className={cls.articleInfo}>
                    <IconDeprecated Svg={CalendarIcon} className={cls.icon} />
                    <TextDeprecated text={article?.createdAt} />
                </HStack>
            </VStack>
            {article?.blocks.map(renderBlock)}
        </>
    );
};

const Redesigned = () => {
    const article = useSelector(getArticleDetailsData);
    const { t } = useTranslation('article');
    return (
        <>
            <Text head="h1" title={article?.title} size="size_l" bold />
            <Text text={article?.subtitle} size="size_l" />
            <AppImage
                errorFallback={
                    <Text
                        align="center"
                        variant="error"
                        text={t('Ошибка загрузки изображения')}
                        className={cls.Error}
                    />
                }
                fallback={<Skeleton width={200} height={200} border="50%" />}
                border="16px"
                width="100%"
                src={article?.img}
                className={cls.img}
            />
            {article?.blocks.map(renderBlock)}
        </>
    );
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetcArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <VStack gap="32" max>
                <Skeleton
                    className={cls.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <Skeleton className={cls.title} width={300} height={24} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </VStack>
        );
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t('Статья не существует или была удалена')}
            />
        );
    } else {
        content = (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Redesigned />}
                off={<Deprecated />}
            />
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <article>
                <VStack
                    gap="16"
                    max
                    className={classNames(cls.ArticleDetails, {}, [className])}
                >
                    {content}
                </VStack>
            </article>
        </DynamicModuleLoader>
    );
});
