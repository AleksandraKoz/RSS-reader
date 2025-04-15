import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import SadEmojiIcon from '../../assets/sad.png';

import Wrapper from '../Base/Wrapper.tsx';

interface IEmptyList {
  feedUrl: string;
}

const EmptyList = ({ feedUrl }: IEmptyList): React.JSX.Element => {
  return (
    <View>
      <Image source={SadEmojiIcon} style={styles.sadEmojiIcon} />
      <Wrapper>
        <Text style={styles.titleText}>No articles found in the {`"${feedUrl}"`} feed.</Text>
      </Wrapper>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  sadEmojiIcon: {
    alignSelf: 'center',
    height: 200,
    marginBottom: 20,
    marginTop: 50,
    resizeMode: 'contain',
  },
  titleText: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});
