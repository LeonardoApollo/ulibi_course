import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwithcer } from '@/features/ThemeSwitcher';

import ArrowIcon from '@/shared/assets/icons/ArrowRight.svg';
import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';
import { Button, SizeButton, ThemeButton } from '@/shared/ui/deprecated/Button';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SideBarItem } from '../SideBarItem/SideBarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const sidebarItemsList = useSelector(getSidebarItems);
    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SideBarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
            )),
        [collapsed, sidebarItemsList],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <section
                    data-testid="sidebar"
                    className={classNames(
                        cls.SidebarRedesigned,
                        { [cls.collapsedRedesigned]: collapsed },
                        [className],
                    )}
                >
                    <AppLogo collapsed={collapsed} className={cls.appLogo} />
                    <VStack role="navigation" gap="8" className={cls.items}>
                        {itemsList}
                    </VStack>
                    <Icon
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={cls.collapseBtn}
                        Svg={ArrowIcon}
                        width={22}
                        height={10}
                        clickable
                    />
                    <div className={cls.swithcers}>
                        <ThemeSwithcer />
                        <LangSwitcher short={collapsed} className={cls.lang} />
                    </div>
                </section>
            }
            off={
                <section
                    data-testid="sidebar"
                    className={classNames(
                        cls.Sidebar,
                        { [cls.collapsed]: collapsed },
                        [className],
                    )}
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
                    <VStack role="navigation" gap="16" className={cls.items}>
                        {itemsList}
                    </VStack>
                    <div className={cls.swithcers}>
                        <ThemeSwithcer />
                        <LangSwitcher short={collapsed} className={cls.lang} />
                    </div>
                </section>
            }
        />
    );
});
