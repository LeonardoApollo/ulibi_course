import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';

import { Card } from '@/shared/ui/deprecated/Card';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';

import { useProfileRating, useRateProfile } from '../api/profileRatingApi';

export interface ProfileRatingProps {
    className?: string;
    profileId?: string;
}

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
            <Card max>
                <Text
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                    title={t('Ошибка загрузки рейтинга')}
                    text={message}
                />
            </Card>
        );
    }

    if (profileId === userData?.id) {
        return (
            <Card max>
                <Text
                    align={TextAlign.CENTER}
                    title={t('Вы не можете оценить свой профиль')}
                />
            </Card>
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
