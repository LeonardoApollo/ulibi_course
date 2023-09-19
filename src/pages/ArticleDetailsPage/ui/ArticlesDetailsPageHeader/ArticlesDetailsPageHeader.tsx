import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getCanEditArticle } from '../../modal/selectors/getArticleCanChange/getCanEditArticle';

import { getArticleDetailsData } from '@/entities/Article';
import { RoutePath } from '@/shared/const/router';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

interface ArticlesDetailsPageHeaderProps {
    className?: string;
}

export const ArticlesDetailsPageHeader = memo(({ className }: ArticlesDetailsPageHeaderProps) => {
    const { t } = useTranslation('article');
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${article?.id}/edit`);
    }, [navigate, article?.id]);

    return (
        <HStack justify="between" max className={classNames('', {}, [className])}>
            <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            {canEdit && (
                <Button
                    theme={ThemeButton.OUTLINE}
                    onClick={onEditArticle}
                >
                    {t('Редактировать')}
                </Button>
            )}
        </HStack>
    );
});
