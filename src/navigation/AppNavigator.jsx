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
import { SplashScreen, LoginScreen, RegisterScreen, ForgotPasswordScreen } from '../screens/AccountScreens';
import { ProfileScreen, NotificationsScreen, BudgetPlannerScreen, IngredientCheckerScreen, AdminDashboardScreen, ManageProductsScreen } from '../screens/ManagementScreens';

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
        const icons = { Home: 'home-outline', Discover: 'search-outline', Routine: 'sunny-outline', Saved: 'heart-outline', Profile: 'person-outline' };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
    })}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Discover" component={DiscoverScreen} />
      <Tabs.Screen name="Routine" component={RoutineScreen} options={{ title: 'My routine' }} />
      <Tabs.Screen name="Saved" component={FavoritesScreen} options={{ title: 'Saved' }} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerTintColor: colors.primaryDark }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Create account', headerTintColor: colors.primaryDark }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Reset password', headerTintColor: colors.primaryDark }} />
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product details', headerBackTitle: 'Back', headerTintColor: colors.primaryDark, headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false }} />
      <Stack.Screen name="SkinQuiz" component={SkinQuizScreen} options={{ title: 'Skin quiz', headerBackTitle: 'Back', headerTintColor: colors.primaryDark, headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false }} />
      <Stack.Screen name="ClimateAdvisor" component={ClimateAdvisorScreen} options={{ title: 'Climate advisor', headerBackTitle: 'Back', headerTintColor: colors.primaryDark, headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications', headerTintColor: colors.primaryDark }} />
      <Stack.Screen name="BudgetPlanner" component={BudgetPlannerScreen} options={{ title: 'Budget planner', headerTintColor: colors.primaryDark }} />
      <Stack.Screen name="IngredientChecker" component={IngredientCheckerScreen} options={{ title: 'Ingredient checker', headerTintColor: colors.primaryDark }} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'Admin dashboard', headerTintColor: colors.primaryDark }} />
      <Stack.Screen name="ManageProducts" component={ManageProductsScreen} options={{ title: 'Manage products', headerTintColor: colors.primaryDark }} />
    </Stack.Navigator>
  );
}
