import { classNames } from 'shared/libs/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import { ForwardedRef, ReactNode, forwardRef } from 'react';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    children?: ReactNode;
}

export const AppLink = forwardRef((props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    const {
        to,
        className,
        children,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            ref={ref}
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
