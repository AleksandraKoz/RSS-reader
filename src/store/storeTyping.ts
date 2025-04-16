export interface IStoreStates {
  news: {
    isPending: boolean;
    isPendingFav: boolean;
    allNews: {
      [feedUrl: string]: {
        title?: string;
        description?: string;
        items: {
          id: string;
          title: string;
          description: string;
          published: string;
          enclosures: {
            url: string;
          }[];
        }[];
      };
    };
    newsFeeds: string[];
    favouriteNews: string[];
    addFeedError: string;
    updateFeedError: string;
    deleteFeedError: string;
    getNewsError: string;
    addToFavError: string;
  };
}
