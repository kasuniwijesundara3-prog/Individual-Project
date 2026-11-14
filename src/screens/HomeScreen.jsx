import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const { products } = useProducts();
  const openProduct = (id) => navigation.navigate('ProductDetails', { productId: id });
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <View><Text style={styles.eyebrow}>YOUR SKINCARE COMPANION</Text><Text style={styles.brand}>GlowUp<Text style={styles.dot}>.</Text></Text></View>
          <View style={styles.avatar}><Ionicons name="person-outline" size={21} color={colors.primaryDark} /></View>
        </View>
        <View style={styles.hero}>
          <View style={styles.heroText}><Text style={styles.heroKicker}>A little care, every day</Text><Text style={styles.heroTitle}>Good skin days{ '\n' }start here.</Text><Text style={styles.heroBody}>Build a routine that feels right for your skin.</Text>
            <TouchableOpacity style={styles.heroButton} onPress={() => navigation.navigate('Routine')}><Text style={styles.heroButtonText}>Explore my routine</Text><Ionicons name="arrow-forward" size={16} color={colors.surface} /></TouchableOpacity>
          </View><View style={styles.heroOrb}><Ionicons name="flower-outline" size={62} color={colors.primary} /><View style={styles.orbDot} /></View>
        </View>
        <View style={styles.tip}><View style={styles.tipIcon}><Ionicons name="sunny-outline" size={20} color="#C48121" /></View><View style={{ flex: 1 }}><Text style={styles.tipTitle}>Today's skin note</Text><Text style={styles.tipBody}>SPF is your best everyday glow essential.</Text></View><Ionicons name="chevron-forward" size={18} color={colors.textMuted} /></View>
        <TouchableOpacity style={styles.quizCard} onPress={() => navigation.navigate('SkinQuiz')}><View style={styles.quizIcon}><Ionicons name="sparkles-outline" size={21} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={styles.quizTitle}>Find your skin type</Text><Text style={styles.quizBody}>Take a quick quiz for a more personal routine.</Text></View><Ionicons name="arrow-forward-circle" size={25} color={colors.primary} /></TouchableOpacity>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Shop by category</Text><TouchableOpacity onPress={() => navigation.navigate('Discover')}><Text style={styles.link}>See all</Text></TouchableOpacity></View>
        <View style={styles.categories}>{[['water-outline','Cleanser'],['flower-outline','Moisturizer'],['sparkles-outline','Serum'],['sunny-outline','Sunscreen']].map(([icon, label]) => <TouchableOpacity key={label} style={styles.category} onPress={() => navigation.navigate('Discover', { category: label })}><Ionicons name={icon} size={20} color={colors.primary} /><Text style={styles.categoryLabel}>{label}</Text></TouchableOpacity>)}</View>
        <View style={styles.sectionHeader}><View><Text style={styles.sectionTitle}>Picked for your glow</Text><Text style={styles.sectionSub}>Everyday essentials, thoughtfully chosen</Text></View><TouchableOpacity onPress={() => navigation.navigate('Discover')}><Text style={styles.link}>View all</Text></TouchableOpacity></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productRow}>{products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} onPress={() => openProduct(p.id)} />)}</ScrollView>
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background }, content: { paddingHorizontal: 20, paddingBottom: 20 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }, eyebrow: { color: colors.textMuted, fontSize: 9, letterSpacing: 1.7, fontWeight: '700' }, brand: { color: colors.brandDeep, fontSize: 27, fontWeight: '800', letterSpacing: -1 }, dot: { color: colors.primary }, avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.borderLight },
  hero: { minHeight: 218, marginTop: 12, padding: 20, borderRadius: 24, backgroundColor: '#FCE7ED', flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }, heroText: { flex: 1, zIndex: 1 }, heroKicker: { color: colors.primaryDark, fontSize: 12, fontWeight: '600' }, heroTitle: { marginTop: 7, color: colors.brandDeep, fontSize: 29, lineHeight: 33, fontWeight: '800', letterSpacing: -0.7 }, heroBody: { maxWidth: 210, marginTop: 7, color: colors.textSecondary, fontSize: 12, lineHeight: 18 }, heroButton: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 14, backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20 }, heroButtonText: { color: colors.surface, fontSize: 11, fontWeight: '700' }, heroOrb: { position: 'absolute', right: -15, width: 145, height: 145, borderRadius: 73, backgroundColor: '#F8D4DF', alignItems: 'center', justifyContent: 'center' }, orbDot: { position: 'absolute', width: 18, height: 18, borderRadius: 9, backgroundColor: '#ECA6BD', top: 18, left: 20 },
  tip: { flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 18, padding: 13, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.borderLight }, tipIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: '#FFF3DF', alignItems: 'center', justifyContent: 'center' }, tipTitle: { fontSize: 12, color: colors.textPrimary, fontWeight: '700' }, tipBody: { marginTop: 3, fontSize: 11, color: colors.textSecondary }, quizCard: { flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 10, padding: 13, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.borderLight }, quizIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.primarySubtle, alignItems: 'center', justifyContent: 'center' }, quizTitle: { color: colors.textPrimary, fontSize: 12, fontWeight: '700' }, quizBody: { marginTop: 3, color: colors.textSecondary, fontSize: 11 },
  sectionHeader: { marginTop: 24, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.textPrimary }, sectionSub: { marginTop: 4, fontSize: 11, color: colors.textSecondary }, link: { fontSize: 12, fontWeight: '700', color: colors.primary }, categories: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 }, category: { flex: 1, height: 78, backgroundColor: colors.surface, borderRadius: 15, alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1, borderColor: colors.borderLight }, categoryLabel: { fontSize: 10, color: colors.textPrimary, fontWeight: '600' }, productRow: { paddingRight: 16 }, bottomSpace: { height: 12 },
});
