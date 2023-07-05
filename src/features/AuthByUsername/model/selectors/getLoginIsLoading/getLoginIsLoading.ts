import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginisLoading = (state: StateSchema) => state?.loginForm?.isLoading || false;
