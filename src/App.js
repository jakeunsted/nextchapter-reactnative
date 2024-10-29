import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ErrorBoundary from './components/ErrorBoundary';
import RootNavigator from './navigation/RootNavigator';
import LoadingWithLogo from './components/LoadingWIthLogo';
import { AuthStore } from './stores/AuthStore';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const authStatus = await AuthStore.getState().initialiseAuth();
      setIsAuthenticated(authStatus);
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return <LoadingWithLogo />;
  }

  return (
    <ErrorBoundary>
      <NavigationContainer>
        <RootNavigator isAuthenticated={isAuthenticated} />
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default App;