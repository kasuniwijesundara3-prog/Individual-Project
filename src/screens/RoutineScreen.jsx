import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProducts } from '../context/ProductsContext';
import { KEYS, loadData, saveData } from '../services/storage';
import { colors } from '../theme/colors';

const routineSteps = { Morning: ['Cleanser', 'Serum', 'Moisturizer', 'Sunscreen'], Evening: ['Cleanser', 'Serum', 'Moisturizer'] };
export default function RoutineScreen({ navigation }) {
  const { products } = useProducts();
  const [routine, setRoutine] = useState({ Morning: {}, Evening: {} });
  const [period, setPeriod] = useState('Morning');
  const [selectingStep, setSelectingStep] = useState(null);
  useEffect(() => {
    loadData(KEYS.ROUTINE, null).then((saved) => setRoutine({
      Morning: saved?.Morning && typeof saved.Morning === 'object' ? saved.Morning : {},
      Evening: saved?.Evening && typeof saved.Evening === 'object' ? saved.Evening : {},
    }));
  }, []);
  const choose = (product) => {
    if (!selectingStep) return;
    const updated = { ...routine, [period]: { ...routine[period], [selectingStep]: product.id } };
    setRoutine(updated); saveData(KEYS.ROUTINE, updated);
    setSelectingStep(null);
  };
  const clear = (step) => {
    const updated = { ...routine, [period]: { ...routine[period] } };
    delete updated[period][step]; setRoutine(updated); saveData(KEYS.ROUTINE, updated);
  };
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>YOUR DAILY RITUAL</Text><Text style={styles.title}>My routine</Text><Text style={styles.subtitle}>Keep it simple, keep it consistent.</Text>
        <View style={styles.switcher}>{['Morning', 'Evening'].map((item) => <TouchableOpacity key={item} style={[styles.switch, period === item && styles.switchActive]} onPress={() => setPeriod(item)}><Ionicons name={item === 'Morning' ? 'sunny-outline' : 'moon-outline'} size={16} color={period === item ? colors.surface : colors.textSecondary} /><Text style={[styles.switchText, period === item && styles.switchTextActive]}>{item}</Text></TouchableOpacity>)}</View>
        {routineSteps[period].map((step, index) => {
          const product = products.find((p) => p.id === routine[period]?.[step]);
          return <View key={step} style={styles.step}><View style={styles.stepNumber}><Text style={styles.number}>{index + 1}</Text></View><View style={styles.stepInfo}><Text style={styles.stepLabel}>{step}</Text><Text style={styles.stepProduct}>{product ? product.name : 'Add a product for this step'}</Text></View>{product ? <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}><Ionicons name="open-outline" size={19} color={colors.primary} /></TouchableOpacity> : <TouchableOpacity style={styles.add} onPress={() => setSelectingStep(step)}><Ionicons name="add" size={17} color={colors.primary} /><Text style={styles.addText}>Add</Text></TouchableOpacity>}{product && <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => clear(step)}><Ionicons name="close-circle-outline" size={20} color={colors.textMuted} /></TouchableOpacity>}</View>;
        })}
        <View style={styles.hint}><Ionicons name="sparkles-outline" size={19} color={colors.primary} /><Text style={styles.hintText}>A good routine is one you can stick with. Add one step at a time.</Text></View>
      </ScrollView>
      <Modal visible={!!selectingStep} transparent animationType="slide" onRequestClose={() => setSelectingStep(null)}>
        <View style={styles.modalBackdrop}><View style={styles.modalCard}><View style={styles.modalHeader}><View><Text style={styles.modalTitle}>Choose {selectingStep?.toLowerCase()}</Text><Text style={styles.modalSubtitle}>Pick from your product list</Text></View><TouchableOpacity onPress={() => setSelectingStep(null)}><Ionicons name="close-circle" size={25} color={colors.textMuted} /></TouchableOpacity></View><ScrollView>{products.filter((p) => p.category === selectingStep).map((p) => <TouchableOpacity key={p.id} style={styles.choice} onPress={() => choose(p)}><View style={styles.choiceIcon}><Ionicons name="sparkles-outline" size={18} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={styles.choiceName}>{p.name}</Text><Text style={styles.choiceMeta}>{p.brand} · LKR {Number(p.price).toLocaleString()}</Text></View><Ionicons name="chevron-forward" size={17} color={colors.textMuted} /></TouchableOpacity>)}</ScrollView></View></View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, content: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 30 }, kicker: { color: colors.primary, fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }, title: { marginTop: 5, color: colors.brandDeep, fontWeight: '800', fontSize: 29 }, subtitle: { marginTop: 4, fontSize: 13, color: colors.textSecondary }, switcher: { flexDirection: 'row', gap: 10, marginVertical: 22 }, switch: { flex: 1, height: 44, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderLight, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 }, switchActive: { backgroundColor: colors.primary, borderColor: colors.primary }, switchText: { fontSize: 13, fontWeight: '700', color: colors.textSecondary }, switchTextActive: { color: colors.surface }, step: { minHeight: 74, flexDirection: 'row', alignItems: 'center', padding: 13, marginBottom: 10, borderRadius: 17, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderLight }, stepNumber: { width: 34, height: 34, borderRadius: 12, backgroundColor: colors.primarySubtle, alignItems: 'center', justifyContent: 'center' }, number: { color: colors.primaryDark, fontSize: 13, fontWeight: '800' }, stepInfo: { flex: 1, marginLeft: 11 }, stepLabel: { fontSize: 13, color: colors.textPrimary, fontWeight: '700' }, stepProduct: { marginTop: 4, fontSize: 11, color: colors.textSecondary }, add: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 16, backgroundColor: colors.primarySubtle }, addText: { fontSize: 11, fontWeight: '700', color: colors.primary }, hint: { flexDirection: 'row', gap: 10, padding: 14, marginTop: 10, borderRadius: 15, backgroundColor: '#FCE7ED' }, hintText: { flex: 1, color: colors.textSecondary, fontSize: 12, lineHeight: 18 }, modalBackdrop: { flex: 1, backgroundColor: 'rgba(34, 14, 25, 0.35)', justifyContent: 'flex-end' }, modalCard: { maxHeight: '75%', backgroundColor: colors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }, modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }, modalTitle: { fontSize: 19, fontWeight: '800', color: colors.brandDeep }, modalSubtitle: { marginTop: 3, fontSize: 12, color: colors.textSecondary }, choice: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, marginBottom: 8, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderLight }, choiceIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.primarySubtle, alignItems: 'center', justifyContent: 'center' }, choiceName: { fontSize: 12, fontWeight: '700', color: colors.textPrimary }, choiceMeta: { marginTop: 3, fontSize: 10, color: colors.textSecondary } });
