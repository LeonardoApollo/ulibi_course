import { memo, useCallback } from 'react';

import CopyIcon from '@/shared/assets/icons/CopyIconRedesigned.svg';
import { classNames } from '@/shared/libs/classNames/classNames';

import { Button } from '../Button';
import { Icon } from '../Icon';
import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo(({ className, text }: CodeProps) => {
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button onClick={onCopy} className={cls.copyBtn} variant="clear">
                <Icon Svg={CopyIcon} className={cls.Icon} />
            </Button>
            <code>{text}</code>
        </pre>
    );
});
