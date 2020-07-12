export const APP_PORT = Number(process.env.APP_PORT || 3000);
export const APP_ENV = (process.env.APP_ENV || 'development').trim();
export const APP_MAX_BODY_SIZE = (process.env.APP_MAX_BODY_SIZE || '50mb').trim();
export const APP_BASE_PATH = (process.env.APP_BASE_PATH || '/api').trim();

export const PERSISTENCE_URI = ('mongodb://localhost/miau' || process.env.PERSISTENCE_URI).trim();

export const IS_PROD = APP_ENV === 'production';
export const IS_DEV = APP_ENV === 'development';
export const IS_TEST = APP_ENV === 'test';
