const host = typeof window === 'undefined' ? 'bobarr-1080-api' : window.location.hostname;
//export const apiURL = process.env.WEB_UI_API_URL || `http://${host}:4000`;

export const apiURL = process.env.WEB_UI_API_URL || `http://bobarr-1080-api:4000`;