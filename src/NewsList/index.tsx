import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';

import { MainStackParamList } from '../navigation/MainStack';
import NewsInfoCard from './NewsInfoCard';
import NewsListHeader from './NewsListHeader';
import EmptyList from './EmptyList.tsx';

type NewsListRouteProp = RouteProp<MainStackParamList, 'NewsList'>;

interface INewsList {
  allNews: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
      published: string;
      enclosure: { url: string } | { url: string }[];
    };
  };
  isPending: boolean;
}

const NewsList = ({ allNews, isPending }: INewsList): React.JSX.Element => {
  const route = useRoute<NewsListRouteProp>();
  const { feedUrl } = route?.params;

  return (
    <SafeAreaView style={{ backgroundColor: 'rgba(212, 201, 190, 1)', flex: 1 }}>
      {allNews || isPending ? (
        <FlatList
          data={allNews?.items}
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
            <NewsListHeader title={allNews?.title} description={allNews?.description} />
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
