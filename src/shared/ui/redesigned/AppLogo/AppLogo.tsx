import { memo } from 'react';

import AppSvg from '@/shared/assets/icons/AppLogo.svg';
import AppSvgSmall from '@/shared/assets/icons/AppLogoSmall.svg';
import { classNames } from '@/shared/libs/classNames/classNames';

import { Icon } from '../../redesigned/Icon';
import { HStack } from '../Stack';
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
                <Icon
                    Svg={AppSvgSmall}
                    width={30}
                    color="#000"
                    height={50}
                    className={cls.appLogo}
                    NoTheme
                />
                <div className={cls.gradientBig} />
                <div className={cls.gradientSmall} />
            </HStack>
        ) : (
            <HStack
                max
                justify="center"
                className={classNames(cls.appLogoWrapper, {}, [className])}
            >
                <Icon
                    Svg={AppSvg}
                    width={190}
                    color="#000"
                    height={50}
                    className={cls.appLogo}
                    NoTheme
                />
                <div className={cls.gradientBig} />
                <div className={cls.gradientSmall} />
            </HStack>
        )}
    </>
));
