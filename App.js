import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GradientBackground from './src/components/GradientBackground';
import LotusLogo from './src/components/LotusLogo';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <GradientBackground>
      <StatusBar style="dark" />
      <View style={styles.centerContainer}>
        <LotusLogo size={100} subtitle="Your Smart Skincare Companion" />
        <Text style={styles.setupText}>GlowUp Expo App Initialized ✨</Text>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  setupText: {
    marginTop: 20,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
