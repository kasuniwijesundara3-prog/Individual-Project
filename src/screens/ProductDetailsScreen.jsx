import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../context/ProductsContext';
import { useFavourites } from '../context/FavouritesContext';
import { colors } from '../theme/colors';

const icons = { Cleanser: 'water-outline', Moisturizer: 'flower-outline', Serum: 'sparkles-outline', Sunscreen: 'sunny-outline' };
export default function ProductDetailsScreen({ route }) {
  const { getProductById } = useProducts();
  const { isFavourite, toggleFavourite } = useFavourites();
  const product = getProductById(route.params.productId);
  if (!product) return <View style={styles.missing}><Text style={styles.missingText}>This product is no longer available.</Text></View>;
  const saved = isFavourite(product.id);
  return (
    <ScrollView style={styles.safe} contentContainerStyle={styles.content}>
      <View style={styles.art}><Ionicons name={icons[product.category] || 'sparkles-outline'} size={86} color={colors.primary} /><TouchableOpacity style={styles.heart} onPress={() => toggleFavourite(product.id)}><Ionicons name={saved ? 'heart' : 'heart-outline'} size={23} color={saved ? colors.primary : colors.textSecondary} /></TouchableOpacity></View>
      <Text style={styles.brand}>{product.brand}  ·  {product.category}</Text><Text style={styles.title}>{product.name}</Text>
      <View style={styles.rating}><Ionicons name="star" size={16} color="#E5A52E" /><Text style={styles.ratingText}>{product.rating} ({product.reviews} reviews)</Text></View>
      <Text style={styles.price}>LKR {Number(product.price).toLocaleString()}</Text>
      <View style={styles.divider} /><Text style={styles.sectionTitle}>About this product</Text><Text style={styles.description}>{product.description}</Text>
      <Text style={styles.sectionTitle}>Key ingredients</Text><View style={styles.chips}>{(product.ingredients || []).map((item) => <View key={item} style={styles.chip}><Text style={styles.chipText}>{item}</Text></View>)}</View>
      <Text style={styles.sectionTitle}>Suitable for</Text><Text style={styles.description}>{(product.skinTypes || []).join('  ·  ')}</Text>
      <View style={styles.note}><Ionicons name="information-circle-outline" size={19} color={colors.primaryDark} /><Text style={styles.noteText}>Patch test new products and follow the product packaging for use instructions.</Text></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, content: { padding: 20, paddingBottom: 38 }, art: { height: 240, backgroundColor: colors.primarySubtle, borderRadius: 24, alignItems: 'center', justifyContent: 'center' }, heart: { position: 'absolute', right: 14, top: 14, width: 42, height: 42, borderRadius: 21, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }, brand: { marginTop: 20, color: colors.primaryDark, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.1 }, title: { marginTop: 6, color: colors.brandDeep, fontSize: 27, fontWeight: '800' }, rating: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 }, ratingText: { fontSize: 12, color: colors.textSecondary }, price: { marginTop: 14, color: colors.primaryDark, fontSize: 20, fontWeight: '800' }, divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: 20 }, sectionTitle: { marginTop: 17, marginBottom: 7, fontSize: 15, fontWeight: '800', color: colors.textPrimary }, description: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, chip: { paddingHorizontal: 11, paddingVertical: 7, borderRadius: 16, backgroundColor: colors.surface, borderColor: colors.borderLight, borderWidth: 1 }, chipText: { color: colors.textPrimary, fontSize: 11, fontWeight: '600' }, note: { flexDirection: 'row', gap: 8, marginTop: 22, padding: 13, backgroundColor: '#FFF3E0', borderRadius: 13 }, noteText: { flex: 1, fontSize: 11, color: colors.textSecondary, lineHeight: 17 }, missing: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }, missingText: { color: colors.textSecondary } });
