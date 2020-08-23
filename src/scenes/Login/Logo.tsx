import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

interface LogoProps {
  scale: Animated.Adaptable<number>;
}

const Logo: React.FC<LogoProps> = ({scale}) => {
  return (
    <Animated.View style={{...styles.logo, transform: [{scale}]}}>
      <Text style={styles.text}>🌦</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  logo: {
    backgroundColor: 'white',
    height: 120,
    width: 120,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 50,
    fontFamily: 'SFProText-Bold',
    textAlign: 'center',
  },
});

export default Logo;
