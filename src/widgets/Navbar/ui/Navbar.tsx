import { classNames } from "shared/libs/classNames/classNames"
import cls from './Navbar.module.scss'
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { ThemeSwithcer } from "widgets/ThemeSwitcher";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <ThemeSwithcer/>
            <div className={cls.links}>
                <AppLink theme={AppLinkTheme.SECONDARY} to={"/"} className={cls.mainLink}>Главная Страница</AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} to={"/about"}>О Сайте</AppLink>
            </div>
        </div>
    )
}