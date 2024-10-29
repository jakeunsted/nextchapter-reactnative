import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ErrorBoundary from './components/ErrorBoundary';
import RootNavigator from './navigation/RootNavigator';
import LoadingWithLogo from './components/LoadingWIthLogo';
import { AuthStore } from './stores/AuthStore';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: AuthStore.getState().loading,
    };
  }

  componentDidMount() {
    this.unsubscribe = AuthStore.subscribe(
      (state) => this.setState({ loading: state.loading })
    );
    AuthStore.getState().initialiseAuth();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <LoadingWithLogo />;
    }

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
