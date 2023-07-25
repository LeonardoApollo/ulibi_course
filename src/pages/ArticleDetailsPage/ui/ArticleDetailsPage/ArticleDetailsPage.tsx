import { FC, memo } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
    const { t } = useTranslation('article');

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            {t('Описание статьи')}
        </div>
    );
};

export default memo(ArticleDetailsPage);
