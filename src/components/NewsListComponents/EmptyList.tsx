import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import SadEmojiIcon from '../../assets/sad.png';

import Wrapper from '../Base/Wrapper.tsx';
import ErrorDisplay from '../Base/ErrorDisplay.tsx';
import { IStoreStates } from '../../store/storeTyping.ts';

interface IEmptyList {
  feedUrl: string;
  getNewsError: string;
}

const EmptyList = ({ feedUrl, getNewsError }: IEmptyList): React.JSX.Element => {
  const getErrorMessage = (): string => {
    switch (feedUrl) {
      case 'My favourite':
        return '';
      default:
        return getNewsError;
    }
  };

  return (
    <View>
      <Image source={SadEmojiIcon} style={styles.sadEmojiIcon} />
      <Wrapper>
        <Text style={styles.titleText}>No articles found in the {`"${feedUrl}"`} feed.</Text>
        <ErrorDisplay error={getErrorMessage()} />
      </Wrapper>
    </View>
  );
};

const mapStateToProps = (state: IStoreStates) => ({
  getNewsError: state.news.getNewsError,
});

export default connect(mapStateToProps)(EmptyList);

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
