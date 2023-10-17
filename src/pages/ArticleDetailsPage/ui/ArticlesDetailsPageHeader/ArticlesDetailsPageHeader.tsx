import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getArticleDetailsData } from '@/entities/Article';

import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { classNames } from '@/shared/libs/classNames/classNames';
import { HStack } from '@/shared/ui/Stack';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';

import { getCanEditArticle } from '../../modal/selectors/getArticleCanChange/getCanEditArticle';

interface ArticlesDetailsPageHeaderProps {
    className?: string;
}

export const ArticlesDetailsPageHeader = memo(
    ({ className }: ArticlesDetailsPageHeaderProps) => {
        const { t } = useTranslation('article');
        const navigate = useNavigate();
        const canEdit = useSelector(getCanEditArticle);
        const article = useSelector(getArticleDetailsData);

        const onBackToList = useCallback(() => {
            navigate(getRouteArticles());
        }, [navigate]);

        const onEditArticle = useCallback(() => {
            if (article) {
                navigate(getRouteArticleEdit(article.id));
            }
        }, [navigate, article]);

        return (
            <HStack
                justify="between"
                max
                className={classNames('', {}, [className])}
            >
                <Button
                    theme={ThemeButton.OUTLINE}
                    onClick={onBackToList}
                    data-testid="ArticleDetails.Return"
                >
                    {t('Назад к списку')}
                </Button>
                {canEdit && (
                    <Button
                        theme={ThemeButton.OUTLINE}
                        onClick={onEditArticle}
                        data-testid="ArticleDetails.Edit"
                    >
                        {t('Редактировать')}
                    </Button>
                )}
            </HStack>
        );
    },
);
