import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

interface INewsInfoCard {
  title: string;
  description: string;
  date: string;
  images: string;
}

const NewsInfoCard = ({ title, description, date, images }: INewsInfoCard): React.JSX.Element => {
  return (
    <View style={styles.wrapper}>
      {images ? <Image source={{ uri: images }} style={styles.image} /> : null}
      <Text style={styles.titleText}>{title}</Text>
      <Text numberOfLines={4}>{description}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
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
  wrapper: {
    backgroundColor: 'rgba(241, 239, 236,1)',
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 10,
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NewsInfoCard);
