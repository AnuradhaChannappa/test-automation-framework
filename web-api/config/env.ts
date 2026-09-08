import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const WEB_BASE_URLS = {
    int: 'https://www.int.saucedemo.com',
    tst: 'https://www.tst.saucedemo.com',
    stg: 'https://www.stg.saucedemo.com',
    prd: 'https://www.saucedemo.com',
};

const API_BASE_URLS = {
    int: 'https://int.restful-booker.herokuapp.com',
    tst: 'https://tst.restful-booker.herokuapp.com',
    stg: 'https://stg.restful-booker.herokuapp.com',
    prd: 'https://restful-booker.herokuapp.com',
}

function resolveEnv(): keyof typeof WEB_BASE_URLS {
    const env = process.env.ENV || 'prd';
    if (!(env in WEB_BASE_URLS)) {
        throw new Error('ENV is invalid hence is not set. Please set it to one of the following values: dev, int, tst, stg, prd');
    }
    return env as keyof typeof WEB_BASE_URLS;
}

const env = resolveEnv();

export const webBaseurl = WEB_BASE_URLS[env];
export const apiBaseurl = API_BASE_URLS[env];