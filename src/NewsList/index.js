import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { getNewsFeed } from '../../store/News/actions';
import NewsInfoCard from './NewsInfoCard';

const NewsList = ({ newsDetails, getNewsFeed }) => {
  useEffect(() => {
    getNewsFeed();
  }, [getNewsFeed]);

  const header = () => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.titleText}>{newsDetails?.title}</Text>
        <Text style={styles.descriptionText}>{newsDetails?.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'rgba(212, 201, 190, 1)' }}>
      <FlatList
        data={newsDetails?.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsInfoCard
            title={item?.title}
            description={item?.description}
            date={item?.published}
            images={item?.enclosure?.url ?? item?.enclosures?.[0]?.url}
          />
        )}
        ListHeaderComponent={header()}
      />
    </SafeAreaView>
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

const mapStateToProps = (state) => ({
  newsDetails: state.news.newsDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getNewsFeed: () => dispatch(getNewsFeed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
