import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface OnboardingProps {}

const Onboarding: React.FC<OnboardingProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>👻 hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontFamily: 'SFProText-Regular',
  },
});

export default Onboarding;
