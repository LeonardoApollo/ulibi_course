export { userReducer, userActions } from './model/slice/userSlice';
export type { UserSchema, User } from './model/types/user';
export { UserRole } from './model/consts/consts';
export { getUserAuthData } from './model/selectors/getUserAuthData';
export { getUserInited } from './model/selectors/getUserInited';
export {
    isUserAdmin,
    isUserManager,
    getUserRole,
} from './model/selectors/roleSelectors';
export { useJsonSettings } from './model/selectors/jsonSettings';
export { saveJsonSettings } from './model/services/saveJsonSettings';
export { initAuthData } from './model/services/initAuthData';
