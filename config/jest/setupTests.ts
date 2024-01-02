// Такой файл вы могли наблюдать при create-react-app
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import { TextDecoder, TextEncoder } from 'util';

// @ts-ignore
global.setImmediate =
    global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

Object.assign(global, { TextDecoder, TextEncoder });
Object.assign(process.env, {
    API_KEY: 'fgtshydhgtdthdtgh',
    AUTH_DOMAIN: 'sdfgtygfh',
    PROJECT_ID: 'sdfgdftr',
    STORAGE_BUTCKET: '123536123',
    MESSEGING_SENDER_ID: 'sdfdfstet',
    APP_ID: '12456234',
    MESURMENT_ID: '12354456',
});
