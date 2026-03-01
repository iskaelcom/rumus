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
import * as FileSystem from 'expo-file-system';
import FormulaCard from './components/FormulaCard';
import ShapeIllustration from './components/ShapeIllustration';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, formulaSectionsByLocale } from './data/formulas';

const STORAGE_KEY = 'rumus:last-selection:v1';
const DEFAULT_SECTIONS = formulaSectionsByLocale[DEFAULT_LOCALE];
const DEFAULT_SHAPE_IDS = new Set(
  DEFAULT_SECTIONS.flatMap((section) => section.items.map((item) => item.id))
);
const BOOKMARK_SECTION_ID = 'bookmark';
const BOOKMARK_THEME = {
  primary: '#1e293b',
  soft: '#e2e8f0',
};
const NATIVE_STORAGE_FILENAME = 'rumus-state.json';

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
    bookmarkTab: 'Bookmark',
    bookmarkDescription: 'Rumus yang kamu simpan untuk akses cepat.',
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
    bookmarkTab: 'Bookmarks',
    bookmarkDescription: 'Saved formulas for quick access.',
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

const getNativeStoragePath = () =>
  FileSystem.documentDirectory
    ? `${FileSystem.documentDirectory}${NATIVE_STORAGE_FILENAME}`
    : null;

const readPersistedState = async () => {
  if (Platform.OS === 'web') {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.localStorage.getItem(STORAGE_KEY);
  }

  const nativePath = getNativeStoragePath();
  if (!nativePath) {
    return null;
  }

  const info = await FileSystem.getInfoAsync(nativePath);
  if (!info.exists) {
    return null;
  }
  return FileSystem.readAsStringAsync(nativePath);
};

const writePersistedState = async (serializedValue) => {
  if (Platform.OS === 'web') {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, serializedValue);
    return;
  }

  const nativePath = getNativeStoragePath();
  if (!nativePath) {
    return;
  }

  await FileSystem.writeAsStringAsync(nativePath, serializedValue);
};

