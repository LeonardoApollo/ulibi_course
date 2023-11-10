import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';

import { classNames } from '@/shared/libs/classNames/classNames';
import { toggleFeatures } from '@/shared/libs/features';
import { Skeleton as SkeletenDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import cls from './NotificationList.module.scss';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo(({ className }: NotificationListProps) => {
    const { t } = useTranslation();
    const { data, isLoading, error } = useNotifications(null, {
        pollingInterval: 5000,
    });
    const userId = useSelector(getUserAuthData);

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletenDeprecated,
    });

    const Text = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => TextRedesigned,
        // @ts-ignore
        off: () => TextDeprecated,
    });

    if (error) {
        // @ts-ignore
        const message = error?.status;
        return <Text title={t('Ошибка загрузки оповещений')} text={message} />;
    }

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames(cls.NotificationList, {}, [className])}
            >
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls.NotificationList, {}, [className])}
        >
            {data?.map((item) => {
                if (userId?.id === item.userId) {
                    return <NotificationItem key={item.id} item={item} />;
                }
                return null;
            })}
        </VStack>
    );
});
