import React, {useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {multiply, divide} from 'react-native-reanimated';
import {interpolateColor, useScrollHandler} from 'react-native-redash';
import Slide, {SLIDE_HEIGHT} from './Slide';
import SubSlide from './SubSlide';
import Dot from './Dot';

const slides = [
  {
    title: '🌦 天気の子',
    subtitle: 'Weathering With You',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
    color: '#BFEAF5',
    picture: null,
  },
  {
    title: '🎃 Sword Art Online',
    subtitle: 'SAO',
    description:
      'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
    color: '#BEECC4',
    picture: null,
  },
  {
    title: '😘 うたわれるもの',
    subtitle: 'Utawarerumono',
    description:
      'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse',
    color: '#FFE4D9',
    picture: null,
  },
  {
    title: '👻 天空の城',
    subtitle: 'CASTLE IN THE SKY',
    description:
      'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non',
    color: '#FFDDDD',
    picture: null,
  },
];

const BORDER_RADIUS = 75;
const {width} = Dimensions.get('window');

interface OnboardingProps {}

const Onboarding: React.FC<OnboardingProps> = ({}) => {
  const scroll = useRef<Animated.ScrollView>(null);
  const {x, scrollHandler} = useScrollHandler();
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
          {...scrollHandler}>
          {slides.map(({title, picture}, index) => (
            <Slide
              key={index}
              right={Boolean(index % 2)}
              {...{title, picture}}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={[styles.footerZStack0, {backgroundColor}]} />
        <View style={styles.footerZStack1}>
          <View style={styles.pagintion}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={divide(x, width)} {...{index}} />
            ))}
          </View>
          <Animated.View
            style={[
              styles.footerContent,
              {
                width: width * slides.length,
                transform: [{translateX: multiply(x, -1)}],
              },
            ]}>
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
  footerZStack0: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  footerZStack1: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagintion: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  footerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Onboarding;
