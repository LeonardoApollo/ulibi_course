import { FC } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { ReactComponent as LightIcon } from 'shared/assests/icons/theme-light.svg';
import { ReactComponent as DarkIcon } from 'shared/assests/icons/theme-dark.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwithcer: FC<ThemeSwitcherProps> = ({ className }) => {
    const { theme, toggleTheme } = useTheme();

    return (

        <Button
            theme={ThemeButton.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
};
