import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserProfile = (state: StateSchema) =>
    state.user.authData?.profile || {};
