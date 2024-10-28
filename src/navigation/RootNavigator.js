import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import HomeDashboard from '../screens/HomeDashboard';
import { AuthStore } from '../stores/AuthStore';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  useEffect(() => {
    const initialize = async () => {
      await AuthStore.getState().initialiseAuth();
    };
    
    initialize();
  }, []);

  const isAuthenticated = AuthStore((state) => state.isAuthenticated);
  console.log('isAuthenticated', isAuthenticated);

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
