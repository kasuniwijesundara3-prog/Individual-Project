import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { useFavourites } from '../context/FavouritesContext';
import { colors } from '../theme/colors';

export default function FavoritesScreen({ navigation }) {
  const { products } = useProducts();
  const { favouriteIds } = useFavourites();
  const saved = products.filter((p) => favouriteIds.includes(p.id));
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}><Text style={styles.kicker}>YOUR PERSONAL EDIT</Text><Text style={styles.title}>Saved products</Text><Text style={styles.subtitle}>Keep your skincare wishlist close.</Text></View>
      <FlatList data={saved} keyExtractor={(p) => p.id} numColumns={2} contentContainerStyle={styles.grid} columnWrapperStyle={styles.row} renderItem={({ item }) => <ProductCard product={item} cardStyle={styles.gridCard} onPress={() => navigation.navigate('ProductDetails', { productId: item.id })} />} ListEmptyComponent={<View style={styles.empty}><View style={styles.emptyIcon}><Ionicons name="heart-outline" size={26} color={colors.primary} /></View><Text style={styles.emptyTitle}>Your saved list is waiting</Text><Text style={styles.emptyText}>Tap the heart on a product to keep it here.</Text></View>} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20 }, kicker: { color: colors.primary, fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }, title: { marginTop: 5, color: colors.brandDeep, fontWeight: '800', fontSize: 29 }, subtitle: { marginTop: 4, fontSize: 13, color: colors.textSecondary }, grid: { paddingHorizontal: 20, paddingBottom: 24 }, gridCard: { width: '48%', marginRight: 0 }, row: { justifyContent: 'space-between', marginBottom: 12 }, empty: { alignItems: 'center', paddingHorizontal: 30, paddingTop: 90 }, emptyIcon: { width: 62, height: 62, backgroundColor: colors.primarySubtle, borderRadius: 22, alignItems: 'center', justifyContent: 'center' }, emptyTitle: { marginTop: 16, fontWeight: '700', color: colors.textPrimary, fontSize: 16 }, emptyText: { marginTop: 7, color: colors.textSecondary, fontSize: 13, textAlign: 'center', lineHeight: 19 } });
