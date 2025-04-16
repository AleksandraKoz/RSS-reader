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
  ADD_TO_FAVOURITE_PENDING,
  ADD_TO_FAVOURITE_FULFILLED,
  ADD_TO_FAVOURITE_REJECTED,
  REMOVE_FROM_FAVOURITE_PENDING,
  REMOVE_FROM_FAVOURITE_FULFILLED,
  REMOVE_FROM_FAVOURITE_REJECTED,
} from './actionTypes';
import { defaultHeaders } from '../../../api/headers';

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

export function addNewFeed(feedNameToAdd) {
  return async (dispatch, getState) => {
    dispatch({ type: ADD_NEW_FEED_PENDING });
    const { newsFeeds } = getState().news;
    const feedAlreadyExists = newsFeeds.includes(feedNameToAdd);
    if (feedAlreadyExists || (typeof feedNameToAdd === 'string' && !feedNameToAdd)) {
      dispatch({
        type: ADD_NEW_FEED_REJECTED,
        payload: {
          error: `${!!feedNameToAdd ? 'Feed already exists' : 'Feed is empty'}`,
        },
      });
      return;
    }
    dispatch({
      type: ADD_NEW_FEED_FULFILLED,
      payload: { data: feedNameToAdd },
    });
  };
}

export function updateFeed(updatedFeedName, updatedFeedIndex) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_FEED_PENDING });

    try {
      dispatch({
        type: UPDATE_FEED_FULFILLED,
        payload: { data: updatedFeedName, index: updatedFeedIndex },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_FEED_REJECTED,
        payload: { error: "Couldn't update feed URL. Try again later." },
      });
    }
  };
}

export function removeFeed(removedFeedIndex) {
  return async (dispatch) => {
    dispatch({ type: DELETE_FEED_PENDING });
    try {
      dispatch({
        type: DELETE_FEED_FULFILLED,
        payload: { index: removedFeedIndex },
      });
    } catch (error) {
      dispatch({
        type: DELETE_FEED_REJECTED,
        payload: { error: "Couldn't remove feed URL. Try again later." },
      });
    }
  };
}

export function addToFavourite(addedArticleId) {
  return async (dispatch) => {
    dispatch({ type: ADD_TO_FAVOURITE_PENDING });
    try {
      dispatch({
        type: ADD_TO_FAVOURITE_FULFILLED,
        payload: { data: addedArticleId },
      });
    } catch (error) {
      dispatch({
        type: ADD_TO_FAVOURITE_REJECTED,
        payload: { error: "Couldn't add to favourite. Try again later." },
      });
    }
  };
}

export function removeFromFavourite(removedArticleId) {
  return async (dispatch) => {
    dispatch({ type: REMOVE_FROM_FAVOURITE_PENDING });
    try {
      dispatch({
        type: REMOVE_FROM_FAVOURITE_FULFILLED,
        payload: { data: removedArticleId },
      });
    } catch (error) {
      dispatch({
        type: REMOVE_FROM_FAVOURITE_REJECTED,
        payload: { error: "Couldn't add to favourite. Try again later." },
      });
    }
  };
}
