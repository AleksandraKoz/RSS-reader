import React, { useState } from 'react';
import { FlatList, Text, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import EditIcon from '../assets/edit.png';

import { getNewsFeed, removeFeed, updateFeed } from '../../store/News/actions';
import Wrapper from '../components/Wrapper';
import FeedModal from './FeedModal';

interface IFeedList {
  feeds: string[];
  updateFeed: (newFeed: string, index: number) => void;
  removeFeed: (index: number) => void;
  getNewsFeed: (feedUrl: string) => void;
}

const FeedList = ({ feeds, updateFeed, removeFeed, getNewsFeed }: IFeedList): React.JSX.Element => {
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedFeed, setUpdatedFeed] = useState('');

  const navigation = useNavigation();

  const handleLongPress = (feed: string, index: number) => {
    setSelectedFeed(feed);
    setSelectedIndex(index);
    setUpdatedFeed(feed);
    setModalVisible(true);
  };

  const handlePress = (feedUrl) => {
    navigation.navigate('NewsList', { feedUrl });
    getNewsFeed(feedUrl);
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
    console.log(selectedIndex);
    if (selectedIndex !== null) {
      removeFeed(selectedIndex);
    }
    setModalVisible(false);
  };

  const renderFeedItem = ({ item, index }: { item: string; index: number }) => (
    <Pressable key={item} onPress={() => handlePress(item)} style={styles.feedItem}>
      <Text style={styles.feedUrl}>{item}</Text>
      <TouchableOpacity onPress={() => handleLongPress(item, index)}>
        <Image source={EditIcon} style={{ height: 20, width: 20 }} />
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <>
      <Wrapper>
        <Text style={styles.subtitleText}>List of your current feeds:</Text>
        <Text style={styles.descriptionText}>Click on the feed that you want to see :)</Text>
        <Text style={styles.descriptionText}>
          If you want to change the feed, click on modify icon next to it and save the change.
        </Text>
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
  removeFeed: (index) => dispatch(removeFeed(index)),
  getNewsFeed: (feedUrl) => dispatch(getNewsFeed(feedUrl)),
});

export default connect(null, mapDispatchToProps)(FeedList);

const styles = StyleSheet.create({
  descriptionText: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 15,
    paddingBottom: 10,
    textAlign: 'center',
  },
  feedItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
