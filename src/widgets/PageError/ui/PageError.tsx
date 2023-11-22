import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';

import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}

export const PageError: FC<PageErrorProps> = ({ className }) => {
    const { t } = useTranslation();

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <p>{t('Произошла непредвиденная ошибка')}</p>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Button onClick={reloadPage}>
                        {t('Обновить страницу')}
                    </Button>
                }
                off={
                    <ButtonDeprecated onClick={reloadPage}>
                        {t('Обновить страницу')}
                    </ButtonDeprecated>
                }
            />
        </div>
    );
};
