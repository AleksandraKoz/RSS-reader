import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';

import { parseDateSafe } from '../utils/dateHelper.tsx';
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
      items: {
        id: string;
        title: string;
        description: string;
        published: string;
        enclosure?: { url: string } | { url: string }[];
      }[];
    };
  };
  isPending: boolean;
  favouriteNews: string[];
}

const NewsList = ({ allNews, isPending, favouriteNews }: INewsListProps): React.JSX.Element => {
  const route = useRoute<NewsListRouteProp>();
  const { feedUrl, showAll } = route.params;

  const getNewsList = () => {
    switch (showAll) {
      case 'all':
        return {
          title: 'All News',
          description: 'Combined feed from all sources',
          items: Object.values(allNews)
            .map((feed) => feed.items || [])
            .flat()
            .sort((a, b) => parseDateSafe(b.published) - parseDateSafe(a.published)),
        };

      case 'fav':
        return {
          title: 'My favourite',
          description: 'Selected favourite feeds',
          items: Object.values(allNews)
            .flatMap((feed) => feed.items || [])
            .filter((item) => favouriteNews.includes(item.id))
            .sort((a, b) => parseDateSafe(b.published) - parseDateSafe(a.published)),
        };

      default:
        return allNews?.[feedUrl];
    }
  };

  const newsFeed = getNewsList(showAll);

  return (
    <SafeAreaView style={{ backgroundColor: 'rgba(212, 201, 190, 1)', flex: 1 }}>
      {(newsFeed && newsFeed?.items?.length > 0) || isPending ? (
        <FlatList
          data={newsFeed?.items}
          keyExtractor={(item, index) => `${item?.id}-${index}`}
          renderItem={({ item }) => (
            <NewsInfoCard
              title={item?.title}
              description={item?.description}
              date={item?.published}
              images={item?.enclosure?.url ?? item?.enclosures?.[0]?.url}
              id={item?.id}
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
  favouriteNews: state.news.favouriteNews,
});

export default connect(mapStateToProps)(NewsList);
