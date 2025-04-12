import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import EditIcon from '../assets/edit.png';

import { getNewsFeed } from '../../store/News/actions';

interface IFeedListItem {
  name: string;
  index: number;
  onClickEdit: (name: string, id: number) => void;
}

const FeedListItem = ({ name, index, onClickEdit }: IFeedListItem): React.JSX.Element => {
  const navigation = useNavigation();

  const handlePress = (feedUrl) => {
    navigation.navigate('NewsList', { feedUrl });
    getNewsFeed(feedUrl);
  };

  return (
    <Pressable key={name} onPress={() => handlePress(name)} style={styles.feedItem}>
      <Text style={styles.feedUrl}>{name}</Text>
      <TouchableOpacity onPress={() => (onClickEdit ? onClickEdit(name, index) : () => {})}>
        <Image source={EditIcon} style={{ height: 20, width: 20 }} />
      </TouchableOpacity>
    </Pressable>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getNewsFeed: (feedUrl) => dispatch(getNewsFeed(feedUrl)),
});

export default connect(null, mapDispatchToProps)(FeedListItem);

const styles = StyleSheet.create({
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
  feedUrl: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 15,
  },
});
