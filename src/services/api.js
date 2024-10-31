import { getAccessToken, getRefreshToken } from './keychain';
import { logout, refreshAccessToken } from './authUtils';

const baseUrl = process.env.BASE_URL || 'http://localhost:3001';

async function myFetch(path, options) {
  const url = `${baseUrl}${path}`;
  try {
    const accessToken = await getAccessToken();
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    const response = await fetch(url, options);

    if (response.status === 401) {
      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        const refreshResponse = await refreshAccessToken();
        if (refreshResponse.ok) {
          console.log('Token refreshed: ', refreshResponse.json());
          const data = await refreshResponse.json();
          options.headers.Authorization = `Bearer ${data.accessToken}`;

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
