import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { articlesToShowVariant } from '../components/NewsListComponents/ArticlesToShowVariant';
import NewsDetails from '../views/NewsDetails';
import NewsList from '../views/NewsList';
import FeedInput from '../views/FeedInput';

export type MainStackParamList = {
  NewsList: {
    feedUrl: string;
    articlesToShow?: articlesToShowVariant;
  };
  FeedInput: never;
  NewsDetails: {
    newsItem: {
      title: string;
      description: string;
      date: string;
      images: string;
      id: string;
    };
  };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="FeedInput">
        <Stack.Screen name="FeedInput" component={FeedInput} />
        <Stack.Screen name="NewsList" component={NewsList} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
