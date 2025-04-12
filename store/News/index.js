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
} from './actionTypes';

const initialState = {
  isPending: false,
  allNews: null,
  newsFeeds: [],
  addFeedError: '',
  updateFeedError: '',
  deleteFeedError: '',
  getNewsError: '',
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
      return {
        ...state,
        isPending: false,
        newsFeeds: updatedFeeds,
      };
    }

    case DELETE_FEED_REJECTED:
      return {
        ...state,
        isPending: false,
        updateFeedError: action.payload.error,
      };

    case GET_NEWS_FEED_FULFILLED:
      return {
        ...state,
        isPending: false,
        allNews: action.payload.data,
      };

    case GET_NEWS_FEED_REJECTED:
      return {
        ...state,
        allNews: null,
        isPending: false,
        getNewsError: action.payload.error,
      };
    default:
      return state;
  }
};
