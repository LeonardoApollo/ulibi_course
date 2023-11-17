import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { saveJsonSettings, useJsonSettings } from '@/entities/User';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { ToggleFeatures } from '@/shared/libs/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/redesigned/Text';

export const ArticlePageGreeting = memo(() => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { isArticlesPageWasOpend } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isArticlesPageWasOpend) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ isArticlesPageWasOpend: true }));
        }
    }, [isArticlesPageWasOpend, dispatch]);

    const onClose = () => setIsOpen(false);

    const text = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Text
                    title={t('Добро пожаловать на страницу статей')}
                    text={t(
                        'Здаесь вы можете искать и просматривать статьи на различные темы',
                    )}
                />
            }
            off={
                <TextDeprecated
                    title={t('Добро пожаловать на страницу статей')}
                    text={t(
                        'Здаесь вы можете искать и просматривать статьи на различные темы',
                    )}
                />
            }
        />
    );

    if (isMobile) {
        return (
            <Drawer isOpen={isOpen} onClose={onClose}>
                {text}
            </Drawer>
        );
    }

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            {text}
        </Modal>
    );
});
