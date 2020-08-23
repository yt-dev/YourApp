import React, {useRef} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import Animated, {
  useCode,
  cond,
  set,
  eq,
  interpolate,
  not,
} from 'react-native-reanimated';
import {
  withTimingTransition,
  useTapGestureHandler,
  withSpringTransition,
} from 'react-native-redash';
import Logo from './Logo';
import {
  TextInput,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

const TEXT_INPUT_HEIGHT = 150;
const FOOTER_HEIGHT = 70;

const LOGIN_VIEW_HEIGHT = TEXT_INPUT_HEIGHT + FOOTER_HEIGHT;

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const {gestureHandler, state} = useTapGestureHandler();

  const scale = new Animated.Value(0);
  const scaleAnimation = withTimingTransition(scale, {duration: 400});

  const isOpen = useRef(new Animated.Value(0));
  const isopenAnimation = withSpringTransition(isOpen.current);

  const innerLoginY = interpolate(scaleAnimation, {
    inputRange: [0, 1],
    outputRange: [LOGIN_VIEW_HEIGHT, 0],
  });

  const outerLoginY = interpolate(isopenAnimation, {
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, 0],
  });

  // useCode(
  //   () =>
  //     cond(eq(state, State.END), [
  //       cond(eq(isOpen.current, 0), set(isOpen.current, 1)),
  //     ]),
  //   [],
  // );
  useCode(
    () => cond(eq(state, State.END), set(isOpen.current, not(isOpen.current))),
    [],
  );
  useCode(() => cond(eq(scale, 0), set(scale, 1)), []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo scale={scaleAnimation} />
      </View>

      <Animated.View
        style={[styles.panel, {transform: [{translateY: outerLoginY}]}]}>
        <Animated.View style={styles.overlayBg}>
          <Text>Overlay Bg</Text>
        </Animated.View>

        <Animated.View>
          <Animated.View
            style={[
              styles.loginView,
              {transform: [{translateY: innerLoginY}]},
            ]}>
            <Animated.View style={styles.heading}>
              <Text style={styles.text}>天気</Text>
            </Animated.View>

            <TapGestureHandler {...gestureHandler}>
              <Animated.View>
                <Animated.View
                  style={styles.inputContainer}
                  pointerEvents="none">
                  <Text style={styles.text}>👻</Text>
                  <Text style={[styles.text, styles.prefix]}>+12</Text>
                  <TextInput
                    placeholder="Enter something"
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                </Animated.View>
              </Animated.View>
            </TapGestureHandler>
          </Animated.View>
        </Animated.View>
      </Animated.View>
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
  panel: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    height: SCREEN_HEIGHT,
  },
  overlayBg: {
    height: LOGIN_VIEW_HEIGHT,
    backgroundColor: '#2289d6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  loginView: {
    height: LOGIN_VIEW_HEIGHT,
    backgroundColor: 'white',
  },
  heading: {
    alignItems: 'flex-start',
    marginHorizontal: 25,
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 25,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'SFProText-Regular',
    fontSize: 20,
    color: '#0C0D34',
  },
  prefix: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
});

export default Login;
