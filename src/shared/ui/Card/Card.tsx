import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import cls from './Card.module.scss';

export enum ThemeCard {
    NORMAL = 'normal',
    OUTLINED = 'outlined'
}
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: ThemeCard;
}

export const Card = (props: CardProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props;

    let { theme } = props;

    if (theme === undefined) {
        theme = ThemeCard.NORMAL;
    }

    return (
        <div
            className={classNames(cls.Card, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    );
};
