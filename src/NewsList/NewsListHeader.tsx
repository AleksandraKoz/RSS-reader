import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface INewsListHeader {
  title: string;
  description: string;
}

const NewsListHeader = ({ title, description }: INewsListHeader): React.JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionText: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 15,
    textAlign: 'center',
  },
  titleText: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapper: {
    backgroundColor: 'rgba(241, 239, 236,1)',
    borderRadius: 20,
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 5,
    padding: 10,
  },
});

export default NewsListHeader;
