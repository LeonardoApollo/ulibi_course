import { memo } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Text } from 'shared/ui/Text/Text';
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
    if (error) {
        // @ts-ignore
        const message = error?.status;
        return (
            <Text title={t('Ошибка загрузки оповещений')} text={message} />
        );
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
                    return (
                        <NotificationItem key={item.id} item={item} />
                    );
                }
                return null;
            })}
        </VStack>
    );
});
