import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProducts } from '../context/ProductsContext';
import { KEYS, saveData } from '../services/storage';
import { colors } from '../theme/colors';

const skinTypes = [
  { title: 'Oily', detail: 'Shiny through the day, especially around the T-zone.' },
  { title: 'Dry', detail: 'Often feels tight, rough, or flaky.' },
  { title: 'Combination', detail: 'Oily in some areas and dry or balanced in others.' },
  { title: 'Sensitive', detail: 'Can react easily with redness, stinging, or itching.' },
];
const concerns = ['Breakouts', 'Dryness', 'Uneven tone', 'Sensitivity', 'Fine lines', 'No main concern'];

export default function SkinQuizScreen({ navigation }) {
  const { products } = useProducts();
  const [step, setStep] = useState(0);
  const [skinType, setSkinType] = useState(null);
  const [concern, setConcern] = useState(null);
  const [result, setResult] = useState(false);
  const finish = async () => { await saveData(KEYS.SKIN_TYPE, skinType); setResult(true); };
  const recommendations = products.filter((p) => (p.skinTypes || []).includes(skinType)).slice(0, 4);
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {result ? <>
          <View style={styles.resultIcon}><Ionicons name="checkmark" size={34} color={colors.primary} /></View>
          <Text style={styles.kicker}>YOUR SKIN PROFILE</Text><Text style={styles.title}>You have {skinType.toLowerCase()} skin</Text>
          <Text style={styles.body}>Your main concern is {concern.toLowerCase()}. Keep your routine gentle and introduce new products one at a time.</Text>
          <Text style={styles.sectionTitle}>A few products to explore</Text>
          {recommendations.map((p) => <TouchableOpacity key={p.id} style={styles.product} onPress={() => navigation.navigate('ProductDetails', { productId: p.id })}><View style={styles.productIcon}><Ionicons name="sparkles-outline" size={19} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={styles.productName}>{p.name}</Text><Text style={styles.productBrand}>{p.brand} · {p.category}</Text></View><Ionicons name="chevron-forward" size={18} color={colors.textMuted} /></TouchableOpacity>)}
          <TouchableOpacity style={styles.primary} onPress={() => navigation.navigate('Main', { screen: 'Routine' })}><Text style={styles.primaryText}>Build my routine</Text><Ionicons name="arrow-forward" size={17} color={colors.surface} /></TouchableOpacity>
          <TouchableOpacity style={styles.restart} onPress={() => { setResult(false); setStep(0); setSkinType(null); setConcern(null); }}><Text style={styles.restartText}>Retake quiz</Text></TouchableOpacity>
        </> : <>
          <Text style={styles.kicker}>A QUICK CHECK IN</Text><Text style={styles.title}>{step === 0 ? 'What is your skin type?' : 'What would you like help with?'}</Text>
          <Text style={styles.body}>{step === 0 ? 'Choose the description that feels most like your skin.' : 'Pick the concern you would most like your routine to support.'}</Text>
          <View style={styles.progress}><View style={[styles.progressFill, { width: step === 0 ? '50%' : '100%' }]} /></View>
          {(step === 0 ? skinTypes : concerns.map((title) => ({ title }))).map((item) => {
            const selected = step === 0 ? skinType === item.title : concern === item.title;
            return <TouchableOpacity key={item.title} style={[styles.option, selected && styles.optionSelected]} onPress={() => step === 0 ? setSkinType(item.title) : setConcern(item.title)}><View style={[styles.radio, selected && styles.radioSelected]}>{selected && <View style={styles.radioDot} />}</View><View style={{ flex: 1 }}><Text style={[styles.optionTitle, selected && styles.optionTitleSelected]}>{item.title}</Text>{item.detail && <Text style={styles.optionDetail}>{item.detail}</Text>}</View></TouchableOpacity>;
          })}
          <View style={styles.actions}>{step === 1 && <TouchableOpacity style={styles.back} onPress={() => setStep(0)}><Text style={styles.backText}>Back</Text></TouchableOpacity>}<TouchableOpacity disabled={step === 0 ? !skinType : !concern} style={[styles.primary, (step === 0 ? !skinType : !concern) && styles.disabled]} onPress={() => step === 0 ? setStep(1) : finish()}><Text style={styles.primaryText}>{step === 0 ? 'Next' : 'See my results'}</Text><Ionicons name="arrow-forward" size={17} color={colors.surface} /></TouchableOpacity></View>
          <Text style={styles.disclaimer}>This quick quiz is for general skincare guidance and is not a medical diagnosis.</Text>
        </>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, content: { padding: 22, paddingBottom: 36 }, kicker: { marginTop: 8, color: colors.primary, fontSize: 10, letterSpacing: 1.5, fontWeight: '700' }, title: { marginTop: 8, color: colors.brandDeep, fontSize: 26, lineHeight: 33, fontWeight: '800' }, body: { marginTop: 8, color: colors.textSecondary, fontSize: 13, lineHeight: 20 }, progress: { height: 5, marginTop: 24, marginBottom: 18, backgroundColor: colors.borderLight, borderRadius: 3 }, progressFill: { height: 5, backgroundColor: colors.primary, borderRadius: 3 }, option: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, marginBottom: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderLight, borderRadius: 15 }, optionSelected: { backgroundColor: colors.primarySubtle, borderColor: colors.primary }, radio: { width: 21, height: 21, borderWidth: 1.5, borderColor: colors.textMuted, borderRadius: 11, alignItems: 'center', justifyContent: 'center' }, radioSelected: { borderColor: colors.primary }, radioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: colors.primary }, optionTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' }, optionTitleSelected: { color: colors.primaryDark }, optionDetail: { marginTop: 3, color: colors.textSecondary, fontSize: 11, lineHeight: 16 }, primary: { flex: 1, minHeight: 50, marginTop: 20, paddingHorizontal: 18, borderRadius: 25, backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 }, actions: { flexDirection: 'row', gap: 10, marginTop: 10 }, primaryText: { color: colors.surface, fontSize: 13, fontWeight: '700' }, disabled: { opacity: 0.45 }, back: { minHeight: 50, marginTop: 20, paddingHorizontal: 23, borderRadius: 25, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }, backText: { color: colors.primaryDark, fontSize: 13, fontWeight: '700' }, disclaimer: { marginTop: 20, textAlign: 'center', color: colors.textMuted, fontSize: 10, lineHeight: 15 }, resultIcon: { marginTop: 24, width: 68, height: 68, borderRadius: 24, backgroundColor: colors.primarySubtle, alignItems: 'center', justifyContent: 'center' }, sectionTitle: { marginTop: 24, marginBottom: 11, color: colors.textPrimary, fontSize: 15, fontWeight: '800' }, product: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, marginBottom: 8, backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.borderLight }, productIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.primarySubtle, alignItems: 'center', justifyContent: 'center' }, productName: { color: colors.textPrimary, fontSize: 12, fontWeight: '700' }, productBrand: { marginTop: 3, color: colors.textSecondary, fontSize: 10 }, restart: { alignItems: 'center', padding: 14 }, restartText: { color: colors.primaryDark, fontWeight: '700', fontSize: 12 } });
