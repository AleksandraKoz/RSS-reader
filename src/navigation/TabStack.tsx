import React, { useRef } from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { CurvedBottomBar, ICurvedBottomBarRef } from 'react-native-curved-bottom-bar';
import NewsList from '../NewsList';
import FeedInput from '../FeedInput';

export type TabRoutes = 'NewsList' | 'NewsList1' | 'NewsList2';

type TabBarProps = {
  routeName: TabRoutes;
  selectedTab: string;
  navigate: (routeName: string) => void;
};

const TabBarIcon = ({ routeName, selectedTab, navigate }: TabBarProps): React.JSX.Element => (
  <TouchableOpacity onPress={() => navigate(routeName)} style={styles.tabBarIcon}>
    <Text style={{ fontWeight: selectedTab === routeName ? 'bold' : 'normal' }}>{routeName}</Text>
  </TouchableOpacity>
);

const TabStack = (): React.JSX.Element => {
  const ref = useRef<ICurvedBottomBarRef>(null);

  return (
    <CurvedBottomBar.Navigator
      ref={ref}
      type="UP"
      height={65}
      circleWidth={50}
      circlePosition="CENTER"
      initialRouteName="NewsList"
      shadowStyle={styles.shadow}
      bgColor="white"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBarIcon {...props} />}
      renderCircle={(props) => <TabBarIcon {...props} />}
    >
      <CurvedBottomBar.Screen name="FeedInput" position="LEFT" component={FeedInput} />
      <CurvedBottomBar.Screen name="NewsList" position="CIRCLE" component={NewsList} />
      <CurvedBottomBar.Screen name="NewsList1" position="RIGHT" component={NewsList} />
    </CurvedBottomBar.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  } as ViewStyle,
  tabBarIcon: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  } as ViewStyle,
});

export default TabStack;
