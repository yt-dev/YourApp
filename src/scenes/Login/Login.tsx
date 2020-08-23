import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {useCode, cond, set, eq} from 'react-native-reanimated';
import {withTimingTransition} from 'react-native-redash';
import Logo from './Logo';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const scale = new Animated.Value(0); // TODO: why useRef no effect
  const scaleAnimation = withTimingTransition(scale, {duration: 400});

  useCode(() => cond(eq(scale, 0), set(scale, 1)), []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo scale={scaleAnimation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2289d6',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
