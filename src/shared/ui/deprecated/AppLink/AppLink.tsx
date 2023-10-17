import {
    ForwardedRef,
    HTMLAttributeAnchorTarget,
    ReactNode,
    forwardRef,
} from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/libs/classNames/classNames';

import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    children?: ReactNode;
    target?: HTMLAttributeAnchorTarget;
}

/**
 * Устарел, используем компоненты из папки redesigned
 * @deprecated
 */
export const AppLink = forwardRef(
    (props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
        const {
            to,
            className,
            children,
            theme = AppLinkTheme.PRIMARY,
            target,
            ...otherProps
        } = props;

        return (
            <Link
                to={to}
                ref={ref}
                target={target}
                className={classNames(cls.AppLink, {}, [className, cls[theme]])}
                {...otherProps}
            >
                {children}
            </Link>
        );
    },
);
