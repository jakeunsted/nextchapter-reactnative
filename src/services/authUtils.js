import {
  getRefreshToken,
  setRefreshToken,
  setAccessToken,
} from './keychain';
import { AuthStore } from '../stores/AuthStore';

const baseUrl = process.env.BASE_URL || 'http://localhost:3001';

export const logout = async () => {
  const refreshToken = await getRefreshToken();

  try {
    await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    AuthStore.setState({ isAuthenticated: false });
  } catch (error) {
    console.error('Logout error:', error);
  }

  await setAccessToken(null);
  await setRefreshToken(null);
};

export const refreshAccessToken = async () => {
  console.log('refreshAccessToken');
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    logout();
    throw new Error('No refresh token available');
  }

  try {
    const response =
      await fetch(`${baseUrl}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
    console.log('refreshAccessToken response', response);

    if (!response.ok) {
      console.log('refreshAccessToken response not ok');
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    const { accessToken } = data;

    if (!accessToken) {
      throw new Error('No access token received');
    }

    await setAccessToken(accessToken);
    return accessToken;
  } catch (error) {
    console.error('Refresh token error:', error);
    logout();
    throw error;
  }
};
