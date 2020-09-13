import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../assets/colors';

import Home from '../pages/Home';

const App = createStackNavigator();

function Routes() {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.whiteSmoke },
      }}
    >
      <App.Screen name="Home" component={Home} />
    </App.Navigator>
  );
}

export default Routes;
