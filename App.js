import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FormulaCard from './components/FormulaCard';
import ShapeIllustration from './components/ShapeIllustration';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, formulaSectionsByLocale } from './data/formulas';

const STORAGE_KEY = 'rumus:last-selection:v1';
const DEFAULT_SECTIONS = formulaSectionsByLocale[DEFAULT_LOCALE];

const UI_COPY = {
  id: {
    heroEyebrow: 'Belajar Matematika SD',
    heroTitle: 'Pusat Rumus Matematika SD',
    heroSubtitle: 'Pilih kategori di tab, lalu pilih materi yang ingin dipelajari.',
    statCategory: 'Kategori',
    statItems: 'Materi',
    language: 'Bahasa',
    languageId: 'Indonesia',
    languageEn: 'English',
    searchPlaceholder: 'Cari bangun atau rumus...',
    detectedCategory: (title) => `Terdeteksi: ${title}`,
    noSearchResult: 'Tidak ada hasil pencarian',
    resultFound: (count) => `${count} hasil ditemukan`,
    viewFormula: 'Lihat rumus',
    noResultTitle: 'Tidak ada hasil',
    noResultBody: 'Coba kata kunci lain, misalnya "luas", "segitiga", atau "volume".',
    emptyTitle: 'Materi tidak ditemukan',
    emptyBody: 'Ubah kata kunci pencarian untuk melihat rumus dan gambar.',
  },
  en: {
    heroEyebrow: 'Elementary Math Learning',
    heroTitle: 'Elementary Math Formula Center',
    heroSubtitle: 'Pick a category tab, then choose the topic you want to study.',
    statCategory: 'Categories',
    statItems: 'Topics',
    language: 'Language',
    languageId: 'Indonesia',
    languageEn: 'English',
    searchPlaceholder: 'Search shapes or formulas...',
    detectedCategory: (title) => `Detected: ${title}`,
    noSearchResult: 'No search results',
    resultFound: (count) => `${count} results found`,
    viewFormula: 'View formula',
    noResultTitle: 'No results',
    noResultBody: 'Try another keyword, for example "area", "triangle", or "volume".',
    emptyTitle: 'Topic not found',
    emptyBody: 'Change the search keyword to see formulas and illustrations.',
  },
};

const matchesSearchKeyword = (item, keyword) => {
  return item.name.toLowerCase().includes(keyword);
};

const FONT_UI = Platform.select({
  web: 'Geist',
  ios: 'System',
  android: 'sans-serif',
  default: 'sans-serif',
});

