import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';

import { MainStackParamList } from '../navigation/MainStack';
import NewsInfoCard from './NewsInfoCard';
import NewsListHeader from './NewsListHeader';
import EmptyList from './EmptyList';

type NewsListRouteProp = RouteProp<MainStackParamList, 'NewsList'>;

interface INewsListProps {
  allNews: {
    [feedUrl: string]: {
      title?: string;
      description?: string;
      items: Array<{
        id: string;
        title: string;
        description: string;
        published: string;
        enclosure?: { url: string } | { url: string }[];
      }>;
    };
  };
  isPending: boolean;
}

const NewsList = ({ allNews, isPending }: INewsListProps): React.JSX.Element => {
  const route = useRoute<NewsListRouteProp>();
  const { feedUrl, showAll } = route.params;

  const newsFeed = showAll
    ? {
        title: 'All News',
        description: 'Combined feed from all sources',
        items: Object.values(allNews)
          .map((feed) => feed.items || [])
          .flat(),
      }
    : allNews?.[feedUrl];

  return (
    <SafeAreaView style={{ backgroundColor: 'rgba(212, 201, 190, 1)', flex: 1 }}>
      {(newsFeed && newsFeed?.items?.length > 0) || isPending ? (
        <FlatList
          data={newsFeed?.items}
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
            <NewsListHeader
              title={newsFeed?.title || feedUrl}
              description={newsFeed?.description || ''}
            />
          }
        />
      ) : (
        <EmptyList feedUrl={feedUrl} />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  allNews: state.news.allNews,
  isPending: state.news.isPending,
});

export default connect(mapStateToProps)(NewsList);
