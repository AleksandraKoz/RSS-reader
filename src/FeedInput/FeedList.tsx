import React, { useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import { getNewsFeed, removeFeed, updateFeed } from '../../store/News/actions';
import Wrapper from '../components/Wrapper';
import FeedModal from './FeedModal';
import FeedListItem from './FeedListItem.tsx';
import Button from '../components/Button.tsx';
import { MainStackParamList } from '../navigation/MainStack.tsx';

interface IFeedList {
  feeds: string[];
  updateFeed: (newFeed: string, index: number) => void;
  removeFeed: (index: number) => void;
  getNewsFeed: (url: string) => void;
}

const FeedList = ({ feeds, updateFeed, removeFeed, getNewsFeed }: IFeedList): React.JSX.Element => {
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedFeed, setUpdatedFeed] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handleEdit = (feed: string, index: number) => {
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
    if (selectedIndex !== null) {
      removeFeed(selectedIndex);
    }
    setModalVisible(false);
  };

  const handlePressAll = async (isFavourite: boolean = false) => {
    const feedPromises = feeds.map((feedUrl) => getNewsFeed(feedUrl));
    await Promise.all(feedPromises);
    if (isFavourite) {
      navigation.navigate('NewsList', {
        feedUrl: 'My favourite',
        showAll: 'fav',
      });
    } else {
      navigation.navigate('NewsList', { feedUrl: 'All news', showAll: 'all' });
    }
  };

  return (
    <>
      <Wrapper style={{ flex: 1 }}>
        <Text style={styles.subtitleText}>List of your current feeds:</Text>
        <Text style={styles.descriptionText}>Click on the feed that you want to see :)</Text>
        <Text style={styles.descriptionText}>
          If you want to change the feed, click on modify icon next to it and save the change.
        </Text>
        <FlatList
          data={feeds}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item, index }) => (
            <FeedListItem name={item} index={index} onClickEdit={() => handleEdit(item, index)} />
          )}
          contentContainerStyle={styles.feedList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Button
              title="Show favourites"
              variant="primary"
              onPress={() => handlePressAll(true)}
              style={{ marginBottom: 10 }}
            />
          }
          ListFooterComponent={
            <Button title="Show all" variant="primary" onPress={() => handlePressAll()} />
          }
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
  updateFeed: (feed: string, index: string) => dispatch(updateFeed(feed, index)),
  removeFeed: (index: string) => dispatch(removeFeed(index)),
  getNewsFeed: (feedUrl: string) => dispatch(getNewsFeed(feedUrl)),
});

export default connect(null, mapDispatchToProps)(FeedList);

const styles = StyleSheet.create({
  descriptionText: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 15,
    paddingBottom: 10,
    textAlign: 'center',
  },
  feedList: {
    paddingTop: 10,
  },
  subtitleText: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});
