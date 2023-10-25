import { memo } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';

import cls from './Text.module.scss';

export type TextTheme = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 'size_s' | 'size_m' | 'size_l';

type HeadTagH1 = 'h1';
interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
    head?: HeadTagH1;

    'data-testid'?: string;
}

type HeaderTagType = 'h2' | 'h3' | 'h4';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    size_s: 'h4',
    size_m: 'h3',
    size_l: 'h2',
};

const mapHeadTagH1: Record<HeadTagH1, HeadTagH1> = {
    h1: 'h1',
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        variant = 'primary',
        align = 'left',
        size = 'size_m',
        head,
        'data-testid': dataTestId = 'Text',
    } = props;

    const HeaderTag = head ? mapHeadTagH1[head] : mapSizeToHeaderTag[size];

    const aditionals = [className, cls[variant], cls[align], cls[size]];

    return (
        <div className={classNames(cls.Text, {}, aditionals)}>
            {title && (
                <HeaderTag
                    className={cls.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
                    {text}
                </p>
            )}
        </div>
    );
});
