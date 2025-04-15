import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

import { ButtonVariant } from './ButtonVariants';

interface IButton {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
}

const Button = ({
  title,
  onPress,
  variant = ButtonVariant.Primary,
  style,
}: IButton): React.JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonBaseStyle, styles[variant], style]}>
      <Text style={[textStyles.textBaseStyle, textStyles[variant]]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create<Record<ButtonVariant | 'buttonBaseStyle', ViewStyle>>({
  [ButtonVariant.Primary]: {
    backgroundColor: '#007aff',
  },
  [ButtonVariant.Danger]: {
    backgroundColor: '#9d0000',
  },
  [ButtonVariant.Cancel]: {
    backgroundColor: '#888',
  },
  [ButtonVariant.CancelOutline]: {
    backgroundColor: '#fff',
    borderColor: '#888',
    borderWidth: 1,
  },
  [ButtonVariant.DangerOutline]: {
    backgroundColor: '#fff',
    borderColor: '#9d0000',
    borderWidth: 1,
  },
  buttonBaseStyle: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});

const textStyles: Record<ButtonVariant | 'textBaseStyle', TextStyle> = {
  textBaseStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  [ButtonVariant.Primary]: {
    color: '#fff',
  },
  [ButtonVariant.Danger]: {
    color: '#fff',
  },
  [ButtonVariant.Cancel]: {
    color: '#fff',
  },
  [ButtonVariant.CancelOutline]: {
    color: '#888',
  },
  [ButtonVariant.DangerOutline]: {
    color: '#9d0000',
  },
};
