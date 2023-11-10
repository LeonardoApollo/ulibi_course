import { FeatureFlags } from '@/shared/types/featureFlags';

// Фичи не меняются в ходе сессии, их необязательно делать реактивными
// eslint-disable-next-line
export let featureFlags: FeatureFlags = {};

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
