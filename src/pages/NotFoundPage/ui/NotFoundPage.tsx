import { memo, useEffect } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = memo(({ className } : NotFoundPageProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // useEffect(() => {
    //     setTimeout(() => {
    //         navigate('/');
    //     }, 3000);
    // });

    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </div>
    );
});
