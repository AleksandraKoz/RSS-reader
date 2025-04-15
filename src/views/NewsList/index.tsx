import React, { useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';

import { parseDateSafe } from '../../utils/dateHelper.tsx';
import { MainStackParamList } from '../../navigation/MainStack.tsx';
import NewsInfoCard from '../../components/NewsListComponents/NewsInfoCard.tsx';
import NewsListHeader from '../../components/NewsListComponents/NewsListHeader.tsx';
import EmptyList from '../../components/NewsListComponents/EmptyList.tsx';

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
        enclosures?: { url: string }[] | [];
      }[];
    };
  };
  isPending: boolean;
  favouriteNews: string[];
}

const NewsList = ({ allNews, isPending, favouriteNews }: INewsListProps): React.JSX.Element => {
  const route = useRoute<NewsListRouteProp>();
  const { feedUrl, showAll } = route.params;
  const [searchedTitle, setSearchedTitle] = useState<string>('');

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

  const newsFeed = getNewsList();

  return (
    <SafeAreaView style={{ backgroundColor: 'rgba(212, 201, 190, 1)', flex: 1 }}>
      {(newsFeed && newsFeed?.items?.length > 0) || isPending ? (
        <FlatList
          data={newsFeed?.items?.filter((singleArticle) =>
            singleArticle.title.toLowerCase().includes(searchedTitle.toLowerCase())
          )}
          keyExtractor={(singleArticle, index) => `${singleArticle?.id}-${index}`}
          renderItem={({ item: singleArticle }) => (
            <NewsInfoCard
              title={singleArticle?.title}
              description={singleArticle?.description}
              date={singleArticle?.published}
              images={singleArticle?.enclosures?.[0]?.url || ''}
              id={singleArticle?.id}
            />
          )}
          ListHeaderComponent={
            <NewsListHeader
              title={newsFeed?.title || feedUrl}
              description={newsFeed?.description || ''}
              searchedTitle={searchedTitle}
              setSearchedTitle={setSearchedTitle}
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
