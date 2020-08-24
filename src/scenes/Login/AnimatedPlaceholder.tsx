import React from 'react';
import Animated, {interpolate} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';

interface AnimatedPlaceholderProps {
  isopenAnimation: Animated.Node<number>;
}

const AnimatedPlaceholder: React.FC<AnimatedPlaceholderProps> = ({
  isopenAnimation,
}) => {
  const translateX = interpolate(isopenAnimation, {
    inputRange: [0, 1],
    outputRange: [80, 0],
  });
  const translateY = interpolate(isopenAnimation, {
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, -60],
  });
  const opacity = interpolate(translateY, {
    inputRange: [-60, 0],
    outputRange: [1, 0],
  });

  return (
    <Animated.Text
      style={{
        ...styles.placeholder,
        opacity,
        transform: [{translateX}, {translateY}],
      }}>
      Enter something
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    fontSize: 24,
    position: 'absolute',
  },
});

export default AnimatedPlaceholder;
