import React, { useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import { getNewsFeed } from '../../store/News/actions';
import NewsInfoCard from './NewsInfoCard';
import NewsListHeader from './NewsListHeader';

const NewsList = ({ newsDetails, getNewsFeed }) => {
  useEffect(() => {
    getNewsFeed();
  }, [getNewsFeed]);

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
        ListHeaderComponent={
          <NewsListHeader title={newsDetails?.title} description={newsDetails?.description} />
        }
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
