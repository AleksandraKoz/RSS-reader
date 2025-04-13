import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FullHeartIcon from '../assets/fullHeart.png';
import EmptyHeartIcon from '../assets/emptyHeart.png';

import Wrapper from '../components/Wrapper.tsx';
import { connect } from 'react-redux';
import { addToFavourite, getNewsFeed, removeFromFavourite } from '../../store/News/actions';

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
  const navigation = useNavigation();
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
  getNewsFeed: (feedUrl) => dispatch(getNewsFeed(feedUrl)),
  addToFavourite: (index) => dispatch(addToFavourite(index)),
  removeFromFavourite: (index) => dispatch(removeFromFavourite(index)),
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
