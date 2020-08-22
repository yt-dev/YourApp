import React from 'react';
import Animated from 'react-native-reanimated';
import {Text, StyleSheet, Dimensions} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

interface AnimatedBottomSheetProps {
  translateY: Animated.Adaptable<number>;
  gestureHandler: {
    onHandlerStateChange: (...args: any[]) => void;
    onGestureEvent: (...args: any[]) => void;
  };
  zIndex: Animated.Node<number>;
}

const AnimatedBottomSheet: React.FC<AnimatedBottomSheetProps> = ({
  translateY,
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
      <Animated.View style={{...styles.bottomsheet, transform: [{translateY}]}}>
        <Text>hola</Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomsheet: {
    position: 'absolute',
    bottom: 0,
    width: width - 20,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 25,
    marginHorizontal: 10,
    alignItems: 'center',
    zIndex: 1,
  },
  underlay: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});

export default AnimatedBottomSheet;
