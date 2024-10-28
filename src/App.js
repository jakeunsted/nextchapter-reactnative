import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ErrorBoundary from './components/ErrorBoundary';

import RootNavigator from './navigation/RootNavigator';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('starting');
  }
  render() {
    return (
      <ErrorBoundary>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ErrorBoundary>
    );
  }
}

export default App;
