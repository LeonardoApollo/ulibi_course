import { LOCAL_STORAGE_DESIGN_KEY } from '@/shared/const/localestorage';
import { FeatureFlags } from '@/shared/types/featureFlags';

const defaultFeatures: FeatureFlags = {
    isAppRedesigned: localStorage.getItem(LOCAL_STORAGE_DESIGN_KEY) === 'new',
};

// Фичи не меняются в ходе сессии, их необязательно делать реактивными
// eslint-disable-next-line
export let featureFlags: FeatureFlags = {
    ...defaultFeatures,
};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags?.[flag];
}

export function getAllFeatureFlags() {
    return featureFlags;
}
