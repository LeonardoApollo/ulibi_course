import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/redesigned/Button';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleEditExitModalProps {
    className?: string;
    isExitModalOpen: boolean;
    onExitModalClose: () => void;
    onExit: () => void;
}

export const ArticleEditExitModal = memo((props: ArticleEditExitModalProps) => {
    const { className, isExitModalOpen, onExitModalClose, onExit } = props;
    const { t } = useTranslation('articleForm');

    return (
        <Modal
            className={className}
            isOpen={isExitModalOpen}
            onClose={onExitModalClose}
        >
            <VStack gap="16" max>
                <Text title={t('Вы действительно хотите выйти?')} />
                <Text
                    variant="error"
                    bold
                    text={t('Изменения не будут сохранены')}
                />
                <HStack max justify="between">
                    <Button colorType="success" onClick={onExit}>
                        {t('Да')}
                    </Button>
                    <Button colorType="error" onClick={onExitModalClose}>
                        {t('Нет')}
                    </Button>
                </HStack>
            </VStack>
        </Modal>
    );
});
