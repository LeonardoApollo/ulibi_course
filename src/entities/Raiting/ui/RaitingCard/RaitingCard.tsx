import {
    MutableRefObject, memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Card } from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text/Text';
import { StarRaiting } from '@/shared/ui/StarRaiting/StarRaiting';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, SizeButton, ThemeButton } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RaitingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RaitingCard = memo((props: RaitingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onCancel,
        onAccept,
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const [validationError, setValidationError] = useState('');

    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [onAccept, hasFeedback]);

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [onAccept, feedback, starsCount]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const closeAcceptDelay = useCallback(() => {
        if (feedback.length >= 3) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                acceptHandler();
                setIsClosing(false);
            }, 1000);
        } else {
            setValidationError(t('Отзыв должен состоять минимум 3 символа'));
        }
    }, [feedback, acceptHandler, t]);

    useEffect(() => () => {
        clearTimeout(timerRef.current);
    }, [isModalOpen]);

    const modalContent = (
        <>
            {validationError && (
                <Text text={validationError} theme={TextTheme.ERROR} />
            )}
            <Text title={feedbackTitle} />
            <Input value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')} />
        </>
    );

    return (
        <Card className={classNames('', {}, [className])}>
            <VStack align="center" gap="8">
                <Text title={title} />
                <StarRaiting size={40} onSelect={onSelectStars} />
            </VStack>
            <BrowserView>
                {isModalOpen && (
                    <Modal isOpen={isModalOpen} lazy onClose={cancelHandler}>
                        {isClosing
                            ? <Text align={TextAlign.CENTER} title={t('Спасибо за отзыв!')} />
                            : (
                                <>
                                    {modalContent}
                                    <VStack max gap="32">
                                        <HStack gap="16" max justify="end">
                                            <Button theme={ThemeButton.OUTLINE_RED} onClick={cancelHandler}>
                                                {t('Закрыть')}
                                            </Button>
                                            <Button onClick={closeAcceptDelay}>
                                                {t('Отправить')}
                                            </Button>
                                        </HStack>
                                    </VStack>
                                </>
                            )}
                    </Modal>
                )}
            </BrowserView>
            <MobileView>
                {isModalOpen && (
                    <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
                        {isClosing
                            ? <Text align={TextAlign.CENTER} title={t('Спасибо за отзыв!')} />
                            : (
                                <>
                                    {modalContent}
                                    <VStack gap="32">
                                        <Button fullWidth size={SizeButton.L} onClick={closeAcceptDelay}>
                                            {t('Отправить')}
                                        </Button>
                                    </VStack>
                                </>
                            )}
                    </Drawer>
                )}
            </MobileView>
        </Card>
    );
});
