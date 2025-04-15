import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface IWrapper {
  children: ReactNode;
  style?: ViewStyle;
}

const Wrapper = ({ children, style }: IWrapper): React.JSX.Element => {
  return <View style={[styles.wrapper, style]}>{children}</View>;
};

export default Wrapper;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(241, 239, 236,1)',
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
