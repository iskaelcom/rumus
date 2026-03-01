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

const COPY = {
  id: {
    back: 'Kembali',
    illustration: 'Ilustrasi',
    calculator: 'Kalkulator',
    variables: 'Keterangan Variabel',
    addBookmark: 'Simpan Bookmark',
    removeBookmark: 'Hapus Bookmark',
  },
  en: {
    back: 'Back',
    illustration: 'Illustration',
    calculator: 'Calculator',
    variables: 'Variable Notes',
    addBookmark: 'Add Bookmark',
    removeBookmark: 'Remove Bookmark',
  },
};

export default function FormulaCard({
  item,
  section,
  locale = 'id',
  mobileMode = false,
  onBack,
  isBookmarked = false,
  onToggleBookmark,
}) {
  const copy = COPY[locale] || COPY.id;

  return (
    <View style={styles.card}>
      {mobileMode ? (
        <View style={styles.mobileHead}>
          <Pressable onPress={onBack} style={styles.mobileBackButton}>
            <Text style={styles.mobileBackText}>{copy.back}</Text>
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
      {typeof onToggleBookmark === 'function' && (
        <Pressable
          onPress={() => onToggleBookmark(item.id)}
          style={[
            styles.bookmarkButton,
            {
              borderColor: section.theme.primary,
              backgroundColor: isBookmarked ? section.theme.soft : '#ffffff',
            },
          ]}
        >
          <Text style={[styles.bookmarkButtonText, { color: section.theme.primary }]}>
            {isBookmarked ? `★ ${copy.removeBookmark}` : `☆ ${copy.addBookmark}`}
          </Text>
        </Pressable>
      )}
      <Text style={styles.tagline}>{item.tagline}</Text>
      <Text style={styles.illustrationTitle}>{copy.illustration}</Text>
      <ShapeIllustration shapeId={item.id} tintColor={section.theme.primary} locale={locale} />

      <View style={styles.formulaGroup}>
        {item.formulas.map((formula) => (
          <View key={formula.label} style={[styles.formulaRow, { borderLeftColor: section.theme.primary }]}>
            <Text style={styles.formulaLabel}>{formula.label}</Text>
            <Text style={styles.formulaValue}>
              {renderSubscriptText(formula.value, styles.subscriptText)}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.calculatorTitle}>{copy.calculator}</Text>
      <ShapeCalculator shapeId={item.id} accentColor={section.theme.primary} locale={locale} />

      <Text style={styles.variablesTitle}>{copy.variables}</Text>
      <View style={styles.variableWrap}>
        {item.variables.map((variable) => (
          <View key={variable} style={[styles.variableChip, { backgroundColor: section.theme.soft, borderColor: section.theme.primary }]}>
            <Text style={[styles.variableText, { color: section.theme.primary }]}>
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
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: '#DDE5F8',
    shadowColor: '#312E81',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  mobileHead: {
    marginBottom: 12,
  },
  mobileBackButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#DDE5F8',
    backgroundColor: '#F5F7FC',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 14,
  },
  mobileBackText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_UI,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontFamily: FONT_UI,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
    fontFamily: FONT_UI,
  },
  sectionText: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontWeight: '700',
    marginBottom: 2,
    fontFamily: FONT_UI,
  },
  bookmarkButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  bookmarkButtonText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_UI,
  },
  tagline: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 16,
    lineHeight: 22,
    fontFamily: FONT_UI,
  },
  illustrationTitle: {
    fontSize: 11,
    color: '#94a3b8',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: FONT_UI,
  },
  formulaGroup: {
    marginTop: 8,
    gap: 8,
  },
  formulaRow: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#e2e8f0',
    padding: 12,
    paddingLeft: 14,
  },
  formulaLabel: {
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#64748b',
    marginBottom: 4,
    fontFamily: FONT_UI,
  },
  formulaValue: {
    fontSize: 22,
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
    marginTop: 20,
    marginBottom: 4,
    fontSize: 11,
    color: '#94a3b8',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  variablesTitle: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 11,
    color: '#94a3b8',
    letterSpacing: 0.6,
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
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  variableText: {
    fontSize: 12,
    fontFamily: FONT_UI,
  },
});
