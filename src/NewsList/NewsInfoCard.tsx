import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Wrapper from '../components/Wrapper.tsx';

interface INewsInfoCard {
  title: string;
  description: string;
  date: string;
  images: string;
  id: string;
}

const NewsInfoCard = ({
  title,
  description,
  date,
  images,
  id,
}: INewsInfoCard): React.JSX.Element => {
  const navigation = useNavigation();
  const onCardClick = () => {
    navigation.navigate('NewsDetails', {
      newsItem: { title, description, date, images, id },
    });
  };

  return (
    <TouchableOpacity onPress={onCardClick}>
      <Wrapper>
        {images ? <Image source={{ uri: images }} style={styles.image} /> : null}
        <Text style={styles.titleText}>{title}</Text>
        <Text numberOfLines={4}>{description}</Text>
        <Text style={styles.date}>{date.slice(0, 22)}</Text>
      </Wrapper>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  date: {
    color: '#444',
    fontSize: 12,
    marginTop: 8,
  },
  image: {
    backgroundColor: '#eee',
    borderRadius: 12,
    height: 180,
    marginBottom: 10,
    width: '100%',
  },
  titleText: {
    fontWeight: 'bold',
  },
});

export default NewsInfoCard;
