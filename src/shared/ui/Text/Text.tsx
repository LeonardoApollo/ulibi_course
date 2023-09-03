import { memo } from 'react';
import { Mods, classNames } from 'shared/libs/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

type HeadTagH1 = 'h1';
interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
    head?: HeadTagH1;
}

type HeaderTagType = 'h2' | 'h3' | 'h4';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h4',
    [TextSize.M]: 'h3',
    [TextSize.L]: 'h2',
};

const mapHeadTagH1: Record<HeadTagH1, HeadTagH1> = {
    h1: 'h1',
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
        head,
    } = props;

    const HeaderTag = head ? mapHeadTagH1[head] : mapSizeToHeaderTag[size];

    const aditionals = [
        className,
        cls[theme],
        cls[align],
        cls[size],
    ];

    return (
        <div className={classNames(cls.Text, {}, aditionals)}>
            {title && (<HeaderTag className={cls.title}>{title}</HeaderTag>)}
            {text && (<p className={cls.text}>{text}</p>)}
        </div>
    );
});
