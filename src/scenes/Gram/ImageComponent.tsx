import React from 'react';
import {ImageSourcePropType, Image, StyleSheet} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

interface ImageComponentProps {
  uri: ImageSourcePropType;
  gestureHandler: {
    onHandlerStateChange: (...args: any[]) => void;
    onGestureEvent: (...args: any[]) => void;
  };
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  uri,
  gestureHandler,
}) => {
  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View style={styles.imageContainer}>
        <Image source={uri} style={styles.image} />
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    margin: 20,
    borderRadius: 25,
    height: 500,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

export default ImageComponent;
