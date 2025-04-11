import rssParser from 'react-native-rss-parser';

import {
  GET_NEWS_FEED_PENDING,
  GET_NEWS_FEED_FULFILLED,
  GET_NEWS_FEED_REJECTED,
  ADD_NEW_FEED_PENDING,
  ADD_NEW_FEED_FULFILLED,
  ADD_NEW_FEED_REJECTED,
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

export function addNewFeed(newFeed) {
  return async (dispatch, getState) => {
    dispatch({ type: ADD_NEW_FEED_PENDING });
    const { newsFeeds } = getState().news;
    const feedAlreadyExists = newsFeeds.includes(newFeed);
    if (feedAlreadyExists || (typeof newFeed === 'string' && !newFeed)) {
      console.log(newFeed);
      dispatch({
        type: ADD_NEW_FEED_REJECTED,
        payload: {
          error: `${!!newFeed ? 'Feed already exists' : 'Feed is empty'}`,
        },
      });
      return;
    }
    dispatch({
      type: ADD_NEW_FEED_FULFILLED,
      payload: { data: newFeed },
    });
  };
}
