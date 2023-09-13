import { memo } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { NotificationList } from 'entities/Notification';
import { Popover } from 'shared/ui/Popups';
import Notification from 'shared/assets/icons/Notification.svg';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo(({ className }: NotificationButtonProps) => (
    <Popover
        direction="bottomLeft"
        className={classNames(cls.NotificationButton, {}, [className])}
        trigger={(
            <Button theme={ThemeButton.CLEAR}>
                <Icon Svg={Notification} inverted />
            </Button>
        )}
    >
        <NotificationList className={cls.notifications} />
    </Popover>
));
