import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, State} from 'react-native-gesture-handler';
import ImageComponent from './ImageComponent';
import AnimatedBottomSheet from './AnimatedBottomSheet';
import Animated, {
  useCode,
  cond,
  eq,
  set,
  not,
  interpolate,
} from 'react-native-reanimated';
import {useTapGestureHandler, withTimingTransition} from 'react-native-redash';

const images = [
  {
    name: 'otome 1',
    uri: require('../../assets/images/kuno_1.png'),
  },
  {
    name: 'otome 2',
    uri: require('../../assets/images/kuno_2.jpg'),
  },
  {
    name: 'otome 3',
    uri: require('../../assets/images/kuno_3.jpg'),
  },
  {
    name: 'otome 4',
    uri: require('../../assets/images/kuno_4.jpg'),
  },
  {
    name: 'otome 5',
    uri: require('../../assets/images/kano.png'),
  },
];

interface GramProps {}

const Gram: React.FC<GramProps> = ({}) => {
  const isOpen = new Animated.Value(0);
  const {gestureHandler, state} = useTapGestureHandler();

  const transition = withTimingTransition(isOpen, {duration: 300});

  const translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const zIndex = interpolate(translateY, {
    inputRange: [0, 299, 300],
    outputRange: [0, 0, -1],
  });

  useCode(() => cond(eq(state, State.END), set(isOpen, not(isOpen))), [
    state,
    isOpen,
  ]);

  return (
    <>
      <SafeAreaView />
      <ScrollView>
        {images.map(({uri}, index) => (
          <ImageComponent key={index} uri={uri} {...{gestureHandler}} />
        ))}
      </ScrollView>
      <AnimatedBottomSheet {...{translateY, gestureHandler, zIndex}} />
    </>
  );
};

export default Gram;
