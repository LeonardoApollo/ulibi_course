import { FC, useCallback } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import {
    getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import { HStack } from 'shared/ui/Stack/HStack/HStack';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({ className }) => {
    const { t } = useTranslation('profile');

    const readonly = useSelector(getProfileReadonly);
    const dispath = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
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
        <HStack max justify="between" className={classNames('', {}, [className])}>
            <Text title={t('Профиль')} />
            {canEdit && (
                // eslint-disable-next-line
                <>
                    {readonly ? (
                        <Button
                            theme={ThemeButton.OUTLINE}
                            onClick={onEdit}
                        >
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <HStack gap="16">
                            <Button
                                theme={ThemeButton.OUTLINE_RED}
                                onClick={onCancelEdit}
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                theme={ThemeButton.OUTLINE}
                                onClick={onSaveEdit}
                            >
                                {t('Сохранить')}
                            </Button>
                        </HStack>
                    )}
                </>
            )}
        </HStack>
    );
};
