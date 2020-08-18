import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

interface ButtonProps {
  label: string;
  variant: 'primary' | 'default';
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'default',
  onPress,
}) => {
  const backgroundColor =
    variant === 'primary' ? '#2CB9B0' : 'rgba(12, 13, 52, 0.05)';
  const color = variant === 'primary' ? 'white' : '#0C0D34';

  return (
    <RectButton style={{...styles.container, backgroundColor}} {...{onPress}}>
      <Text style={{...styles.label, color}}>{label}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Button;
