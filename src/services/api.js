import { getAccessToken, getRefreshToken } from './keychain';
import { logout, refreshAccessToken } from './auth';

async function myFetch(url, options) {
  try {
    const accessToken = await getAccessToken();
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await fetch(url, options);

    if (response.status === 401) {
      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        const refreshResponse = await refreshAccessToken();
        if (refreshResponse.ok) {
          const newToken = await refreshResponse.json();
          options.headers.Authorization = `Bearer ${newToken.accessToken}`;

          return fetch(url, options);
        } else {
          console.error('Token refresh failed');
          await logout();
        }
      } else {
        console.error('No refresh token found');
      }
    }

    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export default myFetch;
