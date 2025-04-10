import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';

import { getNewsFeed } from '../../store/News/actions';

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
          <View>
            <Text>{item?.title}</Text>
          </View>
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
