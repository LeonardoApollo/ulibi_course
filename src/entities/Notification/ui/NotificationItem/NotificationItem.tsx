import { memo } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Card as CardDeprecated, ThemeCard } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

import { Notification } from '../../model/types/types';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo(
    ({ className, item }: NotificationItemProps) => {
        const content = (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card
                        variant="normal"
                        borderOnlybottom
                        className={classNames(cls.NotificationItem, {}, [
                            className,
                        ])}
                    >
                        <Text title={item.title} text={item.description} />
                    </Card>
                }
                off={
                    <CardDeprecated
                        theme={ThemeCard.OUTLINED}
                        className={classNames(cls.NotificationItem, {}, [
                            className,
                        ])}
                    >
                        <TextDeprecated
                            title={item.title}
                            text={item.description}
                        />
                    </CardDeprecated>
                }
            />
        );

        if (item.href) {
            return (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <AppLink
                            to={item.href}
                            target="_blank"
                            className={cls.link}
                        >
                            {content}
                        </AppLink>
                    }
                    off={
                        <AppLinkDeprecated
                            to={item.href}
                            target="_blank"
                            className={cls.link}
                        >
                            {content}
                        </AppLinkDeprecated>
                    }
                />
            );
        }

        return content;
    },
);
