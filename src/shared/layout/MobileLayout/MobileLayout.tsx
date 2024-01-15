import { ReactElement } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';

import cls from './MobileLayout.module.scss';

interface MobileLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
}

export const MobileLayout = (props: MobileLayoutProps) => {
    const { className, header, content } = props;
    return (
        <div className={classNames(cls.MobileLayout, {}, [className])}>
            <div className={cls.header}>{header}</div>
            <div className={cls.content}>{content}</div>
        </div>
    );
};
