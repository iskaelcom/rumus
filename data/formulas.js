export const formulaSections = [
  {
    id: 'bangun-datar',
    title: 'Bangun Datar',
    description: 'Rumus luas dan keliling untuk bentuk 2 dimensi.',
    theme: {
      primary: '#2563eb',
      soft: '#e8f0ff',
    },
    items: [
      {
        id: 'persegi',
        name: 'Persegi',
        tagline: 'Empat sisi sama panjang dan empat sudut siku-siku.',
        formulas: [
          { label: 'Luas', value: 's²' },
          { label: 'Keliling', value: '4 x s' },
        ],
        variables: ['s = sisi'],
      },
      {
        id: 'persegi-panjang',
        name: 'Persegi Panjang',
        tagline: 'Dua pasang sisi berhadapan sama panjang.',
        formulas: [
          { label: 'Luas', value: 'p x l' },
          { label: 'Keliling', value: '2 x (p + l)' },
        ],
        variables: ['p = panjang', 'l = lebar'],
      },
      {
        id: 'segitiga',
        name: 'Segitiga',
        tagline: 'Memiliki tiga sisi dan tiga titik sudut.',
        formulas: [
          { label: 'Luas', value: '1/2 x a x t' },
          { label: 'Keliling', value: 's1 + s2 + s3' },
        ],
        variables: ['a = alas', 't = tinggi'],
      },
      {
        id: 'lingkaran',
        name: 'Lingkaran',
        tagline: 'Semua titik pada garis tepi berjarak sama dari pusat.',
        formulas: [
          { label: 'Luas', value: 'π x r²' },
          { label: 'Keliling', value: '2 x π x r' },
        ],
        variables: ['r = jari-jari', 'π = 22/7 atau 3,14'],
      },
      {
        id: 'jajar-genjang',
        name: 'Jajar Genjang',
        tagline: 'Sisi berhadapan sejajar dan sama panjang.',
        formulas: [
          { label: 'Luas', value: 'a x t' },
          { label: 'Keliling', value: '2 x (a + b)' },
        ],
        variables: ['a = alas', 't = tinggi', 'b = sisi miring'],
      },
      {
        id: 'trapesium',
        name: 'Trapesium',
        tagline: 'Memiliki sepasang sisi sejajar.',
        formulas: [
          { label: 'Luas', value: '1/2 x (a + b) x t' },
          { label: 'Keliling', value: 'jumlah semua sisi' },
        ],
        variables: ['a dan b = sisi sejajar', 't = tinggi'],
      },
      {
        id: 'belah-ketupat',
        name: 'Belah Ketupat',
        tagline: 'Semua sisi sama panjang, sudut berhadapan sama besar.',
        formulas: [
          { label: 'Luas', value: '1/2 x d1 x d2' },
          { label: 'Keliling', value: '4 x s' },
        ],
        variables: ['d1 dan d2 = diagonal', 's = sisi'],
      },
      {
        id: 'layang-layang',
        name: 'Layang-Layang',
        tagline: 'Dua pasang sisi berdekatan sama panjang.',
        formulas: [
          { label: 'Luas', value: '1/2 x d1 x d2' },
          { label: 'Keliling', value: '2 x (a + b)' },
        ],
        variables: ['d1 dan d2 = diagonal', 'a dan b = pasangan sisi'],
      },
      {
        id: 'segi-lima',
        name: 'Segi Lima Beraturan',
        tagline: 'Memiliki 5 sisi sama panjang dan 5 sudut sama besar.',
        formulas: [
          { label: 'Luas', value: '1/2 x ap x K (atau (1/4) x √(5(5 + 2√5)) x s²)' },
          { label: 'Keliling', value: '5 x s' },
        ],
        variables: [
          's = sisi',
          'K = keliling',
          'ap = apotema',
          'apotema = jarak tegak lurus dari pusat ke sisi',
        ],
      },
      {
        id: 'segi-enam',
        name: 'Segi Enam Beraturan',
        tagline: 'Memiliki 6 sisi sama panjang dan 6 sudut sama besar.',
        formulas: [
          { label: 'Luas', value: '1/2 x ap x K (atau (3√3/2) x s²)' },
          { label: 'Keliling', value: '6 x s' },
        ],
        variables: [
          's = sisi',
          'K = keliling',
          'ap = apotema',
          'apotema = jarak tegak lurus dari pusat ke sisi',
        ],
      },
      {
        id: 'segi-n',
        name: 'Segi-n Beraturan',
        tagline: 'Memiliki n sisi sama panjang dan n sudut sama besar.',
        formulas: [
          { label: 'Luas', value: '1/2 x ap x K (atau (n x s²) / (4 x tan(π/n)))' },
          { label: 'Keliling', value: 'n x s' },
        ],
        variables: [
          'n = jumlah sisi',
          's = sisi',
          'K = keliling',
          'ap = apotema',
          'apotema = jarak tegak lurus dari pusat ke sisi',
        ],
      },
    ],
  },
  {
    id: 'bangun-ruang',
    title: 'Bangun Ruang',
    description: 'Rumus volume dan luas permukaan untuk bentuk 3 dimensi.',
    theme: {
      primary: '#0f766e',
      soft: '#e8fbf8',
    },
    items: [
      {
        id: 'kubus',
        name: 'Kubus',
        tagline: 'Memiliki 6 sisi berbentuk persegi yang sama besar.',
        formulas: [
          { label: 'Volume', value: 's³' },
          { label: 'Luas Permukaan', value: '6 x s²' },
        ],
        variables: ['s = sisi'],
      },
      {
        id: 'balok',
        name: 'Balok',
        tagline: 'Memiliki 3 pasang sisi berbentuk persegi panjang.',
        formulas: [
          { label: 'Volume', value: 'p x l x t' },
          { label: 'Luas Permukaan', value: '2 x (pl + pt + lt)' },
        ],
        variables: ['p = panjang', 'l = lebar', 't = tinggi'],
      },
      {
        id: 'prisma-segitiga',
        name: 'Prisma Segitiga',
        tagline: 'Memiliki alas dan atap segitiga yang kongruen.',
        formulas: [
          { label: 'Volume', value: 'L<sub>alas</sub> x tp' },
          { label: 'Luas Permukaan', value: '(2 x L<sub>alas</sub>) + (K<sub>alas</sub> x tp)' },
        ],
        variables: [
          'L<sub>alas</sub> = luas alas segitiga',
          'K<sub>alas</sub> = keliling alas segitiga',
          'tp = tinggi prisma',
          'L<sub>alas</sub> = 1/2 x a x t',
        ],
      },
      {
        id: 'limas-segiempat',
        name: 'Limas Segiempat',
        tagline: 'Memiliki alas segiempat dan sisi tegak bertemu di puncak.',
        formulas: [
          { label: 'Volume', value: '1/3 x L<sub>alas</sub> x t' },
          { label: 'Luas Permukaan', value: 'L<sub>alas</sub> + (1/2 x K<sub>alas</sub> x ts)' },
        ],
        variables: [
          'L<sub>alas</sub> = luas alas',
          'K<sub>alas</sub> = keliling alas',
          'ts = tinggi sisi tegak (apotema)',
          't = tinggi limas',
        ],
      },
      {
        id: 'tabung',
        name: 'Tabung',
        tagline: 'Bangun ruang dengan alas dan tutup lingkaran.',
        formulas: [
          { label: 'Volume', value: 'π x r² x t' },
          { label: 'Luas Permukaan', value: '2 x π x r x (r + t)' },
        ],
        variables: ['r = jari-jari', 't = tinggi'],
      },
      {
        id: 'kerucut',
        name: 'Kerucut',
        tagline: 'Alas lingkaran dengan satu titik puncak.',
        formulas: [
          { label: 'Volume', value: '1/3 x π x r² x t' },
          { label: 'Luas Permukaan', value: 'π x r x (r + s)' },
        ],
        variables: ['r = jari-jari', 't = tinggi', 's = garis pelukis'],
      },
      {
        id: 'bola',
        name: 'Bola',
        tagline: 'Semua titik pada permukaan berjarak sama dari pusat.',
        formulas: [
          { label: 'Volume', value: '4/3 x π x r³' },
          { label: 'Luas Permukaan', value: '4 x π x r²' },
        ],
        variables: ['r = jari-jari'],
      },
    ],
  },
  {
    id: 'rumus-dasar',
    title: 'Rumus Dasar',
    description: 'Rumus matematika umum yang sering dipakai di soal SD.',
    theme: {
      primary: '#b45309',
      soft: '#ffedd5',
    },
    items: [
      {
        id: 'pythagoras',
        name: 'Teorema Pythagoras',
        tagline: 'Dipakai pada segitiga siku-siku untuk mencari sisi yang belum diketahui.',
        formulas: [
          { label: 'Rumus Dasar', value: 'a² + b² = c²' },
          { label: 'Cari c', value: 'c = √(a² + b²)' },
          { label: 'Cari a atau b', value: '√(c² - sisi lain²)' },
        ],
        variables: [
          'a dan b = sisi siku-siku',
          'c = sisi miring (hipotenusa)',
        ],
      },
      {
        id: 'kecepatan-jarak-waktu',
        name: 'Kecepatan, Jarak, Waktu',
        tagline: 'Rumus hubungan dasar antara kecepatan, jarak tempuh, dan waktu.',
        formulas: [
          { label: 'Jarak', value: 's = v x t' },
          { label: 'Kecepatan', value: 'v = s / t' },
          { label: 'Waktu', value: 't = s / v' },
        ],
        variables: [
          's = jarak',
          'v = kecepatan',
          't = waktu',
        ],
      },
      {
        id: 'persen',
        name: 'Persentase',
        tagline: 'Menghitung bagian dari keseluruhan dalam satuan persen (%).',
        formulas: [
          { label: 'Persentase', value: '(bagian / total) x 100%' },
          { label: 'Bagian', value: '(persen / 100) x total' },
          { label: 'Total', value: '(bagian x 100) / persen' },
        ],
        variables: [
          'bagian = nilai sebagian',
          'total = nilai keseluruhan',
          'persen = persentase (%)',
        ],
      },
      {
        id: 'rata-rata',
        name: 'Rata-Rata',
        tagline: 'Rumus nilai rata-rata (mean) dari sekumpulan data.',
        formulas: [
          { label: 'Rata-rata', value: 'rata-rata = jumlah / banyak data' },
          { label: 'Jumlah', value: 'jumlah = rata-rata x banyak data' },
          { label: 'Banyak Data', value: 'banyak data = jumlah / rata-rata' },
        ],
        variables: [
          'jumlah = total semua nilai',
          'banyak data = jumlah anggota data',
          'rata-rata = mean',
        ],
      },
      {
        id: 'skala',
        name: 'Skala',
        tagline: 'Membandingkan jarak pada peta/model dengan jarak sebenarnya.',
        formulas: [
          { label: 'Skala', value: 'jarak peta / jarak sebenarnya' },
          { label: 'Jarak Peta', value: 'skala x jarak sebenarnya' },
          { label: 'Jarak Sebenarnya', value: 'jarak peta / skala' },
        ],
        variables: [
          'skala = rasio perbandingan',
          'jarak peta = jarak pada gambar/model',
          'jarak sebenarnya = jarak asli',
        ],
      },
      {
        id: 'fpb-kpk',
        name: 'FPB dan KPK',
        tagline: 'Menentukan faktor persekutuan terbesar dan kelipatan persekutuan terkecil.',
        formulas: [
          { label: 'FPB', value: 'faktor persekutuan terbesar dari a dan b' },
          { label: 'KPK', value: '(a x b) / FPB(a, b)' },
        ],
        variables: [
          'a dan b = bilangan bulat positif',
          'FPB = faktor persekutuan terbesar',
          'KPK = kelipatan persekutuan terkecil',
        ],
      },
      {
        id: 'pecahan',
        name: 'Pecahan Dasar',
        tagline: 'Konversi pecahan ke desimal dan persen, serta konsep pecahan senilai.',
        formulas: [
          { label: 'Nilai Pecahan', value: 'pembilang / penyebut' },
          { label: 'Persentase', value: '(pembilang / penyebut) x 100%' },
          { label: 'Pecahan Senilai', value: '(p x n) / (q x n)' },
        ],
        variables: [
          'pembilang = angka atas',
          'penyebut = angka bawah (tidak boleh 0)',
          'n = bilangan pengali yang sama',
        ],
      },
      {
        id: 'konversi-satuan',
        name: 'Konversi Satuan Panjang',
        tagline: 'Mengubah nilai antar km, hm, dam, m, dm, cm, dan mm.',
        formulas: [
          { label: 'Tangga Satuan', value: 'km - hm - dam - m - dm - cm - mm' },
          { label: 'Turun 1 Anak Tangga', value: 'x 10' },
          { label: 'Naik 1 Anak Tangga', value: ': 10' },
        ],
        variables: [
          'km = kilometer',
          'hm = hektometer',
          'dam = dekameter',
          'm = meter',
          'dm = desimeter',
          'cm = sentimeter',
          'mm = milimeter',
        ],
      },
      {
        id: 'debit',
        name: 'Debit',
        tagline: 'Hubungan antara volume, waktu, dan laju aliran.',
        formulas: [
          { label: 'Debit', value: 'debit = volume / waktu' },
          { label: 'Volume', value: 'volume = debit x waktu' },
          { label: 'Waktu', value: 'waktu = volume / debit' },
        ],
        variables: [
          'debit = laju aliran (misal liter/detik)',
          'volume = banyak zat cair',
          'waktu = lama aliran',
        ],
      },
    ],
  },
];
