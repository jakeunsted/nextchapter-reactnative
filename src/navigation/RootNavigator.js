import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
// import HomeDashboard from '../screens/HomeDashboard';
import TabNavigator from './TabNavigator';
import { AuthStore } from '../stores/AuthStore';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = AuthStore((state) => state.isAuthenticated);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen name="Home" component={TabNavigator} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};



export default RootNavigator;