export default function App() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const isPhone = width < 760;
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const formulaSections = useMemo(
    () => formulaSectionsByLocale[locale] || DEFAULT_SECTIONS,
    [locale]
  );
  const copy = UI_COPY[locale] || UI_COPY[DEFAULT_LOCALE];
  const [activeSectionId, setActiveSectionId] = useState(DEFAULT_SECTIONS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpenId, setMobileOpenId] = useState(null);
  const [isStorageHydrated, setIsStorageHydrated] = useState(Platform.OS !== 'web');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const mobileDetailAnim = useRef(new Animated.Value(0)).current;

  const activeSection = useMemo(
    () => formulaSections.find((section) => section.id === activeSectionId) || formulaSections[0],
    [activeSectionId, formulaSections]
  );

  const [activeShapeId, setActiveShapeId] = useState(DEFAULT_SECTIONS[0].items[0].id);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') {
      return;
    }
    if (document.getElementById('geist-font')) {
      return;
    }
    const fontLink = document.createElement('link');
    fontLink.id = 'geist-font';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;700&display=swap';
    document.head.appendChild(fontLink);
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') {
      setIsStorageHydrated(true);
      return;
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw);
      const storedLocale = SUPPORTED_LOCALES.includes(parsed.locale) ? parsed.locale : DEFAULT_LOCALE;
      const sectionsForLocale = formulaSectionsByLocale[storedLocale] || DEFAULT_SECTIONS;
      const storedSection = sectionsForLocale.find((section) => section.id === parsed.activeSectionId);
      if (!storedSection) {
        setLocale(storedLocale);
        setActiveSectionId(sectionsForLocale[0].id);
        setActiveShapeId(sectionsForLocale[0].items[0].id);
        return;
      }
      const storedShape = storedSection.items.find((item) => item.id === parsed.activeShapeId);
      setLocale(storedLocale);
      setActiveSectionId(storedSection.id);
      setActiveShapeId(storedShape ? storedShape.id : storedSection.items[0].id);
      if (storedShape && parsed.mobileOpenId === storedShape.id) {
        setMobileOpenId(storedShape.id);
      }
    } catch (error) {
      // Ignore broken localStorage payload and continue with defaults.
    } finally {
      setIsStorageHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isStorageHydrated || Platform.OS !== 'web' || typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          locale,
          activeSectionId,
          activeShapeId,
          mobileOpenId,
        })
      );
    } catch (error) {
      // Ignore storage quota or privacy mode errors.
    }
  }, [isStorageHydrated, locale, activeSectionId, activeShapeId, mobileOpenId]);

  const openMobileDetail = (itemId) => {
    setActiveShapeId(itemId);
    setMobileOpenId(itemId);
  };

  const closeMobileDetail = () => {
    Animated.timing(mobileDetailAnim, {
      toValue: 0,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setMobileOpenId(null);
    });
  };

  const keyword = searchQuery.trim().toLowerCase();

  const sectionMatches = useMemo(
    () =>
      formulaSections.map((section) => ({
        id: section.id,
        title: section.title,
        items: keyword
          ? section.items.filter((item) => matchesSearchKeyword(item, keyword))
          : section.items,
      })),
    [keyword, formulaSections]
  );

  const autoSectionId = useMemo(() => {
    if (!keyword) {
      return null;
    }
    const activeEntry = sectionMatches.find((section) => section.id === activeSectionId);
    if (activeEntry?.items.length) {
      return activeSectionId;
    }
    return sectionMatches.find((section) => section.items.length)?.id || null;
  }, [keyword, sectionMatches, activeSectionId]);

  useEffect(() => {
    if (!autoSectionId || autoSectionId === activeSectionId) {
      return;
    }
    setActiveSectionId(autoSectionId);
  }, [autoSectionId, activeSectionId]);

  const filteredItems = useMemo(() => {
    const activeEntry = sectionMatches.find((section) => section.id === activeSectionId);
    return activeEntry?.items || [];
  }, [sectionMatches, activeSectionId]);

  useEffect(() => {
    if (!filteredItems.length) {
      return;
    }
    const stillAvailable = filteredItems.some((item) => item.id === activeShapeId);
    if (!stillAvailable) {
      setActiveShapeId(filteredItems[0].id);
    }
  }, [filteredItems, activeShapeId]);

  useEffect(() => {
    if (!mobileOpenId) {
      return;
    }
    const stillAvailable = filteredItems.some((item) => item.id === mobileOpenId);
    if (!stillAvailable) {
      setMobileOpenId(null);
    }
  }, [filteredItems, mobileOpenId]);

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [activeShapeId, fadeAnim]);

  useEffect(() => {
    if (!isPhone || !mobileOpenId) {
      return;
    }
    mobileDetailAnim.setValue(0);
    Animated.timing(mobileDetailAnim, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isPhone, mobileOpenId, mobileDetailAnim]);

  const activeShape = filteredItems.find((item) => item.id === activeShapeId) || filteredItems[0] || null;
  const mobileOpenShape = filteredItems.find((item) => item.id === mobileOpenId) || null;

  const totalShapes = formulaSections.reduce((acc, section) => acc + section.items.length, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.bgGlowTop} />
        <View style={styles.bgGlowBottom} />

        <View style={[styles.languageRow, styles.languageRowTop]}>
          <View style={styles.languageSwitch}>
            {SUPPORTED_LOCALES.map((lang) => {
              const isActiveLang = lang === locale;
              const label = lang === 'id' ? copy.languageId : copy.languageEn;
              return (
                <Pressable
                  key={lang}
                  onPress={() => setLocale(lang)}
                  style={[styles.languageButton, isActiveLang && styles.languageButtonActive]}
                >
                  <Text style={[styles.languageButtonText, isActiveLang && styles.languageButtonTextActive]}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {!isPhone && (
          <View style={styles.heroCard}>
            <Text style={styles.heroEyebrow}>{copy.heroEyebrow}</Text>
            <Text style={styles.heroTitle}>{copy.heroTitle}</Text>
            <Text style={styles.heroSubtitle}>{copy.heroSubtitle}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statPill}>
                <Text style={styles.statValue}>{formulaSections.length}</Text>
                <Text style={styles.statLabel}>{copy.statCategory}</Text>
              </View>
              <View style={styles.statPill}>
                <Text style={styles.statValue}>{totalShapes}</Text>
                <Text style={styles.statLabel}>{copy.statItems}</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.globalSearchCard}>
          <View style={[styles.searchWrap, styles.searchWrapGlobal]}>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={copy.searchPlaceholder}
              placeholderTextColor="#94a3b8"
              style={styles.searchInput}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>X</Text>
              </Pressable>
            )}
          </View>
          {keyword.length > 0 && (
            <Text style={styles.globalSearchMeta}>
              {filteredItems.length ? copy.detectedCategory(activeSection.title) : copy.noSearchResult}
            </Text>
          )}
        </View>

        <View style={styles.tabBar}>
          {formulaSections.map((section) => {
            const isActive = activeSection.id === section.id;
            return (
              <Pressable
                key={section.id}
                onPress={() => setActiveSectionId(section.id)}
                style={[
                  styles.tabButton,
                  isActive && { backgroundColor: section.theme.primary, borderColor: section.theme.primary },
                ]}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{section.title}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.contentArea, !isPhone && isWide && styles.contentAreaWide]}>
          <View style={[styles.selectorCard, isWide && styles.selectorCardWide, isPhone && styles.selectorCardPhone]}>
            <Text style={styles.selectorTitle}>{activeSection.title}</Text>
            <Text style={styles.selectorSubtitle}>{activeSection.description}</Text>

            <Text style={styles.searchMeta}>{copy.resultFound(filteredItems.length)}</Text>

            <View style={styles.shapeList}>
              {filteredItems.map((item) => {
                const isSelected = isPhone ? item.id === mobileOpenId : item.id === activeShape?.id;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      if (isPhone) {
                        openMobileDetail(item.id);
                        return;
                      }
                      setActiveShapeId(item.id);
                    }}
                    style={[
                      styles.shapeButton,
                      isSelected && {
                        backgroundColor: activeSection.theme.soft,
                        borderColor: activeSection.theme.primary,
                      },
                    ]}
                  >
                    <View style={styles.shapeRow}>
                      <ShapeIllustration
                        shapeId={item.id}
                        tintColor={activeSection.theme.primary}
                        locale={locale}
                        compact
                        style={styles.shapePreview}
                      />
                      <View style={styles.shapeTextBlock}>
                        <Text style={[styles.shapeName, isSelected && { color: activeSection.theme.primary }]}>
                          {item.name}
                        </Text>
                        <Text style={styles.shapeTagline} numberOfLines={1}>
                          {item.tagline}
                        </Text>
                        {isPhone && (
                          <Text style={[styles.shapeTapHint, isSelected && { color: activeSection.theme.primary }]}>
                            {copy.viewFormula}
                          </Text>
                        )}
                      </View>
                    </View>
                  </Pressable>
                );
              })}
              {!filteredItems.length && (
                <View style={styles.noResultBox}>
                  <Text style={styles.noResultTitle}>{copy.noResultTitle}</Text>
                  <Text style={styles.noResultText}>{copy.noResultBody}</Text>
                </View>
              )}
            </View>

          </View>

          {!isPhone && (
            <Animated.View style={[styles.detailPanel, { opacity: fadeAnim }]}>
              {activeShape ? (
                <FormulaCard item={activeShape} section={activeSection} locale={locale} />
              ) : (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyTitle}>{copy.emptyTitle}</Text>
                  <Text style={styles.emptyText}>{copy.emptyBody}</Text>
                </View>
              )}
            </Animated.View>
          )}
        </View>
      </ScrollView>
      {isPhone && mobileOpenShape && (
        <Animated.View
          style={[
            styles.mobileFullOverlay,
            {
              opacity: mobileDetailAnim,
              transform: [
                {
                  translateX: mobileDetailAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [Math.max(320, width), 0],
                  }),
                },
              ],
            },
          ]}
        >
          <ScrollView contentContainerStyle={styles.mobileOverlayContent}>
            <FormulaCard
              item={mobileOpenShape}
              section={activeSection}
              locale={locale}
              mobileMode
              onBack={closeMobileDetail}
            />
          </ScrollView>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  container: {
    paddingVertical: 22,
    paddingHorizontal: 14,
    maxWidth: 1120,
    width: '100%',
    alignSelf: 'center',
    position: 'relative',
    gap: 16,
  },
  bgGlowTop: {
    position: 'absolute',
    right: -120,
    top: -110,
    width: 280,
    height: 280,
    borderRadius: 999,
    backgroundColor: '#bfdbfe',
    opacity: 0.35,
  },
  bgGlowBottom: {
    position: 'absolute',
    left: -90,
    bottom: 40,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: '#99f6e4',
    opacity: 0.26,
  },
  heroCard: {
    backgroundColor: '#0b2854',
    borderRadius: 24,
    padding: 18,
    shadowColor: '#0f172a',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  heroEyebrow: {
    color: '#93c5fd',
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 6,
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  heroTitle: {
    color: '#f8fafc',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: FONT_UI,
  },
  heroSubtitle: {
    color: '#dbeafe',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONT_UI,
  },
  statsRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  statPill: {
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 96,
  },
  statValue: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  statLabel: {
    color: '#cbd5e1',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    fontFamily: FONT_UI,
  },
  globalSearchCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#dbe1eb',
    padding: 10,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  languageRowTop: {
    marginBottom: 2,
  },
  languageSwitch: {
    flexDirection: 'row',
    gap: 6,
  },
  languageButton: {
    borderWidth: 1,
    borderColor: '#dbe1eb',
    backgroundColor: '#f8fafc',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  languageButtonActive: {
    borderColor: '#1d4ed8',
    backgroundColor: '#dbeafe',
  },
  languageButtonText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  languageButtonTextActive: {
    color: '#1e3a8a',
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#dbe1eb',
    padding: 6,
    flexDirection: 'row',
    gap: 6,
  },
  tabButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
  },
  tabText: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  tabTextActive: {
    color: '#ffffff',
  },
  contentArea: {
    gap: 12,
  },
  contentAreaWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  selectorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  selectorCardWide: {
    width: '35%',
  },
  selectorCardPhone: {
    position: 'relative',
    overflow: 'visible',
  },
  selectorTitle: {
    fontSize: 24,
    color: '#0f172a',
    fontWeight: '700',
    marginBottom: 4,
    fontFamily: FONT_UI,
  },
  selectorSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 14,
    lineHeight: 20,
    fontFamily: FONT_UI,
  },
  searchWrap: {
    borderWidth: 1,
    borderColor: '#dbe1eb',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  searchWrapGlobal: {
    marginBottom: 0,
  },
  searchInput: {
    flex: 1,
    height: 42,
    fontSize: 14,
    color: '#0f172a',
    outlineStyle: 'none',
    outlineWidth: 0,
    outlineColor: 'transparent',
    fontFamily: FONT_UI,
  },
  clearButton: {
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#1e293b',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  globalSearchMeta: {
    marginTop: 8,
    fontSize: 12,
    color: '#475569',
    fontFamily: FONT_UI,
  },
  searchMeta: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 12,
    fontFamily: FONT_UI,
  },
  shapeList: {
    gap: 10,
  },
  shapeButton: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fbff',
    borderRadius: 14,
    padding: 12,
  },
  shapeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  shapePreview: {
    width: 84,
  },
  shapeTextBlock: {
    flex: 1,
  },
  shapeName: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
    fontFamily: FONT_UI,
  },
  shapeTagline: {
    color: '#64748b',
    fontSize: 12,
    fontFamily: FONT_UI,
  },
  shapeTapHint: {
    marginTop: 6,
    fontSize: 11,
    color: '#94a3b8',
    fontFamily: FONT_UI,
  },
  detailPanel: {
    flex: 1,
  },
  mobileFullOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f1f5f9',
    paddingTop: 10,
    paddingHorizontal: 12,
    zIndex: 20,
  },
  mobileOverlayContent: {
    paddingTop: 4,
    paddingBottom: 18,
  },
  noResultBox: {
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fed7aa',
    borderRadius: 14,
    padding: 12,
  },
  noResultTitle: {
    color: '#9a3412',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    fontFamily: FONT_UI,
  },
  noResultText: {
    color: '#b45309',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FONT_UI,
  },
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 24,
  },
  emptyTitle: {
    color: '#0f172a',
    fontSize: 22,
    marginBottom: 8,
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONT_UI,
  },
});
