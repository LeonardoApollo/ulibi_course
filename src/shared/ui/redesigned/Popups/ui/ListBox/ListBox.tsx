import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';

import ArrowIcon from '@/shared/assets/icons/ArrowRedesigned.svg';
import { classNames } from '@/shared/libs/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';

import { Button } from '../../../Button/Button';
import { Icon } from '../../../Icon';
import { HStack } from '../../../Stack';
import popupCls from '../../styles/popup.module.scss';
import cls from './ListBox.module.scss';

export interface ListBoxItem<T extends string> {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    className?: string;
    items?: ListBoxItem<T>[];
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    label?: string;
    direction?: DropDownDirection;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        label,
        direction = 'bottomRight',
    } = props;

    const selectedItem = useMemo(
        () => items?.find((item) => item.value === value),
        [items, value],
    );

    return (
        <HStack gap="4">
            {label && (
                <span
                    className={classNames('', { [cls.readonly]: readonly })}
                >{`${label}>`}</span>
            )}
            <HListBox
                as="div"
                className={classNames(
                    popupCls.popup,
                    { [cls.readonly]: readonly },
                    [className],
                )}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBox.Button as="div" className={popupCls.trigger}>
                    <Button
                        className={cls.SelectBtn}
                        variant="filled"
                        disabled={readonly}
                        addonRight={<Icon Svg={ArrowIcon} />}
                    >
                        {selectedItem?.content ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(cls.options, {}, [
                        cls[direction],
                        popupCls.menu,
                    ])}
                >
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        cls.item,
                                        {
                                            [cls.active]: active,
                                            [popupCls.disabled]: item.disabled,
                                            [popupCls.selected]: selected,
                                        },
                                        [],
                                    )}
                                >
                                    {selected}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
}
