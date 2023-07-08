import { memo, useMemo, useState } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { ThemeSwithcer } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button, SizeButton, ThemeButton } from 'shared/ui/Button/Button';
import { SidebarItemList } from 'widgets/Sidebar/model/items';
import cls from './Sidebar.module.scss';
import { SideBarItem } from '../SideBarItem/SideBarItem';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsLeist = useMemo(() => SidebarItemList.map((item) => (
        <SideBarItem
            item={item}
            collapsed={collapsed}
            key={item.path}
        />
    )), [collapsed]);

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <Button
                data-testid="sidebar-toggle"
                type="button"
                onClick={onToggle}
                className={cls.collapseBtn}
                theme={ThemeButton.BACKGROUND_INVERTED}
                square
                size={SizeButton.L}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={cls.items}>
                {itemsLeist}
            </div>
            <div className={cls.swithcers}>
                <ThemeSwithcer />
                <LangSwitcher
                    short={collapsed}
                    className={cls.lang}
                />
            </div>
        </div>
    );
});
