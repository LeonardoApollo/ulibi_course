import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface SettingPageProps {
    className?: string;
}

const SettingPage = memo((props: SettingPageProps) => {
    const { className } = props;
    const { t } = useTranslation('settings');

    return (
        <Page className={className}>
            <VStack gap="16">
                <Text title={t('Настройки')} />
                <UiDesignSwitcher />
            </VStack>
        </Page>
    );
});

export default SettingPage;
