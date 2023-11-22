import { Story } from '@storybook/react';

import { setFeatureFlags } from '@/shared/libs/features';
import { FeatureFlags } from '@/shared/types/featureFlags';

export const FeatureFlagsDecorator =
    (features: FeatureFlags) => (StoryComponent: Story) => {
        setFeatureFlags(features);
        return <StoryComponent />;
    };
