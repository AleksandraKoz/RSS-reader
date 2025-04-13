import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import NewsDetails from '../NewsDetails';
import NewsList from '../NewsList';
import FeedInput from '../FeedInput';

export type MainStackParamList = {
  NewsList: never;
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
