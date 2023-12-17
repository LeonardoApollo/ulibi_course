import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

import { ToggleFeatures } from '@/shared/libs/features';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
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
                            text={t(
                                'Поэтому возможен только вход с существующими данными',
                            )}
                        />
                        <Text variant="accent" text={t('Данные для входа')} />
                        <Text
                            text={t(
                                'Логин и пароль для admin роли: Admin, 123',
                            )}
                        />
                        <Text
                            text={t('Логин и пароль для user роли: User, 345')}
                        />
                        <Text
                            text={t(
                                'Логин и пароль для manager роли: Manager, 567',
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
                        <TextDeprecated text={t('Данные для входа')} />
                        <TextDeprecated
                            text={t(
                                'Логин и пароль для admin роли: Admin, 123',
                            )}
                        />
                        <TextDeprecated
                            text={t('Логин и пароль для user роли: User, 345')}
                        />
                        <TextDeprecated
                            text={t(
                                'Логин и пароль для manager роли: Manager, 567',
                            )}
                        />
                    </VStack>
                }
            />
        </Page>
    );
});

export default Main;
