/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */

import React from 'react';
import { Provider } from 'react-redux';
import { Text, FlatList } from 'react-native';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './store/store';

const mockNews = [
    { id: '1', title: 'Test1' },
    { id: '2', title: 'Test2' },
    { id: '3', title: 'Test3' },
    { id: '4', title: 'Test4' },
];

export const NewsList = () => {
    return (
        <FlatList
            data={mockNews}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Text>{item.title}</Text>
            )}
        />
    );
};

function App(): React.JSX.Element {

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NewsList />
        </PersistGate>
      </Provider>
  );
}

export default App;
