import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';

import { ToggleFeatures, toggleFeatures } from '@/shared/libs/features';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import {
    TextAlign,
    Text as TextDeprecated,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

import { useProfileRating, useRateProfile } from '../api/profileRatingApi';

export interface ProfileRatingProps {
    className?: string;
    profileId?: string;
}

const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
});

const ProfileRating = ({ className, profileId }: ProfileRatingProps) => {
    const { t } = useTranslation('profile');
    const userData = useSelector(getUserAuthData);
    const { data, isLoading, error } = useProfileRating({
        profileId: profileId ?? '',
        userId: userData?.id ?? '',
    });

    const [rateProfileMutation] = useRateProfile();

    const rating = data?.[0];

    const handleRateProfile = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateProfileMutation({
                    userId: userData?.id ?? '',
                    profileId: profileId ?? '',
                    rate: starsCount,
                    feedback,
                });
            } catch (e) {
                console.log(e);
            }
        },
        [rateProfileMutation, profileId, userData?.id],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateProfile(starsCount);
        },
        [handleRateProfile],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateProfile(starsCount, feedback);
        },
        [handleRateProfile],
    );

    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    if (error) {
        // @ts-ignore
        const message = error?.status;
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card max borderRadius="round">
                        <Text
                            variant="error"
                            align="center"
                            title={t('Ошибка загрузки рейтинга')}
                            text={message}
                        />
                    </Card>
                }
                off={
                    <CardDeprecated max>
                        <TextDeprecated
                            theme={TextTheme.ERROR}
                            align={TextAlign.CENTER}
                            title={t('Ошибка загрузки рейтинга')}
                            text={message}
                        />
                    </CardDeprecated>
                }
            />
        );
    }

    if (profileId === userData?.id) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card max borderRadius="round">
                        <Text
                            align="center"
                            title={t('Вы не можете оценить свой профиль')}
                        />
                    </Card>
                }
                off={
                    <CardDeprecated max>
                        <TextDeprecated
                            align={TextAlign.CENTER}
                            title={t('Вы не можете оценить свой профиль')}
                        />
                    </CardDeprecated>
                }
            />
        );
    }

    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            className={className}
            title={t('Оцените профиль')}
            feedbackTitle={t('Оставьте свой отзыв о профиле')}
            hasFeedback
        />
    );
};

export default memo(ProfileRating);
