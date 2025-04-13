import React from 'react';
import { Image, Pressable, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import EditIcon from '../assets/edit.png';

import { MainStackParamList } from '../navigation/MainStack.tsx';
import { getNewsFeed } from '../../store/News/actions';

interface IFeedListItem {
  name: string;
  index: number;
  onClickEdit: (name: string, id: number) => void;
  getNewsFeed: (url: string) => void;
}

const FeedListItem = ({
  name,
  index,
  onClickEdit,
  getNewsFeed,
}: IFeedListItem): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handlePress = (feedUrl: string) => {
    navigation.navigate('NewsList', { feedUrl });
    getNewsFeed(feedUrl);
  };

  return (
    <Pressable key={name} onPress={() => handlePress(name)} style={styles.feedItem}>
      <View style={styles.textWrapper}>
        <Text style={styles.feedUrl} numberOfLines={2} ellipsizeMode="tail">
          {name}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onClickEdit?.(name, index)} style={styles.iconWrapper}>
        <Image source={EditIcon} style={styles.icon} />
      </TouchableOpacity>
    </Pressable>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getNewsFeed: (feedUrl: string) => dispatch(getNewsFeed(feedUrl)),
});

export default connect(null, mapDispatchToProps)(FeedListItem);

const styles = StyleSheet.create({
  feedItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  feedUrl: {
    color: 'rgba(18, 52, 88,1)',
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 15,
  },
  icon: {
    height: 20,
    width: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
    paddingRight: 10,
  },
});
