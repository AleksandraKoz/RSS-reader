import rssParser from 'react-native-rss-parser';

import {
  GET_NEWS_FEED_PENDING,
  GET_NEWS_FEED_FULFILLED,
  GET_NEWS_FEED_REJECTED,
  ADD_NEW_FEED_PENDING,
  ADD_NEW_FEED_FULFILLED,
  ADD_NEW_FEED_REJECTED,
  UPDATE_FEED_PENDING,
  UPDATE_FEED_FULFILLED,
  UPDATE_FEED_REJECTED,
  DELETE_FEED_PENDING,
  DELETE_FEED_FULFILLED,
  DELETE_FEED_REJECTED,
} from './actionTypes';
import { defaultHeaders } from '../../api/headers';

export function getNewsFeed(feedUrl) {
  return async (dispatch) => {
    dispatch({ type: GET_NEWS_FEED_PENDING });
    return await fetch(feedUrl, {
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
          payload: {
            feedUrl,
            data: responseData,
          },
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

export function updateFeed(updatedFeed, index) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_FEED_PENDING });

    try {
      dispatch({
        type: UPDATE_FEED_FULFILLED,
        payload: { data: updatedFeed, index: index },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_FEED_REJECTED,
        payload: { error: "Couldn't update feed URL. Try again later." },
      });
    }
  };
}

export function removeFeed(index) {
  return async (dispatch) => {
    dispatch({ type: DELETE_FEED_PENDING });
    try {
      dispatch({
        type: DELETE_FEED_FULFILLED,
        payload: { index: index },
      });
    } catch (error) {
      dispatch({
        type: DELETE_FEED_REJECTED,
        payload: { error: "Couldn't remove feed URL. Try again later." },
      });
    }
  };
}
