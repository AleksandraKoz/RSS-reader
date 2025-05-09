import {
  ADD_NEW_FEED_FULFILLED,
  ADD_NEW_FEED_PENDING,
  ADD_NEW_FEED_REJECTED,
  DELETE_FEED_FULFILLED,
  DELETE_FEED_PENDING,
  DELETE_FEED_REJECTED,
  GET_NEWS_FEED_FULFILLED,
  GET_NEWS_FEED_PENDING,
  GET_NEWS_FEED_REJECTED,
  UPDATE_FEED_FULFILLED,
  UPDATE_FEED_PENDING,
  UPDATE_FEED_REJECTED,
  ADD_TO_FAVOURITE_PENDING,
  ADD_TO_FAVOURITE_FULFILLED,
  ADD_TO_FAVOURITE_REJECTED,
  REMOVE_FROM_FAVOURITE_PENDING,
  REMOVE_FROM_FAVOURITE_FULFILLED,
  REMOVE_FROM_FAVOURITE_REJECTED,
} from './actionTypes';

const initialState = {
  isPending: false,
  isPendingFav: false,
  allNews: {},
  newsFeeds: [],
  favouriteNews: [],
  addFeedError: '',
  updateFeedError: '',
  deleteFeedError: '',
  getNewsError: '',
  addToFavError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_FEED_PENDING:
      return {
        ...state,
        isPending: true,
        getNewsError: '',
      };

    case ADD_NEW_FEED_PENDING:
      return {
        ...state,
        isPending: true,
        addFeedError: '',
      };

    case UPDATE_FEED_PENDING:
      return {
        ...state,
        isPending: true,
        updateFeedError: '',
      };

    case DELETE_FEED_PENDING:
      return {
        ...state,
        isPending: true,
        deleteFeedError: '',
      };

    case ADD_NEW_FEED_FULFILLED:
      return {
        ...state,
        isPending: false,
        newsFeeds: [...state.newsFeeds, action.payload.data],
      };

    case ADD_NEW_FEED_REJECTED:
      return {
        ...state,
        isPending: false,
        addFeedError: action.payload.error,
      };

    case UPDATE_FEED_FULFILLED: {
      const updatedFeeds = [...state.newsFeeds];
      updatedFeeds[action.payload.index] = action.payload.data;
      return {
        ...state,
        isPending: false,
        newsFeeds: updatedFeeds,
      };
    }

    case UPDATE_FEED_REJECTED:
      return {
        ...state,
        isPending: false,
        updateFeedError: action.payload.error,
      };

    case DELETE_FEED_FULFILLED: {
      const updatedFeeds = state.newsFeeds.filter((_, index) => index !== action.payload.index);

      const updatedAllNews = { ...state.allNews };
      delete updatedAllNews[state.newsFeeds[action.payload.index]];

      return {
        ...state,
        isPending: false,
        newsFeeds: updatedFeeds,
        allNews: updatedAllNews,
      };
    }

    case DELETE_FEED_REJECTED:
      return {
        ...state,
        isPending: false,
        updateFeedError: action.payload.error,
      };

    case GET_NEWS_FEED_FULFILLED: {
      return {
        ...state,
        isPending: false,
        allNews: {
          ...state.allNews,
          [action.payload.feedUrl]: action.payload.data,
        },
      };
    }

    case GET_NEWS_FEED_REJECTED:
      return {
        ...state,
        allNews: null,
        isPending: false,
        getNewsError: action.payload.error,
      };

    case ADD_TO_FAVOURITE_PENDING:
      return {
        ...state,
        isPendingFav: true,
      };

    case ADD_TO_FAVOURITE_FULFILLED:
      return {
        ...state,
        isPendingFav: false,
        favouriteNews: [...state.favouriteNews, action.payload.data],
      };

    case ADD_TO_FAVOURITE_REJECTED:
      return {
        ...state,
        isPendingFav: false,
        addToFavError: action.payload.error,
      };

    case REMOVE_FROM_FAVOURITE_PENDING:
      return {
        ...state,
        isPendingFav: true,
      };

    case REMOVE_FROM_FAVOURITE_FULFILLED:
      const updatedFeeds = state.favouriteNews.filter((name) => name !== action.payload.data);

      return {
        ...state,
        isPendingFav: false,
        favouriteNews: updatedFeeds,
      };

    case REMOVE_FROM_FAVOURITE_REJECTED:
      return {
        ...state,
        isPendingFav: false,
        addToFavError: action.payload.error,
      };
    default:
      return state;
  }
};
