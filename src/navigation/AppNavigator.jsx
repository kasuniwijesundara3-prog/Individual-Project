import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import RoutineScreen from '../screens/RoutineScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import SkinQuizScreen from '../screens/SkinQuizScreen';
import ClimateAdvisorScreen from '../screens/ClimateAdvisorScreen';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tabs.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginBottom: 4 },
      tabBarStyle: { height: 64, paddingTop: 7, borderTopColor: colors.borderLight, backgroundColor: colors.surface },
      tabBarIcon: ({ color, size }) => {
        const icons = { Home: 'home-outline', Discover: 'search-outline', Routine: 'sunny-outline', Saved: 'heart-outline' };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
    })}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Discover" component={DiscoverScreen} />
      <Tabs.Screen name="Routine" component={RoutineScreen} options={{ title: 'My routine' }} />
      <Tabs.Screen name="Saved" component={FavoritesScreen} options={{ title: 'Saved' }} />
    </Tabs.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product details', headerBackTitle: 'Back', headerTintColor: colors.primaryDark, headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false }} />
      <Stack.Screen name="SkinQuiz" component={SkinQuizScreen} options={{ title: 'Skin quiz', headerBackTitle: 'Back', headerTintColor: colors.primaryDark, headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false }} />
      <Stack.Screen name="ClimateAdvisor" component={ClimateAdvisorScreen} options={{ title: 'Climate advisor', headerBackTitle: 'Back', headerTintColor: colors.primaryDark, headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false }} />
    </Stack.Navigator>
  );
}
