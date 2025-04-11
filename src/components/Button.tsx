import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type ButtonVariant = 'primary' | 'danger' | 'cancel' | 'cancel-outline' | 'danger-outline';

interface IButton {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
}

const Button = ({ title, onPress, variant = 'primary', style }: IButton): React.JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonBase, styles[variant], style]}>
      <Text style={textStyles[variant]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create<Record<ButtonVariant | 'buttonBase', ViewStyle>>({
  buttonBase: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  cancel: {
    backgroundColor: '#888',
  },
  'cancel-outline': {
    backgroundColor: '#fff',
    borderColor: '#888',
    borderWidth: 1,
  },
  danger: {
    backgroundColor: '#9d0000',
  },
  'danger-outline': {
    backgroundColor: '#fff',
    borderColor: '#9d0000',
    borderWidth: 1,
  },
  primary: {
    backgroundColor: '#007aff',
  },
});

const textStyles: Record<ButtonVariant, TextStyle> = {
  primary: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  danger: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  cancel: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  'cancel-outline': {
    color: '#888',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  'danger-outline': {
    color: '#9d0000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};
