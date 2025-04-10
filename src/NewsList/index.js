import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';

import { getNewsFeed } from '../../store/News/actions';
import NewsInfoCard from './NewsInfoCard';

const NewsList = ({ newsDetails, getNewsFeed }) => {
  useEffect(() => {
    getNewsFeed();
  }, [getNewsFeed]);

  const header = () => {
    return (
      <>
        <Text>{newsDetails?.title}</Text>
        <Text>{newsDetails?.description}</Text>
      </>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'rgba(241, 239, 236,1)' }}>
      <FlatList
        data={newsDetails?.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsInfoCard
            title={item?.title}
            description={item?.description}
            date={item?.published}
            images={item?.enclosures[0].url}
          />
        )}
        ListHeaderComponent={header()}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  newsDetails: state.news.newsDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getNewsFeed: () => dispatch(getNewsFeed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
