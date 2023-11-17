import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';

import { BackToArticlesBtn } from '@/features/backToArticlesBtn';

import { getArticleDetailsData } from '@/entities/Article';

import { getRouteArticleEdit } from '@/shared/const/router';
import { Card } from '@/shared/ui/redesigned/Card';

import cls from './AdditionalInfoContainer.module.scss';

interface AdditionalInfoContainerProps {
    className?: string;
}

export const AdditionalInfoContainer = memo(
    ({ className }: AdditionalInfoContainerProps) => {
        const article = useSelector(getArticleDetailsData);
        const navigate = useNavigate();

        const onEditArticle = useCallback(() => {
            if (article) {
                navigate(getRouteArticleEdit(article.id));
            }
        }, [navigate, article]);

        if (!article) {
            return null;
        }

        return (
            <>
                <Card padding="24" borderRadius="round" className={cls.card}>
                    <ArticleAdditionalInfo
                        onEdit={onEditArticle}
                        article={article}
                        className={className}
                    />
                </Card>
                <BackToArticlesBtn className={cls.backBtn} />
            </>
        );
    },
);
