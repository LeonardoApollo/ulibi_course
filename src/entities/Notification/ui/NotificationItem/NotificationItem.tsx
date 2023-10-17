import { memo } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Card, ThemeCard } from '@/shared/ui/deprecated/Card';
import { Text } from '@/shared/ui/deprecated/Text';

import { Notification } from '../../model/types/types';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo(
    ({ className, item }: NotificationItemProps) => {
        const content = (
            <Card
                theme={ThemeCard.OUTLINED}
                className={classNames(cls.NotificationItem, {}, [className])}
            >
                <Text title={item.title} text={item.description} />
            </Card>
        );

        if (item.href) {
            return (
                <AppLink to={item.href} target="_blank" className={cls.link}>
                    {content}
                </AppLink>
            );
        }

        return content;
    },
);