export default function App() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const isPhone = width < 760;
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [bookmarkedShapeIds, setBookmarkedShapeIds] = useState([]);
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

  const sectionByItemId = useMemo(() => {
    const map = new Map();
    formulaSections.forEach((section) => {
      section.items.forEach((item) => {
        map.set(item.id, section);
      });
    });
    return map;
  }, [formulaSections]);

  const itemById = useMemo(() => {
    const map = new Map();
    formulaSections.forEach((section) => {
      section.items.forEach((item) => {
        map.set(item.id, item);
      });
    });
    return map;
  }, [formulaSections]);

  const bookmarkItems = useMemo(
    () => bookmarkedShapeIds.map((itemId) => itemById.get(itemId)).filter(Boolean),
    [bookmarkedShapeIds, itemById]
  );

  const sectionsWithBookmarks = useMemo(() => {
    if (!bookmarkItems.length) {
      return formulaSections;
    }
    return [
      {
        id: BOOKMARK_SECTION_ID,
        title: copy.bookmarkTab,
        description: copy.bookmarkDescription,
        theme: BOOKMARK_THEME,
        items: bookmarkItems,
      },
      ...formulaSections,
    ];
  }, [bookmarkItems, formulaSections, copy.bookmarkTab, copy.bookmarkDescription]);

  const activeSection = useMemo(
    () =>
      sectionsWithBookmarks.find((section) => section.id === activeSectionId) || sectionsWithBookmarks[0],
    [activeSectionId, sectionsWithBookmarks]
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
      const storedBookmarks = Array.isArray(parsed.bookmarkedShapeIds)
        ? parsed.bookmarkedShapeIds.filter((itemId) => DEFAULT_SHAPE_IDS.has(itemId))
        : [];

      // Improved restoration logic:
      // 1. Try to restore the previously active section first.
      // 2. If it's the bookmark section, make sure bookmarks exist.
      // 3. Otherwise default to the first section.
      let nextSectionId = sectionsForLocale[0].id;
      const wasOnBookmark = parsed.activeSectionId === BOOKMARK_SECTION_ID;

      if (wasOnBookmark && storedBookmarks.length > 0) {
        nextSectionId = BOOKMARK_SECTION_ID;
      } else {
        const matchingSection = sectionsForLocale.find(s => s.id === parsed.activeSectionId);
        if (matchingSection) {
          nextSectionId = matchingSection.id;
        } else if (storedBookmarks.length > 0) {
          // If previous section is invalid but we have bookmarks, default to bookmarks
          nextSectionId = BOOKMARK_SECTION_ID;
        }
      }

      // Restore active shape
      let nextShapeId = sectionsForLocale[0].items[0].id;
      const activeShapeIdFromStorage = typeof parsed.activeShapeId === 'string' ? parsed.activeShapeId : '';

      if (nextSectionId === BOOKMARK_SECTION_ID) {
        nextShapeId = storedBookmarks.includes(activeShapeIdFromStorage)
          ? activeShapeIdFromStorage
          : storedBookmarks[0];
      } else {
        const currentSection = sectionsForLocale.find(s => s.id === nextSectionId);
        if (currentSection) {
          const storedShape = currentSection.items.find(item => item.id === activeShapeIdFromStorage);
          nextShapeId = storedShape ? storedShape.id : currentSection.items[0].id;
        }
      }

      setLocale(storedLocale);
      setBookmarkedShapeIds(storedBookmarks);
      setActiveSectionId(nextSectionId);
      setActiveShapeId(nextShapeId);

      // Restore mobileOpenId:
      // Check if the mobileOpenId exists in ANY section for the current locale (including bookmarks)
      const allItemsForLocale = [
        ...sectionsForLocale.flatMap(s => s.items),
        ...storedBookmarks.map(id => DEFAULT_SECTIONS.flatMap(s => s.items).find(item => item.id === id)).filter(Boolean)
      ];

      const validMobileOpenId =
        typeof parsed.mobileOpenId === 'string' &&
        allItemsForLocale.some(item => item.id === parsed.mobileOpenId);

      if (validMobileOpenId) {
        setMobileOpenId(parsed.mobileOpenId);
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
          bookmarkedShapeIds,
        })
      );
    } catch (error) {
      // Ignore storage quota or privacy mode errors.
    }
  }, [isStorageHydrated, locale, activeSectionId, activeShapeId, mobileOpenId, bookmarkedShapeIds]);

  const openMobileDetail = (itemId) => {
    setActiveShapeId(itemId);
    setMobileOpenId(itemId);
  };

  const toggleBookmark = (itemId) => {
    setBookmarkedShapeIds((prevIds) => {
      if (prevIds.includes(itemId)) {
        return prevIds.filter((storedId) => storedId !== itemId);
      }
      return [itemId, ...prevIds];
    });
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
      sectionsWithBookmarks.map((section) => ({
        id: section.id,
        title: section.title,
        items: keyword
          ? section.items.filter((item) => matchesSearchKeyword(item, keyword))
          : section.items,
      })),
    [keyword, sectionsWithBookmarks]
  );

  useEffect(() => {
    const sectionStillExists = sectionsWithBookmarks.some((section) => section.id === activeSectionId);
    if (sectionStillExists) {
      return;
    }
    setActiveSectionId(sectionsWithBookmarks[0].id);
  }, [sectionsWithBookmarks, activeSectionId]);

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
  const activeShapeSection = activeShape ? sectionByItemId.get(activeShape.id) || activeSection : activeSection;
  const mobileOpenShapeSection = mobileOpenShape
    ? sectionByItemId.get(mobileOpenShape.id) || activeSection
    : activeSection;

  const totalShapes = formulaSections.reduce((acc, section) => acc + section.items.length, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>

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
                <Text style={styles.clearButtonText}>✕</Text>
              </Pressable>
            )}
          </View>
          {keyword.length > 0 && (
            <Text style={styles.globalSearchMeta}>
              {filteredItems.length ? copy.detectedCategory(activeSection.title) : copy.noSearchResult}
            </Text>
          )}
        </View>

        {isPhone ? (
          <View style={styles.tabBar}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabScrollContent}
            >
              {sectionsWithBookmarks.map((section) => {
                const isActive = activeSection.id === section.id;
                return (
                  <Pressable
                    key={section.id}
                    onPress={() => setActiveSectionId(section.id)}
                    style={[
                      styles.tabButton,
                      styles.tabButtonPhone,
                      isActive && { backgroundColor: section.theme.primary, borderColor: section.theme.primary },
                    ]}
                  >
                    <Text
                      style={[styles.tabText, styles.tabTextPhone, isActive && styles.tabTextActive]}
                      numberOfLines={1}
                    >
                      {section.title}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.tabBar}>
            {sectionsWithBookmarks.map((section) => {
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
        )}

        <View style={[styles.contentArea, !isPhone && isWide && styles.contentAreaWide]}>
          <View style={[styles.selectorCard, isWide && styles.selectorCardWide, isPhone && styles.selectorCardPhone]}>
            <Text style={styles.selectorTitle}>{activeSection.title}</Text>
            <Text style={styles.selectorSubtitle}>{activeSection.description}</Text>

            <Text style={styles.searchMeta}>{copy.resultFound(filteredItems.length)}</Text>

            <View style={styles.shapeList}>
              {filteredItems.map((item) => {
                const isSelected = isPhone ? item.id === mobileOpenId : item.id === activeShape?.id;
                const isBookmarked = bookmarkedShapeIds.includes(item.id);
                const itemSection = sectionByItemId.get(item.id) || activeSection;
                const selectedTheme = activeSection.id === BOOKMARK_SECTION_ID ? itemSection.theme : activeSection.theme;
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
                        backgroundColor: selectedTheme.soft,
                        borderColor: selectedTheme.primary,
                      },
                    ]}
                  >
                    <View style={styles.shapeRow}>
                      <ShapeIllustration
                        shapeId={item.id}
                        tintColor={itemSection.theme.primary}
                        locale={locale}
                        compact
                        style={styles.shapePreview}
                      />
                      <View style={styles.shapeTextBlock}>
                        <View style={styles.shapeNameRow}>
                          <Text style={[styles.shapeName, isSelected && { color: selectedTheme.primary }]}>
                            {item.name}
                          </Text>
                          {isBookmarked && (
                            <Text style={[styles.shapeBookmarkBadge, { color: itemSection.theme.primary }]}>
                              ★
                            </Text>
                          )}
                        </View>
                        <Text style={styles.shapeTagline} numberOfLines={1}>
                          {item.tagline}
                        </Text>
                        {isPhone && (
                          <Text style={[styles.shapeTapHint, isSelected && { color: selectedTheme.primary }]}>
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
                <FormulaCard
                  item={activeShape}
                  section={activeShapeSection}
                  locale={locale}
                  isBookmarked={bookmarkedShapeIds.includes(activeShape.id)}
                  onToggleBookmark={toggleBookmark}
                />
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
              section={mobileOpenShapeSection}
              locale={locale}
              isBookmarked={bookmarkedShapeIds.includes(mobileOpenShape.id)}
              onToggleBookmark={toggleBookmark}
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
    backgroundColor: '#F5F7FC',
  },
  container: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    maxWidth: 1120,
    width: '100%',
    alignSelf: 'center',
    gap: 14,
  },
  heroCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    shadowColor: '#312E81',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  heroEyebrow: {
    color: '#6366F1',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  heroTitle: {
    color: '#312E81',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: FONT_UI,
  },
  heroSubtitle: {
    color: '#4338CA',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: FONT_UI,
  },
  statsRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  statPill: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    paddingVertical: 8,
    paddingHorizontal: 14,
    minWidth: 80,
  },
  statValue: {
    color: '#312E81',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  statLabel: {
    color: '#6366F1',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: FONT_UI,
  },
  globalSearchCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDE5F8',
    padding: 12,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  languageRowTop: {
    marginBottom: 0,
  },
  languageSwitch: {
    flexDirection: 'row',
    gap: 6,
  },
  languageButton: {
    borderWidth: 1,
    borderColor: '#DDE5F8',
    backgroundColor: '#F5F7FC',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  languageButtonActive: {
    borderColor: '#4338CA',
    backgroundColor: '#E0E7FF',
  },
  languageButtonText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    fontFamily: FONT_UI,
  },
  languageButtonTextActive: {
    color: '#312E81',
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDE5F8',
    padding: 6,
    flexDirection: 'row',
    gap: 6,
  },
  tabScrollContent: {
    flexDirection: 'row',
    gap: 6,
    paddingRight: 2,
  },
  tabButton: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDE5F8',
    backgroundColor: '#F5F7FC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabButtonPhone: {
    flex: 0,
    minWidth: 120,
    paddingHorizontal: 14,
  },
  tabText: {
    color: '#3730A3',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  tabTextPhone: {
    fontSize: 13,
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DDE5F8',
    padding: 16,
    shadowColor: '#312E81',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
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
    fontSize: 20,
    color: '#0f172a',
    fontWeight: '700',
    marginBottom: 4,
    fontFamily: FONT_UI,
  },
  selectorSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 12,
    lineHeight: 20,
    fontFamily: FONT_UI,
  },
  searchWrap: {
    borderWidth: 1,
    borderColor: '#DDE5F8',
    borderRadius: 10,
    backgroundColor: '#F5F7FC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  searchWrapGlobal: {
    marginBottom: 0,
  },
  searchInput: {
    flex: 1,
    height: 44,
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
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#4338CA',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  globalSearchMeta: {
    marginTop: 8,
    fontSize: 12,
    color: '#64748b',
    fontFamily: FONT_UI,
  },
  searchMeta: {
    fontSize: 11,
    color: '#94a3b8',
    marginBottom: 10,
    fontFamily: FONT_UI,
  },
  shapeList: {
    gap: 8,
  },
  shapeButton: {
    borderWidth: 1,
    borderColor: '#DDE5F8',
    backgroundColor: '#F5F7FC',
    borderRadius: 12,
    padding: 12,
  },
  shapeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  shapePreview: {
    width: 80,
  },
  shapeTextBlock: {
    flex: 1,
  },
  shapeNameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 6,
  },
  shapeName: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
    fontFamily: FONT_UI,
  },
  shapeBookmarkBadge: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  shapeTagline: {
    color: '#64748b',
    fontSize: 12,
    lineHeight: 17,
    fontFamily: FONT_UI,
  },
  shapeTapHint: {
    marginTop: 5,
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
    backgroundColor: '#F5F7FC',
    paddingTop: 12,
    paddingHorizontal: 16,
    zIndex: 20,
  },
  mobileOverlayContent: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  noResultBox: {
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fed7aa',
    borderRadius: 12,
    padding: 14,
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DDE5F8',
    padding: 24,
  },
  emptyTitle: {
    color: '#0f172a',
    fontSize: 20,
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
