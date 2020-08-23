import React from 'react';
import {Text, StyleSheet} from 'react-native';
import AnimatedRightPanel, {PANEL_WIDTH} from './AnimatedRightPanel';
import Animated, {
  useCode,
  cond,
  eq,
  set,
  not,
  interpolate,
} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {useTapGestureHandler, withTimingTransition} from 'react-native-redash';

interface FilterProps {}

const Filter: React.FC<FilterProps> = ({}) => {
  const isOpen = new Animated.Value(0);
  const {gestureHandler, state} = useTapGestureHandler();

  const transition = withTimingTransition(isOpen, {duration: 300});

  const translateX = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [PANEL_WIDTH, 0],
  });

  const zIndex = interpolate(translateX, {
    inputRange: [0, PANEL_WIDTH],
    outputRange: [0, -1],
  });

  useCode(() => cond(eq(state, State.END), set(isOpen, not(isOpen))), [
    state,
    isOpen,
  ]);

  return (
    <>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View style={styles.container}>
          <Text>show filter panel</Text>
        </Animated.View>
      </TapGestureHandler>
      <AnimatedRightPanel {...{translateX, gestureHandler, zIndex}} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Filter;
