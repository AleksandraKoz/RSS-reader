import {
  ADD_NEW_FEED_FULFILLED,
  ADD_NEW_FEED_PENDING,
  ADD_NEW_FEED_REJECTED,
  GET_NEWS_FEED_FULFILLED,
  GET_NEWS_FEED_PENDING,
  GET_NEWS_FEED_REJECTED,
  UPDATE_FEED_FULFILLED,
  UPDATE_FEED_PENDING,
  UPDATE_FEED_REJECTED,
} from './actionTypes';

const initialState = {
  isPending: false,
  newsDetails: {},
  newsFeeds: [],
  addFeedError: '',
  updateFeedError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_FEED_PENDING:
      return {
        ...state,
        isPending: true,
        addFeedError: '',
        updateFeedError: '',
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

    case GET_NEWS_FEED_FULFILLED:
    case GET_NEWS_FEED_REJECTED:
      return {
        ...state,
        isPending: true,
        newsDetails: action.payload.data,
      };
    default:
      return state;
  }
};
