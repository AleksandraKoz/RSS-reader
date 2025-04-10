import rssParser from 'react-native-rss-parser';

import {
  GET_NEWS_FEED_PENDING,
  GET_NEWS_FEED_FULFILLED,
  GET_NEWS_FEED_REJECTED,
} from './actionTypes';
import { setUrl } from '../../api/urls';
import { defaultHeaders } from '../../api/headers';

export function getNewsFeed() {
  return async (dispatch) => {
    dispatch({ type: GET_NEWS_FEED_PENDING });
    return await fetch(`${setUrl()}`, {
      headers: defaultHeaders(),
      method: 'GET',
    })
      .then(async (response) => {
        if (response.status === 200) {
          return await response.text();
        }
        throw await response.text();
      })
      .then((responseData) => rssParser.parse(responseData))
      .then((responseData) =>
        dispatch({
          type: GET_NEWS_FEED_FULFILLED,
          payload: { data: responseData },
        })
      )
      .catch((error) =>
        dispatch({
          type: GET_NEWS_FEED_REJECTED,
          payload: { error },
        })
      );
  };
}
