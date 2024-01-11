import React, { memo } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';

import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    NoTheme?: boolean;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
    clickable: true;
    disabled?: boolean;
    onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        NoTheme,
        width = 32,
        height = 32,
        clickable,
        ...otherProps
    } = props;

    const icon = (
        <Svg
            className={classNames(NoTheme ? '' : cls.Icon, {}, [className])}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                onClick={props.onClick}
                className={classNames(
                    cls.button,
                    { [cls.disabled]: props.disabled },
                    [],
                )}
                disabled={props.disabled}
                style={{ height, width }}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
