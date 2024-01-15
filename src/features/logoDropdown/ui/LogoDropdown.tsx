import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import AppLogo from '@/shared/assets/icons/AppLogo.svg';
import AppLogoSmall from '@/shared/assets/icons/AppLogoSmall.svg';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
} from '@/shared/const/router';
import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Dropdown } from '@/shared/ui/redesigned/Popups';

interface AvatarDropdownProps {
    className?: string;
    short?: boolean;
}

export const LogoDropdown = memo((props: AvatarDropdownProps) => {
    const { className, short = false } = props;
    const { t } = useTranslation();

    const items = [
        {
            content: t('Главная'),
            href: getRouteMain(),
        },
        {
            content: t('О сайте'),
            href: getRouteAbout(),
        },
        ...(!short
            ? [
                  {
                      content: t('Статьи'),
                      href: getRouteArticles(),
                  },
              ]
            : []),
    ];

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Dropdown
                    direction="bottomRight"
                    className={classNames('', {}, [className])}
                    items={items}
                    row
                    trigger={
                        <Icon
                            Svg={short ? AppLogo : AppLogoSmall}
                            className={className}
                        />
                    }
                />
            }
            off={
                <DropdownDeprecated
                    direction="bottomRight"
                    className={classNames('', {}, [className])}
                    items={items}
                    trigger={
                        <Text
                            title={short ? t('MT den news') : t('MT')}
                            theme={TextTheme.INVERTED}
                        />
                    }
                />
            }
        />
    );
});
