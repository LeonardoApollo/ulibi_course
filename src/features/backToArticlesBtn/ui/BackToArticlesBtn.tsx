import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getRouteArticles } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/libs/features';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';

interface BackToArticlesBtnProps {
    className?: string;
}

export const BackToArticlesBtn = memo(
    ({ className }: BackToArticlesBtnProps) => {
        const { t } = useTranslation('article');

        const navigate = useNavigate();

        const onBackToList = useCallback(() => {
            navigate(getRouteArticles());
        }, [navigate]);

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Button
                        onClick={onBackToList}
                        className={className}
                        data-testid="ArticleDetails.Return"
                        variant="outline"
                    >
                        {t('Назад к списку')}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        onClick={onBackToList}
                        className={className}
                        data-testid="ArticleDetails.Return"
                        theme={ThemeButton.OUTLINE}
                    >
                        {t('Назад к списку')}
                    </ButtonDeprecated>
                }
            />
        );
    },
);
