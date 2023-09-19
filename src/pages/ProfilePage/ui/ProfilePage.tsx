import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { EditableProfileCard } from '@/features/editableProfileCard';
import { classNames } from '@/shared/libs/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
    const { t } = useTranslation('profile');
    const { id } = useParams<{ id: string }>();

    if (!id && __PROJECT__ !== 'storybook') {
        return <Text text={t('Ошибка при получении профиля')} />;
    }

    return (
        <Page className={classNames('', {}, [className])}>
            <VStack max gap="16">
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
});

export default ProfilePage;
