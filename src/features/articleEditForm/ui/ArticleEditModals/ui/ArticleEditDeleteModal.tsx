import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/redesigned/Button';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleEditExitModalProps {
    className?: string;
    isDeleteModalOpen: boolean;
    onDeleteModalClose: () => void;
    onDeleteArticle: () => void;
}

export const ArticleEditDeleteModal = memo(
    (props: ArticleEditExitModalProps) => {
        const {
            className,
            isDeleteModalOpen,
            onDeleteModalClose,
            onDeleteArticle,
        } = props;
        const { t } = useTranslation('articleForm');

        return (
            <Modal
                className={className}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
            >
                <VStack gap="16" max>
                    <Text
                        title={t('Вы действительно хотите удалить статью?')}
                    />
                    <Text
                        variant="error"
                        bold
                        text={t('Все данные будут безвозвратно удалены')}
                    />
                    <HStack max justify="between">
                        <Button colorType="success" onClick={onDeleteArticle}>
                            {t('Да')}
                        </Button>
                        <Button colorType="error" onClick={onDeleteModalClose}>
                            {t('Нет')}
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        );
    },
);
