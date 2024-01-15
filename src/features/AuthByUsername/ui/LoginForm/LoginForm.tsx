import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import PasswordEye from '@/shared/assets/icons/eye-password.svg';
import { USERNAME_ALREADY_EXIST } from '@/shared/const/errors';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { classNames } from '@/shared/libs/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/libs/features';
import { isMobile } from '@/shared/libs/isMobile/isMobile';
import { useForceUpdate } from '@/shared/render/forceUpdate';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { getLoginEmail } from '../../model/selectors/getLoginEmail/getLoginEmail';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginisLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { registerUser } from '../../model/services/register/registerUser';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
}

const initalReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const [isModalRegister, setIsModalRegister] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const email = useSelector(getLoginEmail);
    const isLoading = useSelector(getLoginisLoading);
    const error = useSelector(getLoginError);
    const forceUpdate = useForceUpdate();
    const mobile = isMobile();

    const onChangeUsername = useCallback(
        (value: string) => {
            if (value.length >= 5 || value.length === 0) {
                setErrorUsername(false);
            } else {
                setErrorUsername(true);
            }
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            if (value.length >= 6 || value.length === 0) {
                setErrorPassword(false);
            } else {
                setErrorPassword(true);
            }
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onChnageEmail = useCallback(
        (value: string) => {
            if (
                value.match(
                    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
                ) ||
                value.length === 0
            ) {
                setErrorEmail(false);
            } else {
                setErrorEmail(true);
            }
            dispatch(loginActions.setEmail(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            forceUpdate();
        }
    }, [dispatch, username, password, forceUpdate]);

    const onRegisterClick = useCallback(async () => {
        const result = await dispatch(
            registerUser({ username, password, email }),
        );
        if (result.meta.requestStatus === 'fulfilled') {
            forceUpdate();
        }
    }, [dispatch, username, password, email, forceUpdate]);

    const onChangeModalClick = useCallback(() => {
        setIsModalRegister((prev) => !prev);
        setErrorEmail(false);
        setErrorUsername(false);
        setErrorPassword(false);
        dispatch(loginActions.resetErrors());
        dispatch(loginActions.setEmail(''));
        dispatch(loginActions.setUsername(''));
        dispatch(loginActions.setPassword(''));
    }, [dispatch]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initalReducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <VStack
                        gap="16"
                        className={classNames(
                            mobile ? cls.MobileLoginForm : cls.LoginForm,
                            {},
                            [className],
                        )}
                        align="center"
                    >
                        <Text
                            title={
                                isModalRegister
                                    ? t('Форма регистрации')
                                    : t('Форма авторизации')
                            }
                        />
                        {error && (
                            <Text
                                text={
                                    error === USERNAME_ALREADY_EXIST
                                        ? t('Данный логин уже существет')
                                        : t(
                                              'Вы ввели неверный логин/email или пароль',
                                          )
                                }
                                variant="error"
                            />
                        )}
                        {isModalRegister && errorUsername && (
                            <Text
                                variant="error"
                                text={t('Длина логина минимум 5 символов')}
                            />
                        )}
                        <Input
                            autofocuse
                            type="text"
                            className={cls.input}
                            placeholder={
                                isModalRegister
                                    ? t('Придумайте логин')
                                    : t('Введите логин/email')
                            }
                            onChange={onChangeUsername}
                            value={username}
                        />
                        {isModalRegister && (
                            <>
                                {errorEmail && (
                                    <Text
                                        variant="error"
                                        text={t('Некорректный email')}
                                    />
                                )}
                                <Input
                                    type="email"
                                    className={cls.input}
                                    placeholder={t('Введите email')}
                                    onChange={onChnageEmail}
                                    value={email}
                                />
                            </>
                        )}
                        {isModalRegister && errorPassword && (
                            <Text
                                variant="error"
                                text={t('Длина пароля минимум 6 символов')}
                            />
                        )}
                        <div className={cls.PasswordContainer}>
                            <button
                                className={cls.PasswordEye}
                                type="button"
                                onClick={() =>
                                    setIsPasswordHidden((prev) => !prev)
                                }
                            >
                                <Icon
                                    className={classNames(cls.Eye, {
                                        [cls.isShown]: !isPasswordHidden,
                                    })}
                                    Svg={PasswordEye}
                                />
                            </button>
                            <Input
                                type={isPasswordHidden ? 'password' : 'text'}
                                className={cls.input}
                                placeholder={t('Введите пароль')}
                                onChange={onChangePassword}
                                value={password}
                            />
                        </div>
                        <Button variant="filled" onClick={onChangeModalClick}>
                            <Text
                                variant="accent"
                                text={
                                    isModalRegister
                                        ? t('Вернуться')
                                        : t('Зарегестироваться')
                                }
                                className={cls.Register}
                            />
                        </Button>
                        <Button
                            variant="outline"
                            className={cls.loginBtn}
                            onClick={
                                isModalRegister ? onRegisterClick : onLoginClick
                            }
                            disabled={
                                isLoading ||
                                errorEmail ||
                                errorPassword ||
                                errorUsername
                            }
                        >
                            {isModalRegister
                                ? t('Зарегестироваться')
                                : t('Войти')}
                        </Button>
                    </VStack>
                }
                off={
                    <div
                        className={classNames(
                            mobile ? cls.MobileLoginForm : cls.LoginForm,
                            {},
                            [className],
                        )}
                    >
                        <TextDeprecated
                            title={
                                isModalRegister
                                    ? t('Форма регистрации')
                                    : t('Форма авторизации')
                            }
                        />
                        {error && (
                            <TextDeprecated
                                text={
                                    error === USERNAME_ALREADY_EXIST
                                        ? t('Данный логин уже существет')
                                        : t(
                                              'Вы ввели неверный логин/email или пароль',
                                          )
                                }
                                theme={TextTheme.ERROR}
                            />
                        )}
                        {isModalRegister && errorUsername && (
                            <TextDeprecated
                                theme={TextTheme.ERROR}
                                text={t('Длина логина минимум 5 символов')}
                            />
                        )}
                        <Input
                            autofocuse
                            type="text"
                            className={cls.input}
                            placeholder={
                                isModalRegister
                                    ? t('Придумайте логин')
                                    : t('Введите логин/email')
                            }
                            onChange={onChangeUsername}
                            value={username}
                        />
                        {isModalRegister && (
                            <>
                                {errorEmail && (
                                    <TextDeprecated
                                        theme={TextTheme.ERROR}
                                        text={t('Некорректный email')}
                                    />
                                )}
                                <Input
                                    type="email"
                                    className={cls.input}
                                    placeholder={t('Введите email')}
                                    onChange={onChnageEmail}
                                    value={email}
                                />
                            </>
                        )}
                        {isModalRegister && errorPassword && (
                            <TextDeprecated
                                theme={TextTheme.ERROR}
                                text={t('Длина пароля минимум 6 символов')}
                            />
                        )}
                        <Input
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите пароль')}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <ButtonDeprecated
                            className={cls.button}
                            theme={ThemeButton.CLEAR}
                            onClick={onChangeModalClick}
                        >
                            <TextDeprecated
                                text={
                                    isModalRegister
                                        ? t('Вернуться')
                                        : t('Зарегестироваться')
                                }
                                className={cls.Register}
                            />
                        </ButtonDeprecated>
                        <ButtonDeprecated
                            theme={ThemeButton.OUTLINE}
                            className={cls.loginBtn}
                            onClick={
                                isModalRegister ? onRegisterClick : onLoginClick
                            }
                            disabled={isLoading}
                        >
                            {isModalRegister
                                ? t('Зарегестироваться')
                                : t('Войти')}
                        </ButtonDeprecated>
                    </div>
                }
            />
        </DynamicModuleLoader>
    );
});

export default LoginForm;
