import { FC, useCallback } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({ className }) => {
    const { t } = useTranslation('profile');

    const readonly = useSelector(getProfileReadonly);
    const dispath = useAppDispatch();

    const onEdit = useCallback(() => {
        dispath(profileActions.setReadonly(false));
    }, [dispath]);

    const onCancelEdit = useCallback(() => {
        dispath(profileActions.cancelEdit());
    }, [dispath]);

    const onSaveEdit = useCallback(() => {
        dispath(updateProfileData());
    }, [dispath]);

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль')} />
            {readonly ? (
                <Button
                    className={cls.editBtn}
                    theme={ThemeButton.OUTLINE}
                    onClick={onEdit}
                >
                    {t('Редактировать')}
                </Button>
            ) : (
                <>
                    <Button
                        className={cls.editBtn}
                        theme={ThemeButton.OUTLINE_RED}
                        onClick={onCancelEdit}
                    >
                        {t('Отменить')}
                    </Button>
                    <Button
                        className={cls.saveBtn}
                        theme={ThemeButton.OUTLINE}
                        onClick={onSaveEdit}
                    >
                        {t('Сохранить')}
                    </Button>
                </>
            )}
        </div>
    );
};
