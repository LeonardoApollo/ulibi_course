import React, {
    InputHTMLAttributes,
    ReactNode,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';

import { Mods, classNames } from '@/shared/libs/classNames/classNames';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocuse?: boolean;
    readonly?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocuse,
        readonly,
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (autofocuse) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocuse]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };
    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    };

    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
            {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                readOnly={readonly}
                {...otherProps}
            />
            {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
        </div>
    );
});
