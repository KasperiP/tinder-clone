import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatchesScreen from './pages/Matches';
import MessagesScreen from './pages/Messages';
import ProfileScreen from './pages/Profile';
import SwipeScreen from './pages/Swipe';

SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Sk-Modernist-Regular': require('./assets/fonts/Sk-Modernist-Regular.otf'),
    'Sk-Modernist-Bold': require('./assets/fonts/Sk-Modernist-Bold.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#e94057',
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Swipe') {
                iconName = 'cards';
              } else if (route.name === 'Matches') {
                iconName = 'heart';
              } else if (route.name === 'Messages') {
                iconName = 'chat';
              } else if (route.name === 'Profile') {
                iconName = 'account';
              } else {
                iconName = 'cards';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Swipe" component={SwipeScreen} />
          <Tab.Screen name="Matches" component={MatchesScreen} />
          <Tab.Screen name="Messages" component={MessagesScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
