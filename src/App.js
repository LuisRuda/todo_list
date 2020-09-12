import React, { Suspense } from 'react';
import { StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

import colors from './assets/colors';

import './config/ReactotronConfig';

import { store, persistor } from './store';

import Routes from './routes';

function App() {
  const styles = StyleSheet.create({
    fallbackContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
    },
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense
          fallback={
            <View style={styles.fallbackContainer}>
              <ActivityIndicator size="large" color={colors.primaryLight} />
            </View>
          }
        >
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Routes />
          </NavigationContainer>
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
