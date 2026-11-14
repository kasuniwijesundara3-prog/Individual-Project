import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { colors } from '../theme/colors';

const filters = ['All', 'Cleanser', 'Moisturizer', 'Serum', 'Sunscreen'];
export default function DiscoverScreen({ navigation, route }) {
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const category = route.params?.category ?? 'All';
  const shown = useMemo(() => products.filter((p) => (category === 'All' || p.category === category) && `${p.name} ${p.brand} ${(Array.isArray(p.ingredients) ? p.ingredients : []).join(' ')}`.toLowerCase().includes(query.toLowerCase())), [products, category, query]);
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}><Text style={styles.kicker}>FIND YOUR FAVORITES</Text><Text style={styles.title}>Discover</Text><Text style={styles.subtitle}>Skincare picked for your everyday ritual.</Text></View>
      <View style={styles.search}><Ionicons name="search-outline" size={19} color={colors.textMuted} /><TextInput value={query} onChangeText={setQuery} placeholder="Search products or ingredients" placeholderTextColor={colors.textMuted} style={styles.input} returnKeyType="search" /></View>
      <ScrollView horizontal style={styles.filterBar} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{filters.map((item) => <TouchableOpacity key={item} onPress={() => navigation.setParams({ category: item })} style={[styles.filter, category === item && styles.filterActive]} accessibilityRole="button" accessibilityState={{ selected: category === item }}><Text style={[styles.filterText, category === item && styles.filterTextActive]}>{item}</Text></TouchableOpacity>)}</ScrollView>
      <FlatList data={shown} keyExtractor={(item) => item.id} numColumns={2} contentContainerStyle={styles.grid} columnWrapperStyle={styles.row} showsVerticalScrollIndicator={false} renderItem={({ item }) => <ProductCard product={item} cardStyle={styles.gridCard} onPress={() => navigation.navigate('ProductDetails', { productId: item.id })} />} ListEmptyComponent={<View style={styles.empty}><Ionicons name="search-outline" size={30} color={colors.textMuted} /><Text style={styles.emptyText}>No products found. Try another search.</Text></View>} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, header: { paddingHorizontal: 20, paddingTop: 12 }, kicker: { color: colors.primary, fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }, title: { marginTop: 5, color: colors.brandDeep, fontWeight: '800', fontSize: 30 }, subtitle: { marginTop: 4, fontSize: 13, color: colors.textSecondary }, search: { flexDirection: 'row', alignItems: 'center', gap: 9, marginHorizontal: 20, marginTop: 18, paddingHorizontal: 14, height: 48, backgroundColor: colors.surface, borderRadius: 14, borderColor: colors.borderLight, borderWidth: 1 }, input: { flex: 1, fontSize: 13, color: colors.textPrimary }, filterBar: { flexGrow: 0 }, filters: { paddingHorizontal: 20, paddingVertical: 15, gap: 8 }, filter: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderLight }, filterActive: { backgroundColor: colors.primary, borderColor: colors.primary }, filterText: { color: colors.textSecondary, fontSize: 11, fontWeight: '600' }, filterTextActive: { color: colors.surface }, grid: { paddingHorizontal: 20, paddingBottom: 24 }, gridCard: { width: '48%', marginRight: 0 }, row: { justifyContent: 'space-between', marginBottom: 12 }, empty: { alignItems: 'center', padding: 40, gap: 10 }, emptyText: { fontSize: 13, color: colors.textSecondary, textAlign: 'center' } });
