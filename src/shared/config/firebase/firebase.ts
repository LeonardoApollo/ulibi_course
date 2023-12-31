import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { Firestore, doc, getDoc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUTCKET,
    messagingSenderId: process.env.MESSEGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MESURMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

// utils
export async function getUserFromFirestore(
    db: Firestore,
    collection: string,
    uid: string,
    token: string,
) {
    const docRef = doc(db, collection, uid);
    const docData = (await getDoc(docRef)).data();
    const username = await docData!.username;
    const avatar = await docData!.avatar;
    const roles = await docData!.roles;
    const jsonSettings = await docData!.jsonSettings;
    const features = await docData!.features;
    const email = await docData!.email;
    const userData = {
        id: uid,
        email,
        token,
        username,
        avatar,
        roles,
        features,
        jsonSettings,
    };
    return userData;
}
