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

import { ToggleFeatures, toggleFeatures } from '@/shared/libs/features';
import {
    Button as ButtonDeprecated,
    SizeButton,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
    TextAlign,
    Text as TextDeprecated,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card as CardRedesinged } from '@/shared/ui/redesigned/Card';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Text } from '@/shared/ui/redesigned/Text';

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <>
                    {validationError && (
                        <Text text={validationError} variant="error" />
                    )}
                    <Text title={feedbackTitle} />
                    <Input
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                        data-testid="RatingCard.Input"
                    />
                </>
            }
            off={
                <>
                    {validationError && (
                        <TextDeprecated
                            text={validationError}
                            theme={TextTheme.ERROR}
                        />
                    )}
                    <TextDeprecated title={feedbackTitle} />
                    <InputDeprecated
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                        data-testid="RatingCard.Input"
                    />
                </>
            }
        />
    );

    const Card = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => CardRedesinged,
        off: () => CardDeprecated,
    });

    return (
        <Card
            data-testid={props['data-testid']}
            className={className}
            max
            borderRadius="round"
        >
            <VStack align="center" gap="8">
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Text
                            title={starsCount ? t('Спасибо за оценку!') : title}
                        />
                    }
                    off={
                        <TextDeprecated
                            title={starsCount ? t('Спасибо за оценку!') : title}
                        />
                    }
                />
                <StarRating
                    selectedStars={starsCount}
                    size={40}
                    onSelect={onSelectStars}
                />
            </VStack>
            <BrowserView>
                {isModalOpen && (
                    <Modal isOpen={isModalOpen} lazy onClose={cancelHandler}>
                        <VStack max gap="16">
                            {isClosing ? (
                                <ToggleFeatures
                                    feature="isAppRedesigned"
                                    on={
                                        <Text
                                            align="center"
                                            title={t('Спасибо за отзыв!')}
                                        />
                                    }
                                    off={
                                        <TextDeprecated
                                            align={TextAlign.CENTER}
                                            title={t('Спасибо за отзыв!')}
                                        />
                                    }
                                />
                            ) : (
                                <>
                                    {modalContent}
                                    <VStack max gap="32">
                                        <ToggleFeatures
                                            feature="isAppRedesigned"
                                            on={
                                                <HStack
                                                    gap="16"
                                                    max
                                                    justify="end"
                                                >
                                                    <Button
                                                        onClick={cancelHandler}
                                                        data-testid="RatingCard.Close"
                                                    >
                                                        {t('Закрыть')}
                                                    </Button>
                                                    <Button
                                                        onClick={
                                                            closeAcceptDelay
                                                        }
                                                        data-testid="RatingCard.Send"
                                                    >
                                                        {t('Отправить')}
                                                    </Button>
                                                </HStack>
                                            }
                                            off={
                                                <HStack
                                                    gap="16"
                                                    max
                                                    justify="end"
                                                >
                                                    <ButtonDeprecated
                                                        theme={
                                                            ThemeButton.OUTLINE_RED
                                                        }
                                                        onClick={cancelHandler}
                                                        data-testid="RatingCard.Close"
                                                    >
                                                        {t('Закрыть')}
                                                    </ButtonDeprecated>
                                                    <ButtonDeprecated
                                                        onClick={
                                                            closeAcceptDelay
                                                        }
                                                        data-testid="RatingCard.Send"
                                                    >
                                                        {t('Отправить')}
                                                    </ButtonDeprecated>
                                                </HStack>
                                            }
                                        />
                                    </VStack>
                                </>
                            )}
                        </VStack>
                    </Modal>
                )}
            </BrowserView>
            <MobileView>
                {isModalOpen && (
                    <Drawer isOpen={isModalOpen} onClose={cancelHandler}>
                        {isClosing ? (
                            <ToggleFeatures
                                feature="isAppRedesigned"
                                on={
                                    <Text
                                        align="center"
                                        title={t('Спасибо за отзыв!')}
                                    />
                                }
                                off={
                                    <TextDeprecated
                                        align={TextAlign.CENTER}
                                        title={t('Спасибо за отзыв!')}
                                    />
                                }
                            />
                        ) : (
                            <>
                                {modalContent}
                                <VStack gap="32">
                                    <ToggleFeatures
                                        feature="isAppRedesigned"
                                        on={
                                            <Button
                                                fullWidth
                                                size="size_l"
                                                onClick={closeAcceptDelay}
                                                data-testid="RatingCard.Send"
                                            >
                                                {t('Отправить')}
                                            </Button>
                                        }
                                        off={
                                            <ButtonDeprecated
                                                fullWidth
                                                size={SizeButton.L}
                                                onClick={closeAcceptDelay}
                                                data-testid="RatingCard.Send"
                                            >
                                                {t('Отправить')}
                                            </ButtonDeprecated>
                                        }
                                    />
                                </VStack>
                            </>
                        )}
                    </Drawer>
                )}
            </MobileView>
        </Card>
    );
});
