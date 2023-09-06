import {
    memo, Fragment, ReactNode,
} from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { Listbox as HListBox } from '@headlessui/react';
import { DropDownDirection } from 'shared/types/ui';
import cls from './ListBox.module.scss';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    className?: string;
    items?: ListBoxItem[];
    value?: string;
    defaultValue: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    label?: string;
    direction?: DropDownDirection;
}

export const ListBox = memo((props: ListBoxProps) => {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        label,
        direction = 'bottom right',
    } = props;

    return (
        <HStack gap="4">
            {label && (
                <span className={classNames('', { [cls.readonly]: readonly })}>{`${label}>`}</span>
            )}
            <HListBox
                as="div"
                className={classNames(cls.ListBox, { [cls.readonly]: readonly }, [className])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBox.Button as="div" className={cls.trigger}>
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(cls.options, {}, [cls[direction]])}>
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [cls.active]: active,
                                        [cls.disabled]: item.disabled,
                                    }, [])}
                                >
                                    {selected && '>'}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
});
