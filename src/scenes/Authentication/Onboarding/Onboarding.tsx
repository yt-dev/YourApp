import React, {useRef} from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {multiply} from 'react-native-reanimated';
import {useValue, onScrollEvent, interpolateColor} from 'react-native-redash';
import Slide, {SLIDE_HEIGHT} from './Slide';
import SubSlide from './SubSlide';

const slides = [
  {
    title: '🌦 天気の子',
    subtitle: 'Weathering With You',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
    color: '#BFEAF5',
  },
  {
    title: '🎃 Sword Art Online',
    subtitle: 'SAO',
    description:
      'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
    color: '#BEECC4',
  },
  {
    title: '😘 うたわれるもの',
    subtitle: 'Utawarerumono',
    description:
      'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse',
    color: '#FFE4D9',
  },
  {
    title: '👻 天空の城',
    subtitle: 'CASTLE IN THE SKY',
    description:
      'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non',
    color: '#FFDDDD',
  },
];

const BORDER_RADIUS = 75;

interface OnboardingProps {}

const Onboarding: React.FC<OnboardingProps> = ({}) => {
  const {width} = useWindowDimensions();

  const scroll = useRef<Animated.ScrollView>(null);

  const x = useValue(0);
  // TODO: scrollHandler useScrollHandler?
  const onScroll = onScrollEvent({x});
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide, _) => slide.color),
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, {backgroundColor}]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          {...{onScroll}}>
          {slides.map(({title}, index) => (
            <Slide key={index} right={Boolean(index % 2)} {...{title}} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{...StyleSheet.absoluteFillObject, backgroundColor}}
        />
        <Animated.View
          style={{
            ...styles.footerZStack2,
            width: width * slides.length,
            transform: [{translateX: multiply(x, -1)}],
          }}>
          {slides.map(({subtitle, description}, index) => (
            <SubSlide
              key={index}
              {...{subtitle, description}}
              last={index === slides.length - 1}
              onPress={() => {
                if (scroll.current) {
                  scroll.current
                    .getNode()
                    .scrollTo({x: width * (index + 1), animated: true});
                }
              }}
            />
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    borderBottomRightRadius: BORDER_RADIUS,
    height: SLIDE_HEIGHT,
  },
  footer: {
    flex: 1,
  },
  footerZStack2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopLeftRadius: BORDER_RADIUS,
  },
});

export default Onboarding;
