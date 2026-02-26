# Rumus Matematika SD (React Native Web)

Aplikasi React Native berbasis Expo untuk menampilkan daftar rumus matematika SD.

## Fitur
- Tab kategori **Bangun Datar** dan **Bangun Ruang**
- Kolom pencarian bangun/rumus per kategori
- Ilustrasi gambar relevan untuk setiap bangun
- Detail rumus dan keterangan variabel
- Tampilan responsif untuk web dan mobile

## Menjalankan versi web
1. Install dependency:
   ```bash
   npm install
   ```
2. Jalankan web:
   ```bash
   npm run web
   ```

## Jika muncul error `ERESOLVE`
Jalankan instalasi ulang bersih:

```bash
rm -rf node_modules package-lock.json
npm install
```

Jika masih bentrok, sinkronkan versi dengan Expo:

```bash
npx expo install --fix
npm install
```

## Struktur utama
- `App.js` : halaman utama
- `data/formulas.js` : data rumus
- `components/FormulaCard.js` : panel detail rumus
- `components/ShapeIllustration.js` : ilustrasi gambar bangun
