import { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';

import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import { Theme } from '@/shared/const/theme';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useTheme } from '@/shared/hooks/useTheme';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwithcer = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [toggleTheme, dispatch]);

    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames('', {}, [className])}
            onClick={onToggleHandler}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
});
