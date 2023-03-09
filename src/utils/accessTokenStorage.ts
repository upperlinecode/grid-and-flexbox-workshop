const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";

export const isAccessTokenExpired = (exp: number) => Date.now() > exp * 1000;

export const clearAccessToken = () => window.localStorage.removeItem(ACCESS_TOKEN_KEY);

export const getAccessToken = () => window.localStorage.getItem(ACCESS_TOKEN_KEY);

export const setAccessToken = (accessToken: string) =>
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
