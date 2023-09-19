import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';

import popupCls from '../../styles/popup.module.scss';

import { classNames } from '@/shared/libs/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';

import cls from './Popover.module.scss';

interface PopoverProps {
    className?: string;
    trigger: ReactNode;
    direction?: DropDownDirection;
    children: ReactNode;
}

export const Popover = (props: PopoverProps) => {
    const {
        className,
        trigger,
        direction = 'bottomLeft',
        children,
    } = props;
    return (
        <HPopover className={classNames(popupCls.popup, {}, [className])}>

            <HPopover.Button as="div" className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel
                // Используется для постоянных запросов на сервер
                // unmount={false}
                className={classNames(cls.panel, {}, [cls[direction]])}
            >
                {children}
            </HPopover.Panel>

        </HPopover>
    );
};
