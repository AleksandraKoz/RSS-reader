import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Wrapper from '../components/Wrapper.tsx';

interface IEmptyList {
  feedUrl: string;
}

const EmptyList = ({ feedUrl }: IEmptyList): React.JSX.Element => {
  return (
    <Wrapper>
      <Text style={styles.titleText}>No articles found in the "{feedUrl}" feed.</Text>
    </Wrapper>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  titleText: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});
