import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Keyboard,
  Easing,
} from 'react-native';
import Animated, {
  useCode,
  cond,
  set,
  eq,
  interpolate,
  SpringUtils,
  call,
} from 'react-native-reanimated';
import {
  withTimingTransition,
  useTapGestureHandler,
  withSpringTransition,
  delay,
} from 'react-native-redash';
import Logo from './Logo';
import {
  TextInput,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
import OverlayBg from './OverlayBg';
import HeaderBackArrow from './HeaderBackArrow';
import AnimatedPlaceholder from './AnimatedPlaceholder';
import ForwardArrow from './ForwardArrow';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const TEXT_INPUT_HEIGHT = 150;
const FOOTER_HEIGHT = 70;

const LOGIN_VIEW_HEIGHT = TEXT_INPUT_HEIGHT + FOOTER_HEIGHT;

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const {gestureHandler, state} = useTapGestureHandler();
  const {
    gestureHandler: backGestureHandler,
    state: backGestureState,
  } = useTapGestureHandler();

  const inputRef = useRef(null);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => {});
      Keyboard.removeListener('keyboardDidHide', () => {});
    };
  });

  const scale = useRef(new Animated.Value(0));
  const scaleAnimation = withTimingTransition(scale.current, {duration: 400});
  const innerLoginY = interpolate(scaleAnimation, {
    inputRange: [0, 1],
    outputRange: [LOGIN_VIEW_HEIGHT, 0],
  });

  const isOpen = useRef(new Animated.Value(0));
  const isopenAnimation = withSpringTransition(isOpen.current, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20),
  });
  const outerLoginY = interpolate(isopenAnimation, {
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, LOGIN_VIEW_HEIGHT / 2],
  });

  const headingOpacity = interpolate(isopenAnimation, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const focusInput = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  useCode(
    () =>
      cond(eq(state, State.END), [
        cond(eq(isOpen.current, 0), [set(isOpen.current, 1)]),
        cond(eq(isOpen.current, 1), delay(call([], focusInput), 700)),
      ]),
    [state],
  );

  useCode(() => cond(eq(scale.current, 0), set(scale.current, 1)), []);

  const blurInput = () => {
    if (inputRef.current !== null) {
      inputRef.current.blur();
    }
  };

  useCode(
    () => [
      cond(eq(backGestureState, State.END), [
        set(state, State.UNDETERMINED),
        call([], blurInput),
        delay(set(isOpen.current, 0), 200),
      ]),
    ],
    [backGestureState],
  );

  const keyboardHeight = new Animated.Value(0);

  const keyboardDidShow = (e) => {
    let toValue = -e.endCoordinates.height;

    Animated.timing(keyboardHeight, {
      toValue,
      duration: 200,
      easing: Easing.linear,
    }).start();
  };
  const keyboardDidHide = (e) => {
    Animated.timing(keyboardHeight, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo scale={scaleAnimation} />
      </View>

      <HeaderBackArrow
        {...{isopenAnimation}}
        gestureHandler={backGestureHandler}
      />

      <Animated.View
        style={[styles.panel, {transform: [{translateY: outerLoginY}]}]}>
        <OverlayBg {...{isopenAnimation}} />
        <ForwardArrow {...{keyboardHeight}} />

        <Animated.View>
          <Animated.View
            style={[
              styles.loginView,
              {transform: [{translateY: innerLoginY}]},
            ]}>
            <Animated.View style={{...styles.heading, opacity: headingOpacity}}>
              <Text style={styles.text}>天気</Text>
            </Animated.View>

            <TapGestureHandler {...gestureHandler}>
              <Animated.View>
                <Animated.View
                  style={styles.inputContainer}
                  pointerEvents="none">
                  <AnimatedPlaceholder {...{isopenAnimation}} />
                  <Text style={styles.text}>👻</Text>
                  <Text style={[styles.text, styles.prefix]}>+12</Text>
                  <TextInput
                    ref={inputRef}
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
