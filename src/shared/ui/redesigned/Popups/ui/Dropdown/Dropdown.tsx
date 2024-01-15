import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';

import { AppLink } from '../../../../deprecated/AppLink/AppLink';
import popupCls from '../../styles/popup.module.scss';
import cls from './Dropdown.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    direction?: DropDownDirection;
    row?: boolean;
}

export const Dropdown = (props: DropdownProps) => {
    const { className, items, trigger, row, direction = 'bottomLeft' } = props;

    return (
        <Menu as="div" className={classNames(popupCls.popup, {}, [className])}>
            <Menu.Button as="div" className={popupCls.trigger}>
                {trigger}
            </Menu.Button>
            <Menu.Items
                className={classNames(row ? cls.MobileMenu : cls.menu, {}, [
                    cls[direction],
                    popupCls.menu,
                ])}
            >
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            onClick={item?.onClick}
                            disabled={item.disabled}
                            className={classNames(
                                row ? cls.MobileItem : cls.item,
                                {
                                    [cls.active]: active,
                                },
                            )}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                                // eslint-disable-next-line
                                key={`dropdown-key-${index}`}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item
                            as={Fragment}
                            // eslint-disable-next-line
                            key={`dropdown-key-${index}`}
                            disabled={item.disabled}
                        >
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
};
