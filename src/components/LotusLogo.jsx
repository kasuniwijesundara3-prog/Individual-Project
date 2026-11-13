import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Custom Lotus Flower Logo component matching the GlowUp brand showcase
export default function LotusLogo({ size = 80, showText = true, subtitle = null, textColor = colors.brandDeep }) {
  const iconSize = size * 0.7;

  return (
    <View style={styles.container}>
      {/* Decorative Lotus Flower Icon with Petal Backdrop */}
      <View style={[styles.lotusCircle, { width: size, height: size, borderRadius: size / 2 }]}>
        <Ionicons name="flower-outline" size={iconSize} color={colors.primary} />
      </View>

      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.brandTitle, { fontSize: size * 0.42, color: textColor }]}>
            GlowUp
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, { fontSize: size * 0.16 }]}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lotusCircle: {
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  brandTitle: {
    fontWeight: 'bold',
    letterSpacing: 1.2,
    fontFamily: 'serif',
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
});
