const DOMAIN_NAME = 'https://tickets-app-backend.onrender.com';
const PROJECT_CONTEXT = 'tickets_app';
const PROJECT_VERSION = 'v1';
const BASE_URL = `${DOMAIN_NAME}/${PROJECT_CONTEXT}/${PROJECT_VERSION}`;

export const LOGIN_URL = `${DOMAIN_NAME}/dj-rest-auth/login/`;
export const LOGOUT_URL = `${DOMAIN_NAME}/dj-rest-auth/logout/`;
export const USER_INFO_URL = `${BASE_URL}/users/username/`;
export const DOWNLOAD_FILE_URL =  `${BASE_URL}/file/download/`;
export const USER_NOTIFICATIONS_URL = `${BASE_URL}/notifications/ticket/details/`;
export const TICKETS_URL = `${BASE_URL}/tickets/`;
export const NOTIFICATIONS_URL =  `${BASE_URL}/notifications/`;
export const USERS_URL =  `${BASE_URL}/users/`;

