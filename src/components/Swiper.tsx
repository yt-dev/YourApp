import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  add,
  clockRunning,
  cond,
  debug,
  divide,
  eq,
  floor,
  not,
  set,
  useCode,
} from 'react-native-reanimated';
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from 'react-native-redash';

const {width, height} = Dimensions.get('window');

export const assets = [
  require('../assets/images/a1.png'),
  require('../assets/images/a2.jpg'),
  require('../assets/images/a3.jpg'),
  require('../assets/images/a4.jpg'),
];

const snapPoints = assets.map((_, i) => i * -width);

const Swiper = () => {
  const clock = useClock();
  const index = useValue(0);
  const offsetX = useValue(0);
  const translateX = useValue(0);
  const {gestureHandler, state, velocity, translation} = usePanGestureHandler();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(translateX, add(offsetX, translation.x)),
      ]),
      cond(eq(state, State.END), [
        set(translateX, timing({clock, from: translateX, to})),
        set(offsetX, translateX),
        cond(not(clockRunning(clock)), [
          set(index, floor(divide(translateX, -width))),
          debug('index', index),
        ]),
      ]),
    ],
    [],
  );
  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.pictures, {transform: [{translateX}]}]}>
            {assets.map((source) => (
              <View key={source} style={styles.picture}>
                <Image style={styles.image} {...{source}} />
              </View>
            ))}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  pictures: {
    width: width * assets.length,
    height,
    flexDirection: 'row',
  },
  picture: {
    width,
    height,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

export default Swiper;
