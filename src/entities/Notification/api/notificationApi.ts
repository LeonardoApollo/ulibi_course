import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '@/shared/config/firebase/firebase';

import { Notification } from '../model/types/types';

// const notificationApi = rtkApi.injectEndpoints({
//     endpoints: (build) => ({
//         getNotifications: build.query<Notification[], null>({
//             query: () => ({
//                 url: '/notifications',
//             }),
//         }),
//     }),
// });

// export const useNotifications = notificationApi.useGetNotificationsQuery;

export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], string | undefined>({
            queryFn: async (userId) => {
                try {
                    if (!userId) {
                        throw new Error('no userId');
                    }
                    const notifications: Notification[] = [];
                    const notificationsData = await getDocs(
                        collection(db, 'users', userId, 'notifications'),
                    );
                    if (notificationsData.empty) {
                        return { data: notifications };
                    }
                    notificationsData.forEach((doc) => {
                        const docData = doc.data();
                        const notification: Notification = {
                            id: doc.id,
                            description: docData.description,
                            href: docData.href,
                            title: docData.title,
                        };
                        notifications.push(notification);
                    });

                    return { data: notifications };
                } catch (e) {
                    const error = e as Error;
                    return { error };
                }
            },
        }),
    }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
