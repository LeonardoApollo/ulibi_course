// Такой файл вы могли наблюдать при create-react-app
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import { TextDecoder, TextEncoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
Object.assign(process.env, {
    API_KEY: '',
    AUTH_DOMAIN: '',
    PROJECT_ID: '',
    STORAGE_BUTCKET: '',
    MESSEGING_SENDER_ID: '',
    APP_ID: '',
    MESURMENT_ID: '',
});
