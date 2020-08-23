import React from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

export const PANEL_WIDTH = (width * 3) / 4;

interface AnimatedRightPanelProps {
  translateX: Animated.Adaptable<number>;
  gestureHandler: {
    onHandlerStateChange: (...args: any[]) => void;
    onGestureEvent: (...args: any[]) => void;
  };
  zIndex: Animated.Node<number>;
}

const AnimatedRightPanel: React.FC<AnimatedRightPanelProps> = ({
  translateX,
  gestureHandler,
  zIndex,
}) => {
  return (
    <>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View
          style={[StyleSheet.absoluteFillObject, styles.underlay, {zIndex}]}
        />
      </TapGestureHandler>
      <Animated.View style={[styles.rightPanel, {transform: [{translateX}]}]}>
        <Text>[Slot] Filter Actions</Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  rightPanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: PANEL_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  underlay: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    zIndex: -1,
  },
});

export default AnimatedRightPanel;
