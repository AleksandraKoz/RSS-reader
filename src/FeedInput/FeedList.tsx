import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import Wrapper from '../components/Wrapper.tsx';

interface IFeedList {
  feeds: string[];
}

const FeedList = ({ feeds }: IFeedList): React.JSX.Element => {
  const renderFeedItem = ({ item }: { item: string }) => (
    <View style={styles.feedItem}>
      <Text style={styles.feedUrl}>{item}</Text>
    </View>
  );

  return (
    <Wrapper>
      <Text style={styles.subtitleText}>List of your current feeds:</Text>
      <FlatList
        data={feeds}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderFeedItem}
        contentContainerStyle={styles.feedList}
      />
    </Wrapper>
  );
};

export default FeedList;

const styles = StyleSheet.create({
  feedItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  feedList: {
    paddingTop: 10,
  },
  feedUrl: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 15,
  },
  subtitleText: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});
