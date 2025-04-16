import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { addNewFeed } from '../../store/News/actions';
import { IStoreStates } from '../../store/storeTyping';
import FeedList from '../../components/FeedInputComponents/FeedList';
import FeedInputHeader from '../../components/FeedInputComponents/FeedInputHeader';

interface IFeedInput {
  newsFeeds: string[];
}

const FeedInput = ({ newsFeeds }: IFeedInput): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.background}>
      <FeedInputHeader />
      <FeedList feeds={newsFeeds} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: IStoreStates) => ({
  newsFeeds: state.news.newsFeeds,
});

const mapDispatchToProps = (dispatch) => ({
  addNewFeed: (feed: string) => dispatch(addNewFeed(feed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedInput);

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(212, 201, 190, 1)',
    flex: 1,
  },
});
