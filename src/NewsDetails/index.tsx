import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/MainStack.tsx';
import Button from '../components/Button.tsx';
import { addToFavourite } from '../../store/News/actions';
import { connect } from 'react-redux';

type NewsDetailsRouteProp = RouteProp<MainStackParamList, 'NewsDetails'>;

interface INewsDetails {
  addToFavourite: (url: string) => void;
}

const NewsDetails = ({ addToFavourite }: INewsDetails): React.JSX.Element => {
  const route = useRoute<NewsDetailsRouteProp>();
  const { title, description, date, images, id } = route.params.newsItem;

  const handleAddToFavourite = () => {
    addToFavourite(id);
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: 'rgba(241, 239, 236,1)' }}>
        {images && <Image source={{ uri: images }} style={styles.image} resizeMode="cover" />}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date.slice(0, 22)}</Text>
          <Text style={styles.description}>{description}</Text>
          <Button
            title="Add to favourite"
            onPress={() => {
              handleAddToFavourite();
            }}
            style={styles.buttonStyle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToFavourite: (index) => dispatch(addToFavourite(index)),
});

export default connect(null, mapDispatchToProps)(NewsDetails);

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 20,
  },
  content: {
    backgroundColor: 'rgba(241, 239, 236,1)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: -20,
    padding: 20,
  },
  date: {
    color: '#666',
    fontSize: 13,
    marginBottom: 16,
  },
  description: {
    color: '#444',
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    backgroundColor: '#ccc',
    height: 400,
    resizeMode: 'contain',
    width: '100%',
  },
  title: {
    color: '#333',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
