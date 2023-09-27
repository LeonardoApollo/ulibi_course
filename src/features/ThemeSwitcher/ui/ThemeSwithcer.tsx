import { memo } from 'react';

import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/hooks/useTheme';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwithcer = memo(({ className }: ThemeSwitcherProps) => {
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
});
