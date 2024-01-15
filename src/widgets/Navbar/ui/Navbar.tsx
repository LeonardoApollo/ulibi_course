import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { LoginModal } from '@/features/AuthByUsername';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwithcer } from '@/features/ThemeSwitcher';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { LogoDropdown } from '@/features/logoDropdown';
import { NotificationButton } from '@/features/notificationButton';

import { getUserAuthData } from '@/entities/User';

import CreateArticle from '@/shared/assets/icons/CreateArticle.svg';
import CreateArticleIcon from '@/shared/assets/icons/CreateArticleRedesigned.svg';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';
import {
    AppLink as AppLinkDeprecated,
    AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon as IconRedesigned } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    if (authData) {
        return (
            <>
                <BrowserView>
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={
                            <header
                                className={classNames(
                                    cls.NavbarRedesigned,
                                    {},
                                    [className],
                                )}
                            >
                                <HStack gap="16" className={cls.actions}>
                                    <AppLink
                                        className={cls.iconLink}
                                        to={getRouteArticleCreate()}
                                    >
                                        <IconRedesigned
                                            className={cls.createIcon}
                                            Svg={CreateArticleIcon}
                                        />
                                    </AppLink>
                                    <NotificationButton />
                                    <AvatarDropdown />
                                </HStack>
                            </header>
                        }
                        off={
                            <header
                                className={classNames(cls.Navbar, {}, [
                                    className,
                                ])}
                            >
                                <Text
                                    className={cls.appName}
                                    title={t('MT')}
                                    theme={TextTheme.INVERTED}
                                />
                                <AppLinkDeprecated
                                    to={getRouteArticleCreate()}
                                    theme={AppLinkTheme.SECONDARY}
                                    className={cls.createBtn}
                                >
                                    {t('Создать статью')}
                                </AppLinkDeprecated>
                                <HStack gap="16" className={cls.actions}>
                                    <NotificationButton />
                                    <AvatarDropdown />
                                </HStack>
                            </header>
                        }
                    />
                </BrowserView>
                <MobileView>
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={
                            <header
                                className={classNames(
                                    cls.MobileNavbarRedesigned,
                                    {},
                                    [className],
                                )}
                            >
                                <LogoDropdown />
                                <HStack gap="16" className={cls.actions}>
                                    <AppLink
                                        className={cls.iconLink}
                                        to={getRouteArticleCreate()}
                                    >
                                        <IconRedesigned
                                            className={cls.createIcon}
                                            Svg={CreateArticleIcon}
                                        />
                                    </AppLink>
                                    <NotificationButton />
                                    <ThemeSwithcer className={cls.Theme} />
                                    <LangSwitcher short className={cls.Lang} />
                                    <AvatarDropdown />
                                </HStack>
                            </header>
                        }
                        off={
                            <header
                                className={classNames(cls.Navbar, {}, [
                                    className,
                                ])}
                            >
                                <LogoDropdown />
                                <HStack gap="16" className={cls.actions}>
                                    <AppLinkDeprecated
                                        className={cls.iconLinkDeprecated}
                                        to={getRouteArticleCreate()}
                                    >
                                        <IconDeprecated
                                            inverted
                                            className={cls.createIconDeprecated}
                                            Svg={CreateArticle}
                                        />
                                    </AppLinkDeprecated>
                                    <NotificationButton />
                                    <ThemeSwithcer className={cls.Theme} />
                                    <LangSwitcher short className={cls.Lang} />
                                    <AvatarDropdown />
                                </HStack>
                            </header>
                        }
                    />
                </MobileView>
            </>
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <>
                    <BrowserView>
                        <header
                            className={classNames(cls.NavbarRedesigned, {}, [
                                className,
                            ])}
                        >
                            <Button
                                variant="background"
                                className={cls.links}
                                onClick={onShowModal}
                            >
                                {t('Войти')}
                            </Button>
                            {isAuthModal && (
                                <LoginModal
                                    isOpen={isAuthModal}
                                    onClose={onCloseModal}
                                />
                            )}
                        </header>
                    </BrowserView>
                    <MobileView>
                        <header
                            className={classNames(
                                cls.MobileNavbarRedesignedNoAuth,
                                {},
                                [className],
                            )}
                        >
                            <LogoDropdown short className={cls.AppLogo} />
                            <HStack gap="16">
                                <ThemeSwithcer className={cls.Theme} />
                                <LangSwitcher short className={cls.Lang} />
                                <Button
                                    variant="background"
                                    className={cls.links}
                                    onClick={onShowModal}
                                >
                                    {t('Войти')}
                                </Button>
                                {isAuthModal && (
                                    <LoginModal
                                        isOpen={isAuthModal}
                                        onClose={onCloseModal}
                                    />
                                )}
                            </HStack>
                        </header>
                    </MobileView>
                </>
            }
            off={
                <>
                    <BrowserView>
                        <header
                            className={classNames(cls.NavbarNoAuth, {}, [
                                className,
                            ])}
                        >
                            <Text
                                className={cls.appName}
                                title={t('MT den news')}
                                theme={TextTheme.INVERTED}
                            />
                            <ThemeSwithcer className={cls.Theme} />
                            <LangSwitcher short className={cls.Lang} />
                            <ButtonDeprecated
                                theme={ThemeButton.CLEAR_INVERTED}
                                className={cls.links}
                                onClick={onShowModal}
                            >
                                {t('Войти')}
                            </ButtonDeprecated>
                            {isAuthModal && (
                                <LoginModal
                                    isOpen={isAuthModal}
                                    onClose={onCloseModal}
                                />
                            )}
                        </header>
                    </BrowserView>
                    <MobileView>
                        <header
                            className={classNames(cls.NavbarNoAuth, {}, [
                                className,
                            ])}
                        >
                            <LogoDropdown short />
                            <ThemeSwithcer className={cls.Theme} />
                            <LangSwitcher short className={cls.Lang} />
                            <ButtonDeprecated
                                theme={ThemeButton.CLEAR_INVERTED}
                                className={cls.links}
                                onClick={onShowModal}
                            >
                                {t('Войти')}
                            </ButtonDeprecated>
                            {isAuthModal && (
                                <LoginModal
                                    isOpen={isAuthModal}
                                    onClose={onCloseModal}
                                />
                            )}
                        </header>
                    </MobileView>
                </>
            }
        />
    );
});
