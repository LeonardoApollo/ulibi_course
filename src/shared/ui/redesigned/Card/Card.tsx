import { HTMLAttributes, ReactNode } from 'react';

import { Mods, classNames } from '@/shared/libs/classNames/classNames';

import cls from './Card.module.scss';

export type ThemeCard = 'normal' | 'outlined' | 'light';

export type PaddingCard = '0' | '8' | '16' | '24';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: ThemeCard;
    max?: boolean;
    padding?: PaddingCard;
    borderOnlybottom?: boolean;
}

const mapPaddingToClass: Record<PaddingCard, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
};

export const Card = (props: CardProps) => {
    const {
        className,
        children,
        max,
        padding = '8',
        borderOnlybottom,
        ...otherProps
    } = props;

    let { variant } = props;

    const peddingClass = mapPaddingToClass[padding];

    const mods: Mods = {
        [cls.max]: max,
        [cls.borderOnlybottom]: borderOnlybottom,
    };

    if (variant === undefined) {
        variant = 'normal';
    }

    return (
        <div
            className={classNames(cls.Card, mods, [
                className,
                cls[variant],
                cls[peddingClass],
            ])}
            {...otherProps}
        >
            {children}
        </div>
    );
};
