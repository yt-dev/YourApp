import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';
import {interpolateColor} from 'react-native-redash';

// Duplicate constants, fix later

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const TEXT_INPUT_HEIGHT = 150;
const FOOTER_HEIGHT = 70;

const LOGIN_VIEW_HEIGHT = TEXT_INPUT_HEIGHT + FOOTER_HEIGHT;

interface OverlayBgProps {
  isopenAnimation: Animated.Node<number>;
}

const OverlayBg: React.FC<OverlayBgProps> = ({isopenAnimation}) => {
  const translateY = interpolate(isopenAnimation, {
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, -LOGIN_VIEW_HEIGHT],
  });

  const backgroundColor = interpolateColor(isopenAnimation, {
    inputRange: [0, 0.5, 1],
    outputRange: ['#2289d6', '#fff', '#fff'],
  });

  return (
    <Animated.View
      style={[styles.overlayBg, {transform: [{translateY}], backgroundColor}]}
    />
  );
};

const styles = StyleSheet.create({
  overlayBg: {
    height: LOGIN_VIEW_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
});

export default OverlayBg;
