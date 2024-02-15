const host = typeof window === 'undefined' ? 'api' : window.location.hostname;
const port = process.env.PORT
export const apiURL = process.env.WEB_UI_API_URL || `http://${host}:${port}`;
export const SVC_PORT = {port}
