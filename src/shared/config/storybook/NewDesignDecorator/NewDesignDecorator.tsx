import { Story } from '@storybook/react';

import { setFeatureFlags } from '@/shared/libs/features';
import { getAllFeatureFlags } from '@/shared/libs/features/lib/setGetFeatures';

export const NewDesignDecorator = (StoryComponent: Story) => {
    setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });
    return (
        <div className="app_redesigned">
            <StoryComponent />
        </div>
    );
};
