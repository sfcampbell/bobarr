const host = typeof window === 'undefined' ? 'bobarr-720-api' : window.location.hostname;
export const apiURL = process.env.WEB_UI_API_URL || `http://${host}:4001`;
