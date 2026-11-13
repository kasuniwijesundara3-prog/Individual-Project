import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Bold hot pink pill button matching the GlowUp design
export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  icon = null,
  variant = 'primary', // 'primary' | 'outline' | 'secondary'
  style,
  textStyle,
}) {
  const isOutline = variant === 'outline';
  const isSecondary = variant === 'secondary';

  const getBackgroundColor = () => {
    if (disabled) return colors.border;
    if (isOutline) return 'transparent';
    if (isSecondary) return colors.primarySubtle;
    return colors.primary;
  };

  const getTextColor = () => {
    if (disabled) return colors.textMuted;
    if (isOutline || isSecondary) return colors.primary;
    return colors.surface;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: isOutline ? colors.primary : 'transparent',
          borderWidth: isOutline ? 1.5 : 0,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <View style={styles.contentRow}>
          {icon && (
            <Ionicons
              name={icon}
              size={18}
              color={getTextColor()}
              style={styles.icon}
            />
          )}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
