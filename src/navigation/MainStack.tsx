import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabStack from './TabStack';
import NewsDetails from '../NewsDetails';

export type MainStackParamList = {
  TabStack: undefined;
  NewsDetails: { newsItem: any }; // ← zamień `any` na własny typ, np. NewsItemType
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TabStack">
        <Stack.Screen name="TabStack" component={TabStack} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
