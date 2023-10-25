import { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';

import ThemeSwitcherIcon from '@/shared/assets/icons/ThemeSwitchRedesigned.svg';
// import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import ThemeIcon from '@/shared/assets/icons/theme-light.svg';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useTheme } from '@/shared/hooks/useTheme';
import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Icon
                    onClick={onToggleHandler}
                    Svg={ThemeSwitcherIcon}
                    clickable
                />
            }
            off={
                <Button
                    theme={ThemeButton.CLEAR}
                    className={classNames('', {}, [className])}
                    onClick={onToggleHandler}
                >
                    <IconDeprecated
                        Svg={ThemeIcon}
                        width={40}
                        height={40}
                        inverted
                    />
                    {/* {theme === Theme.DARK ? <DarkIcon /> : <ThemeIcon />} */}
                </Button>
            }
        />
    );
});
