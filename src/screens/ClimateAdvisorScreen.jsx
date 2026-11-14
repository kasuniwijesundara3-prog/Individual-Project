import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import climateData from '../data/climate.json';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { colors } from '../theme/colors';

function weatherIcon(condition) {
  const text = condition.toLowerCase();
  if (text.includes('mist') || text.includes('cloud')) return 'cloud-outline';
  if (text.includes('breezy')) return 'partly-sunny-outline';
  return 'sunny-outline';
}

export default function ClimateAdvisorScreen({ navigation }) {
  const cities = Array.isArray(climateData) ? climateData : [];
  const [cityName, setCityName] = useState(cities[0]?.city || '');
  const { products } = useProducts();
  const city = cities.find((item) => item.city === cityName) || cities[0];
  const recommendations = useMemo(() => {
    if (!city) return [];
    const focus = Array.isArray(city.focus) ? city.focus : [];
    return products.filter((product) => focus.includes(product.category)).slice(0, 6);
  }, [city, products]);

  if (!city) {
    return <SafeAreaView style={styles.safe}><View style={styles.empty}><Text style={styles.emptyText}>Climate advice is unavailable right now.</Text></View></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>CARE THAT FITS YOUR DAY</Text>
        <Text style={styles.title}>Climate advisor</Text>
        <Text style={styles.subtitle}>Local weather can change what your skin needs.</Text>

        <View style={styles.cityPicker}>
          <View style={styles.cityHeading}><Ionicons name="location-outline" size={18} color={colors.primary} /><Text style={styles.cityLabel}>Choose your city</Text></View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cityList}>
            {cities.map((item) => <TouchableOpacity key={item.city} onPress={() => setCityName(item.city)} style={[styles.cityChip, cityName === item.city && styles.cityChipSelected]}><Text style={[styles.cityText, cityName === item.city && styles.cityTextSelected]}>{item.city}</Text></TouchableOpacity>)}
          </ScrollView>
        </View>

        <View style={styles.weatherCard}>
          <View style={styles.weatherTop}><View><Text style={styles.location}>{city.city}, Sri Lanka</Text><Text style={styles.condition}>{city.condition}</Text></View><Ionicons name={weatherIcon(city.condition)} size={48} color="#E7A43B" /></View>
          <View style={styles.weatherBottom}><Text style={styles.temperature}>{city.temp}°</Text><View style={styles.weatherDivider} /><View style={styles.humidity}><Ionicons name="water-outline" size={17} color="#5B8CA5" /><Text style={styles.humidityText}>{city.humidity}% humidity</Text></View></View>
        </View>

        <View style={styles.sectionHeading}><View style={styles.sectionIcon}><Ionicons name="sparkles-outline" size={18} color={colors.primary} /></View><Text style={styles.sectionTitle}>Skin tips for today</Text></View>
        {(Array.isArray(city.advice) ? city.advice : []).map((tip, index) => <View key={`${city.city}-${index}`} style={styles.tipRow}><View style={styles.check}><Ionicons name="checkmark" size={14} color={colors.primary} /></View><Text style={styles.tipText}>{tip}</Text></View>)}

        <View style={styles.sectionHeading}><View style={[styles.sectionIcon, styles.focusIcon]}><Ionicons name="leaf-outline" size={18} color="#548C70" /></View><View style={{ flex: 1 }}><Text style={styles.sectionTitle}>Good picks for this weather</Text><Text style={styles.sectionSubtitle}>Based on today’s climate in {city.city}</Text></View></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.products}>
          {recommendations.map((product) => <ProductCard key={product.id} product={product} onPress={() => navigation.navigate('ProductDetails', { productId: product.id })} />)}
        </ScrollView>
        {recommendations.length === 0 && <Text style={styles.emptyText}>No matching products available yet.</Text>}
        <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('Main', { screen: 'Discover' })}><Text style={styles.browseText}>Browse all skincare</Text><Ionicons name="arrow-forward" size={16} color={colors.primary} /></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background }, content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 28 },
  kicker: { color: colors.primary, fontSize: 10, letterSpacing: 1.5, fontWeight: '700' }, title: { marginTop: 5, color: colors.brandDeep, fontWeight: '800', fontSize: 29 }, subtitle: { marginTop: 4, fontSize: 13, lineHeight: 19, color: colors.textSecondary },
  cityPicker: { marginTop: 20, padding: 13, borderRadius: 17, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderLight }, cityHeading: { flexDirection: 'row', alignItems: 'center', gap: 7 }, cityLabel: { color: colors.textPrimary, fontSize: 12, fontWeight: '700' }, cityList: { gap: 8, paddingTop: 11 }, cityChip: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.background, borderRadius: 16, borderWidth: 1, borderColor: colors.borderLight }, cityChipSelected: { backgroundColor: colors.primary, borderColor: colors.primary }, cityText: { color: colors.textSecondary, fontSize: 11, fontWeight: '600' }, cityTextSelected: { color: colors.surface },
  weatherCard: { marginTop: 14, padding: 18, borderRadius: 21, backgroundColor: '#FFF1D9', borderWidth: 1, borderColor: '#F5E4C7' }, weatherTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, location: { color: colors.brandDeep, fontSize: 16, fontWeight: '800' }, condition: { marginTop: 3, color: colors.textSecondary, fontSize: 12 }, weatherBottom: { flexDirection: 'row', alignItems: 'center', marginTop: 7 }, temperature: { color: colors.brandDeep, fontSize: 42, lineHeight: 48, fontWeight: '800' }, weatherDivider: { height: 34, width: 1, marginHorizontal: 17, backgroundColor: '#E7D8BD' }, humidity: { flexDirection: 'row', alignItems: 'center', gap: 6 }, humidityText: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 23, marginBottom: 12 }, sectionIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySubtle }, focusIcon: { backgroundColor: '#E9F3EC' }, sectionTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '800' }, sectionSubtitle: { marginTop: 3, color: colors.textSecondary, fontSize: 10 }, tipRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 8, backgroundColor: colors.surface, borderRadius: 13, borderWidth: 1, borderColor: colors.borderLight }, check: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primarySubtle, alignItems: 'center', justifyContent: 'center' }, tipText: { flex: 1, color: colors.textSecondary, fontSize: 12, lineHeight: 18 }, products: { paddingRight: 20 }, browseButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 7, marginTop: 15, padding: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: 20 }, browseText: { color: colors.primary, fontSize: 12, fontWeight: '700' }, empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 }, emptyText: { color: colors.textSecondary, fontSize: 13, textAlign: 'center' },
});
