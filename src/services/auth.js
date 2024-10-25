import {
  getRefreshToken,
  setRefreshToken,
  setAccessToken,
  getAccessToken,
} from './keychain';

import myFetch from './api';

const baseUrl = process.env.BASE_URL || 'http://localhost:3001';

export const useAuth = () => {
  const login = async (username, password) => {

    if (!username || !password) {
      throw new Error('Username and password are required');
    };

    try {
      const response = await myFetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid credentials');
        } else if (response.status === 400) {
          throw new Error('Bad request');
        } else {
          throw new Error('Login failed');
        }
      }

      const data = await response.json();
      const { accessToken, refreshToken, user } = data;

      console.log('accessToken', accessToken);

      if (!accessToken || !refreshToken) {
        throw new Error('No tokens received');
      }

      if (!user) {
        throw new Error('No user data');
      }

      await setAccessToken(accessToken);
      await setRefreshToken(refreshToken);

      const accessTokenTest = await getAccessToken();
      console.log('accessToken getter', accessTokenTest);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    const refreshToken = await getRefreshToken();

    try {
      await myFetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (error) {
      console.error('Logout error:', error);
    }

    await setAccessToken(null);
    await setRefreshToken(null);

    // Redirect to login page
  };

  const refreshAccessToken = async () => {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      logout();
      throw new Error('No refresh token available');
    }

    try {
      const response = 
        await myFetch(`${baseUrl}/auth/refresh-token`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
          },
        });

      if (!response.ok) {
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

  return {
    login,
    logout,
    refreshAccessToken,
  };
};
