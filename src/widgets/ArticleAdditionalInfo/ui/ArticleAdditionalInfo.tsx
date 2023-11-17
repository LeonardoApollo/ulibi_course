import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Article } from '@/entities/Article';

import { classNames } from '@/shared/libs/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { getCanEditArticle } from '../modal/services/getCanEditArticle';
import cls from './ArticleAdditionalInfo.module.scss';

interface ArticleAdditionalInfroProps {
    className?: string;
    article: Article;
    onEdit: () => void;
}

export const ArticleAdditionalInfo = memo(
    ({ className, article, onEdit }: ArticleAdditionalInfroProps) => {
        const { t } = useTranslation('article');

        const canEdit = useSelector(getCanEditArticle);

        return (
            <VStack
                gap="32"
                className={classNames(cls.ArticleAdditionalInfro, {}, [
                    className,
                ])}
            >
                <HStack gap="8">
                    <Avatar src={article.user.avatar} size={32} />
                    <Text text={article.user.username} bold />
                    <Text text={article.createdAt} />
                </HStack>
                {canEdit && (
                    <Button
                        onClick={onEdit}
                        data-testid="ArticleDetails.Edit"
                        variant="outline"
                    >
                        {t('Редактировать')}
                    </Button>
                )}
                <Text text={t('просмотров', { count: article.views })} />
            </VStack>
        );
    },
);
