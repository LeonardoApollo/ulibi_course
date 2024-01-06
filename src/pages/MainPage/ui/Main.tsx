import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

import { ToggleFeatures } from '@/shared/libs/features';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

const Main = memo(() => {
    const { t } = useTranslation('main');

    return (
        <Page data-testid="MainPage">
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <VStack max gap="16" wrap="wrap">
                        <Text variant="accent" title={t('Важно!')} />
                        <Text
                            text={t(
                                'Бэкэнд сделан с помощью json-server а бесплатный сервер Vercel раздает только статику',
                            )}
                        />
                        <Text
                            variant="error"
                            text={t('Выпоняется переход на Firebase!')}
                        />
                        <HStack gap="16" max align="start" justify="between">
                            <div>
                                <Text text={`✅ ${t('Регистрация')}`} />
                                <Text text={`✅ ${t('Авторизация')}`} />
                                <Text text={`✅ ${t('Выход')}`} />
                                <Text text={`✅ ${t('Профиль')}`} />
                                <Text text={`✅ ${t('Рейтинг профиля')}`} />
                                <Text text={`✅ ${t('Уведомления')}`} />
                                <Text text={`✅ ${t('JsonSettings')}`} />
                            </div>
                            <div>
                                <Text text={`❌ ${t('Статьи')}`} />
                                <Text text={`❌ ${t('Рейтинг статьи')}`} />
                                <Text text={`❌ ${t('Комментарии')}`} />
                                <Text
                                    text={`❌ ${t(
                                        'Редактирование/удаление/создание статьи',
                                    )}`}
                                />
                            </div>
                        </HStack>
                        <Text variant="accent" text={t('Данные для входа')} />
                        <Text
                            text={t(
                                'Логин и пароль для admin роли: Admin или admin@gmail.com, 123456',
                            )}
                        />
                        <Text
                            text={t(
                                'Логин и пароль для user роли: User или user@gmail.com, 123456',
                            )}
                        />
                        <Text
                            text={t(
                                'Логин и пароль для manager роли: Manager или manager@gmail.com, 123456',
                            )}
                        />
                    </VStack>
                }
                off={
                    <VStack max gap="16" wrap="wrap">
                        <TextDeprecated
                            theme={TextTheme.INVERTED}
                            title={t('Важно!')}
                        />
                        <TextDeprecated
                            text={t(
                                'Бэкэнд сделан с помощью json-server а бесплатный сервер Vercel раздает только статику',
                            )}
                        />
                        <TextDeprecated
                            text={t(
                                'Поэтому возможен только вход с существующими данными',
                            )}
                        />
                        <TextDeprecated
                            theme={TextTheme.ERROR}
                            text={t('Выпоняется переход на Firebase!')}
                        />
                        <HStack gap="16" max align="start" justify="between">
                            <div>
                                <TextDeprecated
                                    text={`✅ ${t('Регистрация')}`}
                                />
                                <TextDeprecated
                                    text={`✅ ${t('Авторизация')}`}
                                />
                                <TextDeprecated text={`✅ ${t('Выход')}`} />
                                <TextDeprecated text={`✅ ${t('Профиль')}`} />
                                <TextDeprecated
                                    text={`✅ ${t('Рейтинг профиля')}`}
                                />
                                <TextDeprecated
                                    text={`✅ ${t('Уведомления')}`}
                                />
                                <TextDeprecated
                                    text={`✅ ${t('JsonSettings')}`}
                                />
                            </div>
                            <div>
                                <TextDeprecated text={`❌ ${t('Статьи')}`} />
                                <TextDeprecated
                                    text={`❌ ${t('Рейтинг статьи')}`}
                                />
                                <TextDeprecated
                                    text={`❌ ${t('Комментарии')}`}
                                />
                                <TextDeprecated
                                    text={`❌ ${t(
                                        'Редактирование/удаление/создание статьи',
                                    )}`}
                                />
                            </div>
                        </HStack>
                        <TextDeprecated text={t('Данные для входа')} />
                        <TextDeprecated
                            text={t(
                                'Логин и пароль для admin роли: Admin или admin@gmail.com, 123456',
                            )}
                        />
                        <TextDeprecated
                            text={t(
                                'Логин и пароль для user роли: User или user@gmail.com, 123456',
                            )}
                        />
                        <TextDeprecated
                            text={t(
                                'Логин и пароль для manager роли: Manager или manager@gmail.com, 123456',
                            )}
                        />
                    </VStack>
                }
            />
        </Page>
    );
});

export default Main;
