import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getCanEditArticle } from '@/widgets/ArticleAdditionalInfo';

import { BackToArticlesBtn } from '@/features/backToArticlesBtn';

import { getArticleDetailsData } from '@/entities/Article';

import { getRouteArticleEdit } from '@/shared/const/router';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticlesDetailsPageHeaderProps {
    className?: string;
}

export const ArticlesDetailsPageHeader = memo(
    ({ className }: ArticlesDetailsPageHeaderProps) => {
        const { t } = useTranslation('article');
        const navigate = useNavigate();
        const canEdit = useSelector(getCanEditArticle);
        const article = useSelector(getArticleDetailsData);

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
                <BackToArticlesBtn />
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
