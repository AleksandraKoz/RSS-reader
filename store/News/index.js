import {
  ADD_NEW_FEED_FULFILLED,
  ADD_NEW_FEED_PENDING,
  ADD_NEW_FEED_REJECTED,
  GET_NEWS_FEED_FULFILLED,
  GET_NEWS_FEED_PENDING,
  GET_NEWS_FEED_REJECTED,
} from './actionTypes';

const initialState = {
  isPending: false,
  newsDetails: {},
  newsFeeds: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_FEED_PENDING:
    case ADD_NEW_FEED_PENDING:
      return {
        ...state,
        isPending: true,
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
