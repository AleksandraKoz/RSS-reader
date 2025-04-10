import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

interface INewsInfoCard {
  title: string;
  description: string;
  published: string;
  images: string;
}

const NewsInfoCard = ({
  title,
  description,
  published,
  images,
}: INewsInfoCard): React.JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <Image source={{ uri: images }} />
      <Text style={styles.titleText}>{title}</Text>
      <Text>{description}</Text>
      <Text>{published}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
  },
  wrapper: {
    backgroundColor: 'rgba(212, 201, 190, 1)',
    borderRadius: '3%',
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 10,
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NewsInfoCard);
