import React from 'react';
import { ScrollView, Text, View, Image, StyleSheet, SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/MainStack.tsx';

type NewsDetailsRouteProp = RouteProp<MainStackParamList, 'NewsDetails'>;

const NewsDetails = (): React.JSX.Element => {
  const route = useRoute<NewsDetailsRouteProp>();
  const { title, description, date, images } = route.params.newsItem;

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: 'rgba(241, 239, 236,1)' }}>
        {images && <Image source={{ uri: images }} style={styles.image} resizeMode="cover" />}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
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
