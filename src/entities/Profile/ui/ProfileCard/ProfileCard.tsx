import { FC } from 'react';

import { ToggleFeatures } from '@/shared/libs/features';

import { ProfileCardProps } from '../../module/types/profileProps';
import {
    ProfileCardDeprecated,
    ProfileCardDeprecatedError,
    ProfileCardDeprecatedLoading,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import {
    ProfileCardRedesginedLoding,
    ProfileCardRedesigned,
    ProfileCardRedesignedError,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';

export const ProfileCard: FC<ProfileCardProps> = (props: ProfileCardProps) => {
    const { isLoading, error } = props;

    if (isLoading) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<ProfileCardRedesginedLoding />}
                off={<ProfileCardDeprecatedLoading />}
            />
        );
    }

    if (error) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<ProfileCardRedesignedError />}
                off={<ProfileCardDeprecatedError />}
            />
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<ProfileCardRedesigned {...props} />}
            off={<ProfileCardDeprecated {...props} />}
        />
    );
};
