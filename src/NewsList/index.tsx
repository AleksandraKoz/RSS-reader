import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';

import { MainStackParamList } from '../navigation/MainStack';
import { getNewsFeed } from '../../store/News/actions';
import NewsInfoCard from './NewsInfoCard';
import NewsListHeader from './NewsListHeader';
import EmptyList from './EmptyList.tsx';

type NewsListRouteProp = RouteProp<MainStackParamList, 'NewsList'>;

interface INewsList {
  newsDetails: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
      published: string;
      enclosure: {};
    };
  };
  getNewsFeed: (url: string) => void;
}

const NewsList = ({ newsDetails }: INewsList): React.JSX.Element => {
  const route = useRoute<NewsListRouteProp>();
  const { feedUrl } = route?.params;

  return (
    <SafeAreaView style={{ backgroundColor: 'rgba(212, 201, 190, 1)', flex: 1 }}>
      {newsDetails ? (
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
      ) : (
        <EmptyList feedUrl={feedUrl} />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  newsDetails: state.news.newsDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getNewsFeed: (feedUrl: string) => dispatch(getNewsFeed(feedUrl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
