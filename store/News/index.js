import { GET_NEWS_FEED_FULFILLED, GET_NEWS_FEED_REJECTED } from './actionTypes';

const initialState = {
  isPending: false,
  newsDetails: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
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
