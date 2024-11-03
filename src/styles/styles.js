import { Dimensions } from 'react-native';
import theme from './theme';

const { width, height } = Dimensions.get('window');

export const profileImage = {
  borderRadius: 40,
  width: 80,
  height: 80,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.primary.DEFAULT,
};
export const profileImageContaine = {
  marginBottom: 20,
};
export const userProfileContainer = {
  alignItems: 'center',
  marginTop: 40,
};
export const userInfoContainer = {
  alignItems: 'center',
};

