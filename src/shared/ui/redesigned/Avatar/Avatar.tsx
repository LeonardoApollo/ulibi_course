import { CSSProperties, FC, useMemo } from 'react';

import { Mods, classNames } from '@/shared/libs/classNames/classNames';

import DefaultAvatar from '../../../assets/icons/Default-avatar.svg';
import { AppImage } from '../../redesigned/AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar: FC<AvatarProps> = ({ className, src, size, alt }) => {
    const mods: Mods = {};
    const styles = useMemo<CSSProperties>(
        () => ({
            width: size || 100,
            height: size || 100,
        }),
        [size],
    );
    const errorFallback = (
        <Icon width={size} height={size} Svg={DefaultAvatar} />
    );
    const fallback = <Skeleton width={size} height={size} border="50%" />;

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            style={styles}
            alt={alt}
            className={classNames(cls.Avatar, mods, [className])}
        />
    );
};
