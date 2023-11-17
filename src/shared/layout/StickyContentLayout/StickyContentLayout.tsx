import { ReactElement } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';

import cls from './StickyContentLayout.module.scss';

interface StickyContentLayoutProps {
    className?: string;
    left?: ReactElement;
    content: ReactElement;
    right?: ReactElement;
}

export const StickyContentLayout = (props: StickyContentLayoutProps) => {
    const { className, left, content, right } = props;

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            {left && <div className={cls.left}>{left}</div>}
            <div className={cls.content}>{content}</div>
            {right && <div className={cls.right}>{right}</div>}
        </div>
    );
};
