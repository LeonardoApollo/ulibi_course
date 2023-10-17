import { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';

// import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import ThemeIcon from '@/shared/assets/icons/theme-light.svg';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useTheme } from '@/shared/hooks/useTheme';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

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
            <Icon Svg={ThemeIcon} width={40} height={40} inverted />
            {/* {theme === Theme.DARK ? <DarkIcon /> : <ThemeIcon />} */}
        </Button>
    );
});
