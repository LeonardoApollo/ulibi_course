import { useTranslation } from 'react-i18next';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';

import { classNames } from '@/shared/libs/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { ProfileCardProps } from '../../module/types/profileProps';
import cls from './ProfileCardRedesigned.module.scss';

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation('profile');
    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCardRedesigned, {}, [cls.error])}
        >
            <Text
                variant="error"
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align="center"
            />
        </HStack>
    );
};

export const ProfileCardRedesginedLoding = () => (
    <Card padding="24" max>
        <VStack gap="32">
            <HStack max justify="center">
                <Skeleton width={128} height={128} border="100%" />
            </HStack>

            <HStack gap="32" max>
                <VStack gap="16" max>
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                </VStack>

                <VStack gap="16" max>
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                </VStack>
            </HStack>
        </VStack>
    </Card>
);

export const ProfileCardRedesigned = (props: ProfileCardProps) => {
    const {
        className,
        data,
        readonly,
        onChangeUsername,
        onChangeAvatar,
        onChangeFirstname,
        onChangeLastname,
        onChangeCity,
        onChangeAge,
        onChangeCurrency,
        onChangeCountry,
    } = props;

    const { t } = useTranslation('profile');

    return (
        <Card
            padding="24"
            max
            className={classNames(cls.ProfileCardRedesigned, {}, [className])}
        >
            <VStack gap="32">
                {data?.avatar && (
                    <HStack justify="center" max className={cls.avatarWrapper}>
                        <Avatar src={data.avatar} alt="avatar" size={128} />
                    </HStack>
                )}
                <HStack gap="24" max>
                    <VStack gap="16" max>
                        <Input
                            value={data?.firstname ?? ''}
                            label={t('Имя')}
                            className={cls.input}
                            onChange={onChangeFirstname}
                            readonly={readonly}
                            data-testid="ProfileCard.firstname"
                        />
                        <Input
                            value={data?.lastname ?? ''}
                            label={t('Фамилия')}
                            className={cls.input}
                            onChange={onChangeLastname}
                            readonly={readonly}
                            data-testid="ProfileCard.lastname"
                        />
                        <Input
                            value={data?.age ?? ''}
                            label={t('Возраст')}
                            className={cls.input}
                            onChange={onChangeAge}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.city ?? ''}
                            label={t('Город')}
                            className={cls.input}
                            onChange={onChangeCity}
                            readonly={readonly}
                        />
                    </VStack>
                    <VStack gap="16" max>
                        <Input
                            value={data?.username ?? ''}
                            label={t('Псевдоним')}
                            className={cls.input}
                            onChange={onChangeUsername}
                            readonly={readonly}
                        />

                        <Input
                            value={data?.avatar ?? ''}
                            label={t('Аватар')}
                            className={cls.input}
                            onChange={onChangeAvatar}
                            readonly={readonly}
                        />
                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readonly={readonly}
                        />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountry}
                            readonly={readonly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};
