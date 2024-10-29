import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import HomeDashboard from '../screens/HomeDashboard';
import { AuthStore } from '../stores/AuthStore';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = AuthStore((state) => state.isAuthenticated);
  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen name="HomeDashboard" component={HomeDashboard} />
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
