import * as Keychain from 'react-native-keychain';

const SERVICE_NAME = process.env.SERVICE_NAME || 'NextChapter';

/**
 * Saves the access token and refresh token to the Keychain.
 * @param {string} accessToken - The access token to be saved.
 * @param {string} refreshToken - The refresh token to be saved.
 */
async function saveTokens(accessToken, refreshToken) {
  try {
    await Keychain.setGenericPassword('accessToken', accessToken, {
      service: SERVICE_NAME,
      accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE,
    });

    await Keychain.setGenericPassword('refreshToken', refreshToken, {
      service: SERVICE_NAME,
      accessControl:
        Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
    });
  } catch (error) {
    console.error('Error saving tokens to Keychain:', error);
  }
}

/**
 * Retrieves the access token from the Keychain.
 * @returns {Promise<string|null>} The access token or null if not found.
 */
async function getAccessToken() {
  try {
    const credentials =
      await Keychain.getGenericPassword({ service: SERVICE_NAME });
    return credentials.password;
  } catch (error) {
    console.error('Error getting access token from Keychain:', error);
  }
}

/**
 * Sets the access token in the Keychain.
 * @param {string} accessToken - The access token to be saved.
 */
async function setAccessToken(accessToken) {
  await Keychain.setGenericPassword('accessToken', accessToken, {
    service: SERVICE_NAME,
  });
}

/**
 * Retrieves the refresh token from the Keychain.
 * @returns {Promise<string|null>} The refresh token or null if not found.
 */
async function getRefreshToken() {
  try {
    const credentials =
      await Keychain.getGenericPassword({ service: SERVICE_NAME });
    return credentials.password;
  } catch (error) {
    console.error('Error getting refresh token from Keychain:', error);
  }
}

/**
 * Sets the refresh token in the Keychain.
 * @param {string} refreshToken - The refresh token to be saved.
 */
async function setRefreshToken(refreshToken) {
  await Keychain.setGenericPassword('refreshToken', refreshToken, {
    service: SERVICE_NAME,
  });
}

export {
  saveTokens,
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
};
