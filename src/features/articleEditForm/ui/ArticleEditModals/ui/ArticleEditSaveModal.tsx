import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/redesigned/Button';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleEditSaveModalProps {
    className?: string;
    isSaveModalOpen: boolean;
    onSaveModalClose: () => void;
    onChangeArticle: () => void;
    type: 'create' | 'update';
}

export const ArticleEditSaveModal = memo((props: ArticleEditSaveModalProps) => {
    const {
        className,
        isSaveModalOpen,
        onSaveModalClose,
        onChangeArticle,
        type,
    } = props;
    const { t } = useTranslation('articleForm');

    return (
        <Modal
            className={className}
            isOpen={isSaveModalOpen}
            onClose={onSaveModalClose}
        >
            <VStack gap="16" max>
                <Text
                    title={
                        type === 'create'
                            ? t('Создать статью?')
                            : t('Сохранить изменения?')
                    }
                />
                <Text
                    variant="error"
                    text={t('Убедитесь что все блоки сохраненны!')}
                />
                <HStack max justify="between">
                    <Button colorType="success" onClick={onChangeArticle}>
                        {t('Да')}
                    </Button>
                    <Button colorType="error" onClick={onSaveModalClose}>
                        {t('Нет')}
                    </Button>
                </HStack>
            </VStack>
        </Modal>
    );
});
