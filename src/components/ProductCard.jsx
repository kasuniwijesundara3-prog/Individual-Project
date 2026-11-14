import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useFavourites } from '../context/FavouritesContext';

const categoryIcons = { Cleanser: 'water-outline', Moisturizer: 'flower-outline', Serum: 'sparkles-outline', Sunscreen: 'sunny-outline' };

export default function ProductCard({ product, onPress, cardStyle }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const saved = isFavourite(product.id);
  return (
    <View style={[styles.card, cardStyle]}>
      <TouchableOpacity activeOpacity={0.86} onPress={onPress} accessibilityRole="button" accessibilityLabel={product.name}>
        <View style={styles.art}>
          <Ionicons name={categoryIcons[product.category] || 'sparkles-outline'} size={38} color={colors.primary} />
        </View>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text numberOfLines={1} style={styles.name}>{product.name}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>LKR {Number(product.price).toLocaleString()}</Text>
          <View style={styles.rating}><Ionicons name="star" size={12} color="#E5A52E" /><Text style={styles.ratingText}>{product.rating}</Text></View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleFavourite(product.id)} style={styles.heart} accessibilityRole="button" accessibilityLabel={saved ? 'Remove from saved' : 'Save product'}>
        <Ionicons name={saved ? 'heart' : 'heart-outline'} size={19} color={saved ? colors.primary : colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: 174, padding: 10, marginRight: 12, backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.borderLight },
  art: { height: 112, borderRadius: 13, backgroundColor: colors.primarySubtle, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  heart: { position: 'absolute', top: 18, right: 18, width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  brand: { fontSize: 10, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 },
  name: { marginTop: 4, fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  footer: { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 12, color: colors.primaryDark, fontWeight: '700' },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: 11, color: colors.textSecondary },
});
