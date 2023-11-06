import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/EyeRedesigned.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/libs/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleListItemProps } from '../../../model/types/articleListItemProps';
import cls from './ArticleListItemRedesigned.module.scss';

export const ArticleListItemRedesigned = memo(
    ({ className, article, view, target }: ArticleListItemProps) => {
        const { t } = useTranslation('article');

        const userInfo = (
            <>
                <Avatar size={32} src={article.user.avatar} />
                <Text bold text={article.user.username} />
            </>
        );

        const types = (
            <Text text={article.type.join(',')} className={cls.types} />
        );
        const views = (
            <HStack gap="8">
                <Icon Svg={EyeIcon} />
                <Text text={String(article.views)} className={cls.views} />
            </HStack>
        );

        if (view === ArticleView.LIST) {
            const textBlock = article.blocks.find(
                (block) => block.type === ArticleBlockType.TEXT,
            ) as ArticleTextBlock;
            return (
                <Card
                    padding="24"
                    max
                    className={classNames(cls.ArticleListItem, {}, [
                        className,
                        cls[view],
                    ])}
                    data-testid="ArticlesListItem.LIST"
                >
                    <VStack max gap="16">
                        <HStack max gap="8">
                            {userInfo}
                            <Text text={article.createdAt} />
                        </HStack>
                        <Text title={article.title} bold />
                        <Text text={article.subtitle} size="size_s" />
                        <AppImage
                            errorFallback={
                                <Text
                                    align="center"
                                    variant="error"
                                    text={t('Ошибка загрузки изображения')}
                                    className={cls.Error}
                                />
                            }
                            fallback={<Skeleton width="100%" height={250} />}
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                        />
                        {textBlock && (
                            <Text
                                className={cls.textBlock}
                                text={textBlock.paragraphs
                                    .slice(0, 2)
                                    .join(' ')}
                            />
                        )}
                        <HStack max justify="between">
                            <AppLink
                                target={target}
                                to={getRouteArticleDetails(article.id)}
                            >
                                <Button variant="outline">
                                    {t('Читать далее...')}
                                </Button>
                            </AppLink>
                            {views}
                        </HStack>
                    </VStack>
                </Card>
            );
        }

        return (
            <AppLink
                data-testid="ArticleListItem"
                target={target}
                to={getRouteArticleDetails(article.id)}
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card} borderRadius="round">
                    <AppImage
                        errorFallback={
                            <Text
                                align="center"
                                variant="error"
                                text={t('Ошибка загрузки изображения')}
                                className={cls.Error}
                            />
                        }
                        fallback={<Skeleton width={200} height={200} />}
                        alt={article.title}
                        src={article.img}
                        className={cls.img}
                    />
                    <VStack className={cls.info} gap="4">
                        <Text title={article.title} className={cls.title} />
                        <VStack gap="4" className={cls.footer} max>
                            <HStack justify="between" max>
                                <Text
                                    text={article.createdAt}
                                    className={cls.date}
                                />
                                {views}
                            </HStack>
                            <HStack gap="4">{userInfo}</HStack>
                        </VStack>
                    </VStack>
                </Card>
            </AppLink>
        );
    },
);
