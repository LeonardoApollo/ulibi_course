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
                        <Text text={t('Бэкэнд сделан с помощью Firebase')} />
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
                                'Сейчас вы видите старый дизайн, чтобы увидеть новый создайте аккаунт или войдите под Admin',
                            )}
                        />
                        <TextDeprecated
                            text={t('Бэкэнд сделан с помощью Firebase')}
                        />
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
