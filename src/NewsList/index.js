import React, { useEffect } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ paddingTop: 100, flex: 1 }}
    >
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
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => ({
  newsDetails: state.news.newsDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getNewsFeed: () => dispatch(getNewsFeed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
