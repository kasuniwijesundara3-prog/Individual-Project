import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ProductsProvider } from './src/context/ProductsContext';
import { FavouritesProvider } from './src/context/FavouritesContext';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductsProvider>
        <FavouritesProvider>
          <NavigationContainer>
            <StatusBar style="dark" backgroundColor={colors.background} />
            <AppNavigator />
          </NavigationContainer>
        </FavouritesProvider>
      </ProductsProvider>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
