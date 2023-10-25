import {
    ForwardedRef,
    HTMLAttributeAnchorTarget,
    ReactNode,
    forwardRef,
} from 'react';
import { LinkProps, NavLink } from 'react-router-dom';

import { classNames } from '@/shared/libs/classNames/classNames';

import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'secondary';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children?: ReactNode;
    target?: HTMLAttributeAnchorTarget;
    activeClassName?: string;
}

export const AppLink = forwardRef(
    (props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
        const {
            to,
            className,
            children,
            variant = 'primary',
            target,
            activeClassName = '',
            ...otherProps
        } = props;

        return (
            <NavLink
                to={to}
                ref={ref}
                target={target}
                className={({ isActive }) =>
                    classNames(cls.AppLink, { [activeClassName]: isActive }, [
                        className,
                        cls[variant],
                    ])
                }
                {...otherProps}
            >
                {children}
            </NavLink>
        );
    },
);
