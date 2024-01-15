import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';

import { isMobile } from '@/shared/libs/isMobile/isMobile';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './SettingPage.module.scss';

interface SettingPageProps {
    className?: string;
}

const SettingPage = memo((props: SettingPageProps) => {
    const { className } = props;
    const { t } = useTranslation('settings');
    const mobile = isMobile();

    return (
        <Page className={className}>
            <VStack gap="16">
                <Text title={t('Настройки')} />
                <UiDesignSwitcher
                    className={mobile ? cls.MobileSwitcher : cls.Switcher}
                />
            </VStack>
        </Page>
    );
});

export default SettingPage;
