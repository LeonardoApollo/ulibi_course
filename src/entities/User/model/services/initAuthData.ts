// Из-за перехода на firebase логика была перемещена в App.tsx, оставлено в качестве примера
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';

// import { ThunkConfig } from '@/app/providers/StoreProvider';

// import { db } from '@/shared/config/firebase/firebase';
// import { LOCAL_STORAGE_DESIGN_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localestorage';

// import { User } from '../types/user';
// import { UserRole } from '../consts/consts';
// import { userActions } from '../slice/userSlice';
// import { getUserDataByIdQuery } from '../../api/userApi';

// export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
//     'user/initAuthData',
//     async (newJsonSettings, thunkApi) => {
//         const { extra, rejectWithValue, dispatch } = thunkApi;

//         const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

//         if (!userId) {
//             return rejectWithValue('No userId');
//         }

//         try {

//              const response = await dispatch(
//                  getUserDataByIdQuery(userId),
//              ).unwrap();

//              localStorage.setItem(
//                  LOCAL_STORAGE_DESIGN_KEY,
//                  response.features?.isAppRedesigned ? 'new' : 'old',
//              );
//             return response ;
//         } catch (error) {
//             if (__PROJECT__ === 'frontend') {
//                 console.log(error);
//             }
//             return rejectWithValue('error');
//         }
//     },
// );
export {};
