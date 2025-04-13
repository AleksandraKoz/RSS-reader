import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import FullHeartIcon from '../assets/fullHeart.png';
import EmptyHeartIcon from '../assets/emptyHeart.png';

import { addToFavourite, getNewsFeed, removeFromFavourite } from '../../store/News/actions';
import { MainStackParamList } from '../navigation/MainStack.tsx';
import Wrapper from '../components/Wrapper.tsx';

interface INewsInfoCard {
  title: string;
  description: string;
  date: string;
  images: string;
  id: string;
  favouriteNews: string[];
  addToFavourite: (url: string) => void;
  removeFromFavourite: (url: string) => void;
}

const NewsInfoCard = ({
  title,
  description,
  date,
  images,
  id,
  favouriteNews,
  addToFavourite,
  removeFromFavourite,
}: INewsInfoCard): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const onCardClick = () => {
    navigation.navigate('NewsDetails', {
      newsItem: { title, description, date, images, id },
    });
  };

  const toggleFavourite = () => {
    if (favouriteNews.includes(id)) {
      removeFromFavourite(id);
    } else {
      addToFavourite(id);
    }
  };

  return (
    <TouchableOpacity onPress={onCardClick}>
      <Wrapper>
        {images ? <Image source={{ uri: images }} style={styles.image} /> : null}
        <View style={styles.headerRow}>
          <Text style={styles.titleText}>{title}</Text>
          <TouchableOpacity onPress={toggleFavourite}>
            <Image
              source={favouriteNews.includes(id) ? FullHeartIcon : EmptyHeartIcon}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>
        <Text numberOfLines={4}>{description}</Text>
        <Text style={styles.date}>{date.slice(0, 22)}</Text>
      </Wrapper>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => ({
  favouriteNews: state.news.favouriteNews,
});

const mapDispatchToProps = (dispatch) => ({
  getNewsFeed: (feedUrl: string) => dispatch(getNewsFeed(feedUrl)),
  addToFavourite: (index: string) => dispatch(addToFavourite(index)),
  removeFromFavourite: (index: string) => dispatch(removeFromFavourite(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsInfoCard);

const styles = StyleSheet.create({
  date: {
    color: '#444',
    fontSize: 12,
    marginTop: 8,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heartIcon: {
    height: 24,
    marginLeft: 10,
    width: 24,
  },
  image: {
    backgroundColor: '#eee',
    borderRadius: 12,
    height: 180,
    marginBottom: 10,
    width: '100%',
  },
  titleText: {
    flex: 1,
    fontWeight: 'bold',
  },
});
