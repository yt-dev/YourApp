import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Onboarding} from './scenes/Authentication/Onboarding';

type AuthenticationStackParamList = {
  Onboarding: undefined;
};

const AuthenticationStack = createStackNavigator<
  AuthenticationStackParamList
>();
const AuthenticationStackNavigator = () => (
  <AuthenticationStack.Navigator>
    <AuthenticationStack.Screen
      name="Onboarding"
      component={Onboarding}
      options={{header: () => null}}
    />
  </AuthenticationStack.Navigator>
);

const Routes = () => (
  <NavigationContainer>
    <AuthenticationStackNavigator />
  </NavigationContainer>
);

export default Routes;
