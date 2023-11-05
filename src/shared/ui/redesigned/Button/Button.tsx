import { ButtonHTMLAttributes, ReactNode, memo } from 'react';

import { Mods, classNames } from '@/shared/libs/classNames/classNames';

import cls from './Button.module.scss';

export type ThemeButton = 'clear' | 'outline' | 'background' | 'filled';

export type SizeButton = 'size_m' | 'size_l' | 'size_xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ThemeButton;
    square?: boolean;
    size?: SizeButton;
    disabled?: boolean;
    children?: ReactNode;
    fullWidth?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        variant = 'outline',
        square,
        disabled,
        size = 'size_m',
        fullWidth,
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
        [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [
                className,
                cls[variant],
                cls[size],
            ])}
            disabled={disabled}
            {...otherProps}
        >
            {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
            {children}
            {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
        </button>
    );
});
