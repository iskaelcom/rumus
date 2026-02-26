import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import ShapeIllustration from './ShapeIllustration';
import ShapeCalculator from './ShapeCalculator';
import renderSubscriptText from './renderSubscriptText';

const FONT_UI = Platform.select({
  web: 'Geist',
  ios: 'System',
  android: 'sans-serif',
  default: 'sans-serif',
});

export default function FormulaCard({ item, section, mobileMode = false, onBack }) {
  return (
    <View style={styles.card}>
      {mobileMode ? (
        <View style={styles.mobileHead}>
          <Pressable onPress={onBack} style={styles.mobileBackButton}>
            <Text style={styles.mobileBackText}>Kembali</Text>
          </Pressable>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={[styles.sectionText, { color: section.theme.primary }]}>
            {section.title}
          </Text>
        </View>
      ) : (
        <>
          <View style={[styles.badge, { backgroundColor: section.theme.soft }]}>
            <Text style={[styles.badgeText, { color: section.theme.primary }]}>
              {section.title}
            </Text>
          </View>
          <Text style={styles.title}>{item.name}</Text>
        </>
      )}
      <Text style={styles.tagline}>{item.tagline}</Text>
      <Text style={styles.illustrationTitle}>Ilustrasi Bangun</Text>
      <ShapeIllustration shapeId={item.id} tintColor={section.theme.primary} />

      <View style={styles.formulaGroup}>
        {item.formulas.map((formula) => (
          <View key={formula.label} style={styles.formulaRow}>
            <Text style={styles.formulaLabel}>{formula.label}</Text>
            <Text style={styles.formulaValue}>
              {renderSubscriptText(formula.value, styles.subscriptText)}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.calculatorTitle}>Kalkulator</Text>
      <ShapeCalculator shapeId={item.id} accentColor={section.theme.primary} />

      <Text style={styles.variablesTitle}>Keterangan Variabel</Text>
      <View style={styles.variableWrap}>
        {item.variables.map((variable) => (
          <View key={variable} style={styles.variableChip}>
            <Text style={styles.variableText}>
              {renderSubscriptText(variable, styles.subscriptText)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  mobileHead: {
    marginBottom: 10,
  },
  mobileBackButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },
  mobileBackText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    fontFamily: FONT_UI,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
    fontFamily: FONT_UI,
  },
  sectionText: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    fontWeight: '700',
    marginTop: -4,
    fontFamily: FONT_UI,
  },
  tagline: {
    fontSize: 15,
    color: '#334155',
    marginBottom: 18,
    lineHeight: 22,
    fontFamily: FONT_UI,
  },
  illustrationTitle: {
    fontSize: 13,
    color: '#64748b',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: FONT_UI,
  },
  formulaGroup: {
    borderRadius: 14,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    gap: 10,
  },
  formulaRow: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
  },
  formulaLabel: {
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#64748b',
    marginBottom: 4,
    fontFamily: FONT_UI,
  },
  formulaValue: {
    fontSize: 20,
    color: '#0f172a',
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  subscriptText: {
    fontSize: 11,
    lineHeight: 13,
    transform: [{ translateY: 2 }],
  },
  calculatorTitle: {
    marginTop: 16,
    marginBottom: 2,
    fontSize: 13,
    color: '#64748b',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  variablesTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 13,
    color: '#64748b',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  variableWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  variableChip: {
    backgroundColor: '#eef2ff',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#dbeafe',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  variableText: {
    fontSize: 13,
    color: '#1e3a8a',
    fontFamily: FONT_UI,
  },
});
