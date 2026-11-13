import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

// Full-screen soft pastel pink linear gradient background wrapper
export default function GradientBackground({ children, style, safe = true }) {
  const content = safe ? (
    <SafeAreaView style={[styles.safeArea, style]}>{children}</SafeAreaView>
  ) : (
    <View style={[styles.safeArea, style]}>{children}</View>
  );

  return (
    <LinearGradient
      colors={colors.gradientBackground}
      style={styles.gradient}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {content}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
