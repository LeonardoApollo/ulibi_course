import {
    MutableRefObject,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, SizeButton, ThemeButton } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { Input } from '@/shared/ui/deprecated/Input';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
    'data-testid'?: string;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        rate = 0,
        onCancel,
        onAccept,
    } = props;
    const { t } = useTranslation('article');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const [validationError, setValidationError] = useState('');

    const timerRef = useRef() as MutableRefObject<
        ReturnType<typeof setTimeout>
    >;

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [onAccept, hasFeedback],
    );

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
            setValidationError(t('Отзыв должен иметь минимум 3 символа'));
        }
    }, [feedback, acceptHandler, t]);

    useEffect(
        () => () => {
            clearTimeout(timerRef.current);
        },
        [isModalOpen],
    );

    const modalContent = (
        <>
            {validationError && (
                <Text text={validationError} theme={TextTheme.ERROR} />
            )}
            <Text title={feedbackTitle} />
            <Input
                value={feedback}
                onChange={setFeedback}
                placeholder={t('Ваш отзыв')}
                data-testid="RatingCard.Input"
            />
        </>
    );

    return (
        <Card data-testid={props['data-testid']} className={className} max>
            <VStack align="center" gap="8">
                <Text title={starsCount ? t('Спасибо за оценку!') : title} />
                <StarRating
                    selectedStars={starsCount}
                    size={40}
                    onSelect={onSelectStars}
                />
            </VStack>
            <BrowserView>
                {isModalOpen && (
                    <Modal isOpen={isModalOpen} lazy onClose={cancelHandler}>
                        {isClosing ? (
                            <Text
                                align={TextAlign.CENTER}
                                title={t('Спасибо за отзыв!')}
                            />
                        ) : (
                            <>
                                {modalContent}
                                <VStack max gap="32">
                                    <HStack gap="16" max justify="end">
                                        <Button
                                            theme={ThemeButton.OUTLINE_RED}
                                            onClick={cancelHandler}
                                            data-testid="RatingCard.Close"
                                        >
                                            {t('Закрыть')}
                                        </Button>
                                        <Button
                                            onClick={closeAcceptDelay}
                                            data-testid="RatingCard.Send"
                                        >
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
                    <Drawer isOpen={isModalOpen} onClose={cancelHandler}>
                        {isClosing ? (
                            <Text
                                align={TextAlign.CENTER}
                                title={t('Спасибо за отзыв!')}
                            />
                        ) : (
                            <>
                                {modalContent}
                                <VStack gap="32">
                                    <Button
                                        fullWidth
                                        size={SizeButton.L}
                                        onClick={closeAcceptDelay}
                                        data-testid="RatingCard.Send"
                                    >
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
