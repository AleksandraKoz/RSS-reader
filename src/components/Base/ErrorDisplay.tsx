import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface IErrorDisplay {
  error: string;
}

const ErrorDisplay = ({ error }: IErrorDisplay): React.JSX.Element | null => {
  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }
  return null;
};

export default ErrorDisplay;

const styles = StyleSheet.create({
  errorText: {
    color: '#9d0000',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
});
