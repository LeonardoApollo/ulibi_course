import { memo } from 'react';

import AppSvg from '@/shared/assets/icons/AppLogo.svg';
import AppSvgSmall from '@/shared/assets/icons/AppLogoSmall.svg';
import { classNames } from '@/shared/libs/classNames/classNames';

import { HStack } from '../../Stack';
import { Icon } from '../../deprecated/Icon';
import cls from './AppLogo.module.scss';

interface AppLogoProps {
    className?: string;
    collapsed?: boolean;
}

export const AppLogo = memo(({ className, collapsed }: AppLogoProps) => (
    // eslint-disable-next-line
    <>
        {collapsed ? (
            <HStack
                max
                justify="center"
                className={classNames(
                    cls.appLogoWrapper,
                    { [cls.collapsed]: collapsed },
                    [className],
                )}
            >
                <div className={cls.gradientBig} />
                <div className={cls.gradientSmall} />
                <Icon
                    Svg={AppSvgSmall}
                    width={30}
                    color="#000"
                    height={50}
                    className={cls.appLogo}
                    NoTheme
                />
            </HStack>
        ) : (
            <HStack
                max
                justify="center"
                className={classNames(cls.appLogoWrapper, {}, [className])}
            >
                <div className={cls.gradientBig} />
                <div className={cls.gradientSmall} />
                <Icon
                    Svg={AppSvg}
                    width={190}
                    color="#000"
                    height={50}
                    className={cls.appLogo}
                    NoTheme
                />
            </HStack>
        )}
    </>
));
