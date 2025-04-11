import React, { useState } from 'react';
import { FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { connect } from 'react-redux';

import { updateFeed } from '../../store/News/actions';
import Wrapper from '../components/Wrapper';
import FeedModal from './FeedModal';

interface IFeedList {
  feeds: string[];
  updateFeed: (newFeed: string, index: number) => void;
}

const FeedList = ({ feeds, updateFeed }: IFeedList): React.JSX.Element => {
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedFeed, setUpdatedFeed] = useState('');

  const handlePress = (feed: string, index: number) => {
    setSelectedFeed(feed);
    setSelectedIndex(index);
    setUpdatedFeed(feed);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (
      selectedFeed &&
      updatedFeed.trim() &&
      selectedIndex !== null &&
      selectedFeed !== updatedFeed
    ) {
      updateFeed(updatedFeed.trim(), selectedIndex);
    }
    setModalVisible(false);
  };

  const handleDelete = () => {
    setModalVisible(false);
  };

  const renderFeedItem = ({ item, index }: { item: string; index: number }) => (
    <Pressable onPress={() => handlePress(item, index)} style={styles.feedItem}>
      <Text style={styles.feedUrl}>{item}</Text>
    </Pressable>
  );

  return (
    <>
      <Wrapper>
        <Text style={styles.subtitleText}>List of your current feeds:</Text>
        <FlatList
          data={feeds}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={renderFeedItem}
          contentContainerStyle={styles.feedList}
        />
      </Wrapper>
      <FeedModal
        isVisible={modalVisible}
        value={updatedFeed}
        setValue={setUpdatedFeed}
        onSave={handleSave}
        onDelete={handleDelete}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateFeed: (feed, index) => dispatch(updateFeed(feed, index)),
});

export default connect(null, mapDispatchToProps)(FeedList);

const styles = StyleSheet.create({
  feedItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
