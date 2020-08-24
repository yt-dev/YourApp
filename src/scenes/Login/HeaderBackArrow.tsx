import React from 'react';
import Animated, {interpolate} from 'react-native-reanimated';
import {Text, StyleSheet} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';

interface HeaderBackArrowProps {
  isopenAnimation: Animated.Node<number>;
  gestureHandler: {
    onHandlerStateChange: (...args: any[]) => void;
    onGestureEvent: (...args: any[]) => void;
  };
}

const HeaderBackArrow: React.FC<HeaderBackArrowProps> = ({
  isopenAnimation,
  gestureHandler,
}) => {
  const opacity = interpolate(isopenAnimation, {
    inputRange: [0, 0.7, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View style={[styles.backArrow, {opacity}]}>
        <Text style={styles.text}>⨴</Text>
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  backArrow: {
    position: 'absolute',
    height: 60,
    width: 60,
    top: 60,
    left: 25,
    zIndex: 100,
  },
  text: {
    fontSize: 25,
    color: '#0C0D34',
  },
});

export default HeaderBackArrow;
