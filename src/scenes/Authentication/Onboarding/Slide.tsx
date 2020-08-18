import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.61 * height;

interface SlideProps {
  title: string;
  right?: boolean;
}

const Slide: React.FC<SlideProps> = ({title, right}) => {
  const transform = [
    {translateY: (SLIDE_HEIGHT - 100) / 2},
    {translateX: right ? width / 2 - 50 : -width / 2 + 50},
    {rotate: right ? '-90deg' : '90deg'},
  ];

  return (
    <View style={{...styles.container, width}}>
      <View style={[styles.titleContainer, {transform}]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    height: 100,
    justifyContent: 'center',
  },
  title: {
    fontSize: 33,
    // lineHeight: 33,
    fontFamily: 'SFProText-Bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default Slide;
