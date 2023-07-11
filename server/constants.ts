const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;

export const MONGO_URL = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@cluster0.cohmdfy.mongodb.net/?retryWrites=true&w=majority`; // DB URI
export const PORT = 8080;
export const COOKIES_AUTH = 'WINES-QUALITY-AUTH';
export const WHITELIST_IP_1 = process.env.WHITELIST_IP_1;
export const WHITELIST_IP_2 = process.env.WHITELIST_IP_2;
export const WHITELIST_IP_3 = process.env.WHITELIST_IP_3;
export const WHITELIST_SITE_DOMAIN = process.env.WHITELIST_SITE_DOMAIN;
