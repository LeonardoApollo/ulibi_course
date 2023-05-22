import { FC, useState } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { ThemeSwithcer } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <button type="button" onClick={onToggle}>toggle</button>
            <div className={cls.swithcers}>
                <ThemeSwithcer />
                <LangSwitcher className={cls.lang} />
            </div>
        </div>
    );
};
