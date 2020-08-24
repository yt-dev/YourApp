import React from 'react';
import Animated, {interpolate} from 'react-native-reanimated';
import {Text, StyleSheet} from 'react-native';

const TEXT_INPUT_HEIGHT = 150;
const FOOTER_HEIGHT = 70;

const LOGIN_VIEW_HEIGHT = TEXT_INPUT_HEIGHT + FOOTER_HEIGHT;

interface ForwardArrowProps {
  keyboardHeight: Animated.Value<0>;
}

const ForwardArrow: React.FC<ForwardArrowProps> = ({keyboardHeight}) => {
  const opacity = interpolate(keyboardHeight, {
    inputRange: [0, keyboardHeight],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={[
        styles.forwardArrow,
        {opacity, transform: [{translateY: keyboardHeight}]},
      ]}>
      <Text style={styles.text}>➤</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  forwardArrow: {
    position: 'absolute',
    height: 60,
    width: 60,
    bottom: LOGIN_VIEW_HEIGHT / 2,
    right: 10,
    zIndex: 101,
  },
  text: {
    fontSize: 25,
  },
});

export default ForwardArrow;
