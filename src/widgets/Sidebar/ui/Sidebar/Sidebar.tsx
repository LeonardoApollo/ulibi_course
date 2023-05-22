import { FC, useState } from 'react'
import { classNames } from 'shared/libs/classNames/classNames'; 
import cls from './Sidebar.module.scss'
import { ThemeSwithcer } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';

interface SidebarProps {
    className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
    const[collapsed, setCollapsed] = useState(false);
    
    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    return (
        <div className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}>
           <button onClick={onToggle}>toggle</button>
           <div className={cls.swithcers}>
            <ThemeSwithcer/>
            <LangSwitcher className={cls.lang}/>
           </div>
        </div>
    )
}