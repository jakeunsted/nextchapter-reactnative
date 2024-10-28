import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

/**
 * Stores the access token in Async Storage.
 * @param {string} token - The access token to be stored.
 * @returns {Promise<void>} A promise that resolves when the token is stored.
 */
export const setAccessToken = async (token) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
    console.log('Access token stored successfully!');
  } catch (error) {
    console.error('Error storing access token:', error);
  }
};

/**
 * Retrieves the access token from Async Storage.
 * @returns {Promise<string|null>}
 */
export const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

/**
 * Deletes the access token from Async Storage.
 * @returns {Promise<void>}
 */
export const deleteAccessToken = async () => {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    console.log('Access token deleted successfully!');
  } catch (error) {
    console.error('Error deleting access token:', error);
  }
};

/**
 * Stores the refresh token in Async Storage.
 * @param {string} token - The refresh token to be stored.
 * @returns {Promise<void>}
 */
export const setRefreshToken = async (token) => {
  try {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
    console.log('Refresh token stored successfully!');
  } catch (error) {
    console.error('Error storing refresh token:', error);
  }
};

/**
 * Retrieves the refresh token from Async Storage.
 * @returns {Promise<string|null>}
 */
export const getRefreshToken = async () => {
  try {
    const token = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    console.log('Refresh token retrieved:', token);
    return token;
  } catch (error) {
    console.error('Error retrieving refresh token:', error);
    return null;
  }
};

/**
 * Deletes the refresh token from Async Storage.
 * @returns {Promise<void>}
 */
export const deleteRefreshToken = async () => {
  try {
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    console.log('Refresh token deleted successfully!');
  } catch (error) {
    console.error('Error deleting refresh token:', error);
  }
};
