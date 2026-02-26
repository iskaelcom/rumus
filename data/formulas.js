export const DEFAULT_LOCALE = 'id';
export const SUPPORTED_LOCALES = ['id', 'en'];

const formulaSectionsId = [
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
        tagline: 'Mengubah nilai antar satuan metrik dan non-metrik panjang.',
        formulas: [
          { label: 'Tangga Satuan', value: 'km - hm - dam - m - dm - cm - mm' },
          { label: 'Turun 1 Anak Tangga', value: 'x 10' },
          { label: 'Naik 1 Anak Tangga', value: ': 10' },
          { label: 'Konversi Inci', value: '1 inci = 2,54 cm' },
          { label: 'Konversi Kaki', value: '1 kaki = 12 inci = 0,3048 m' },
          { label: 'Konversi Yard', value: '1 yard = 3 kaki = 0,9144 m' },
          { label: 'Konversi Mil', value: '1 mil = 1760 yard = 1,609344 km' },
        ],
        variables: [
          'km = kilometer',
          'hm = hektometer',
          'dam = dekameter',
          'm = meter',
          'dm = desimeter',
          'cm = sentimeter',
          'mm = milimeter',
          'inci = in',
          'kaki = ft',
          'yard = yd',
          'mil = mi',
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

const formulaSectionsEn = [
  {
    id: 'bangun-datar',
    title: 'Flat Shapes',
    description: 'Area and perimeter formulas for 2-dimensional figures.',
    theme: {
      primary: '#2563eb',
      soft: '#e8f0ff',
    },
    items: [
      {
        id: 'persegi',
        name: 'Square',
        tagline: 'Has four equal sides and four right angles.',
        formulas: [
          { label: 'Area', value: 's²' },
          { label: 'Perimeter', value: '4 x s' },
        ],
        variables: ['s = side'],
      },
      {
        id: 'persegi-panjang',
        name: 'Rectangle',
        tagline: 'Has two pairs of opposite sides with equal lengths.',
        formulas: [
          { label: 'Area', value: 'p x l' },
          { label: 'Perimeter', value: '2 x (p + l)' },
        ],
        variables: ['p = length', 'l = width'],
      },
      {
        id: 'segitiga',
        name: 'Triangle',
        tagline: 'Has three sides and three vertices.',
        formulas: [
          { label: 'Area', value: '1/2 x a x t' },
          { label: 'Perimeter', value: 's1 + s2 + s3' },
        ],
        variables: ['a = base', 't = height'],
      },
      {
        id: 'lingkaran',
        name: 'Circle',
        tagline: 'All points on the edge are equally distant from the center.',
        formulas: [
          { label: 'Area', value: 'π x r²' },
          { label: 'Circumference', value: '2 x π x r' },
        ],
        variables: ['r = radius', 'π = 22/7 or 3.14'],
      },
      {
        id: 'jajar-genjang',
        name: 'Parallelogram',
        tagline: 'Opposite sides are parallel and equal in length.',
        formulas: [
          { label: 'Area', value: 'a x t' },
          { label: 'Perimeter', value: '2 x (a + b)' },
        ],
        variables: ['a = base', 't = height', 'b = side'],
      },
      {
        id: 'trapesium',
        name: 'Trapezoid',
        tagline: 'Has one pair of parallel sides.',
        formulas: [
          { label: 'Area', value: '1/2 x (a + b) x t' },
          { label: 'Perimeter', value: 'sum of all sides' },
        ],
        variables: ['a and b = parallel sides', 't = height'],
      },
      {
        id: 'belah-ketupat',
        name: 'Rhombus',
        tagline: 'All sides are equal, and opposite angles are equal.',
        formulas: [
          { label: 'Area', value: '1/2 x d1 x d2' },
          { label: 'Perimeter', value: '4 x s' },
        ],
        variables: ['d1 and d2 = diagonals', 's = side'],
      },
      {
        id: 'layang-layang',
        name: 'Kite',
        tagline: 'Has two pairs of adjacent equal sides.',
        formulas: [
          { label: 'Area', value: '1/2 x d1 x d2' },
          { label: 'Perimeter', value: '2 x (a + b)' },
        ],
        variables: ['d1 and d2 = diagonals', 'a and b = side pairs'],
      },
      {
        id: 'segi-lima',
        name: 'Regular Pentagon',
        tagline: 'Has 5 equal sides and 5 equal angles.',
        formulas: [
          { label: 'Area', value: '1/2 x ap x K (or (1/4) x √(5(5 + 2√5)) x s²)' },
          { label: 'Perimeter', value: '5 x s' },
        ],
        variables: [
          's = side',
          'K = perimeter',
          'ap = apothem',
          'apothem = perpendicular distance from center to side',
        ],
      },
      {
        id: 'segi-enam',
        name: 'Regular Hexagon',
        tagline: 'Has 6 equal sides and 6 equal angles.',
        formulas: [
          { label: 'Area', value: '1/2 x ap x K (or (3√3/2) x s²)' },
          { label: 'Perimeter', value: '6 x s' },
        ],
        variables: [
          's = side',
          'K = perimeter',
          'ap = apothem',
          'apothem = perpendicular distance from center to side',
        ],
      },
      {
        id: 'segi-n',
        name: 'Regular n-gon',
        tagline: 'Has n equal sides and n equal angles.',
        formulas: [
          { label: 'Area', value: '1/2 x ap x K (or (n x s²) / (4 x tan(π/n)))' },
          { label: 'Perimeter', value: 'n x s' },
        ],
        variables: [
          'n = number of sides',
          's = side',
          'K = perimeter',
          'ap = apothem',
          'apothem = perpendicular distance from center to side',
        ],
      },
    ],
  },
  {
    id: 'bangun-ruang',
    title: 'Solid Shapes',
    description: 'Volume and surface area formulas for 3-dimensional solids.',
    theme: {
      primary: '#0f766e',
      soft: '#e8fbf8',
    },
    items: [
      {
        id: 'kubus',
        name: 'Cube',
        tagline: 'Has 6 congruent square faces.',
        formulas: [
          { label: 'Volume', value: 's³' },
          { label: 'Surface Area', value: '6 x s²' },
        ],
        variables: ['s = side'],
      },
      {
        id: 'balok',
        name: 'Rectangular Prism',
        tagline: 'Has 3 pairs of rectangular faces.',
        formulas: [
          { label: 'Volume', value: 'p x l x t' },
          { label: 'Surface Area', value: '2 x (pl + pt + lt)' },
        ],
        variables: ['p = length', 'l = width', 't = height'],
      },
      {
        id: 'prisma-segitiga',
        name: 'Triangular Prism',
        tagline: 'Has congruent triangular bases.',
        formulas: [
          { label: 'Volume', value: 'L<sub>alas</sub> x tp' },
          { label: 'Surface Area', value: '(2 x L<sub>alas</sub>) + (K<sub>alas</sub> x tp)' },
        ],
        variables: [
          'L<sub>alas</sub> = area of triangular base',
          'K<sub>alas</sub> = perimeter of triangular base',
          'tp = prism height',
          'L<sub>alas</sub> = 1/2 x a x t',
        ],
      },
      {
        id: 'limas-segiempat',
        name: 'Square Pyramid',
        tagline: 'Has a square base and triangular side faces meeting at one apex.',
        formulas: [
          { label: 'Volume', value: '1/3 x L<sub>alas</sub> x t' },
          { label: 'Surface Area', value: 'L<sub>alas</sub> + (1/2 x K<sub>alas</sub> x ts)' },
        ],
        variables: [
          'L<sub>alas</sub> = base area',
          'K<sub>alas</sub> = base perimeter',
          'ts = slant height (apothem)',
          't = pyramid height',
        ],
      },
      {
        id: 'tabung',
        name: 'Cylinder',
        tagline: 'A solid with circular base and top.',
        formulas: [
          { label: 'Volume', value: 'π x r² x t' },
          { label: 'Surface Area', value: '2 x π x r x (r + t)' },
        ],
        variables: ['r = radius', 't = height'],
      },
      {
        id: 'kerucut',
        name: 'Cone',
        tagline: 'Has a circular base and one apex.',
        formulas: [
          { label: 'Volume', value: '1/3 x π x r² x t' },
          { label: 'Surface Area', value: 'π x r x (r + s)' },
        ],
        variables: ['r = radius', 't = height', 's = slant height'],
      },
      {
        id: 'bola',
        name: 'Sphere',
        tagline: 'All points on the surface are equally distant from the center.',
        formulas: [
          { label: 'Volume', value: '4/3 x π x r³' },
          { label: 'Surface Area', value: '4 x π x r²' },
        ],
        variables: ['r = radius'],
      },
    ],
  },
  {
    id: 'rumus-dasar',
    title: 'Basic Formulas',
    description: 'Common math formulas often used in elementary school questions.',
    theme: {
      primary: '#b45309',
      soft: '#ffedd5',
    },
    items: [
      {
        id: 'pythagoras',
        name: 'Pythagorean Theorem',
        tagline: 'Used in right triangles to find an unknown side.',
        formulas: [
          { label: 'Basic Formula', value: 'a² + b² = c²' },
          { label: 'Solve c', value: 'c = √(a² + b²)' },
          { label: 'Solve a or b', value: '√(c² - other side²)' },
        ],
        variables: [
          'a and b = legs',
          'c = hypotenuse',
        ],
      },
      {
        id: 'kecepatan-jarak-waktu',
        name: 'Speed, Distance, Time',
        tagline: 'Basic relationship between speed, distance, and time.',
        formulas: [
          { label: 'Distance', value: 's = v x t' },
          { label: 'Speed', value: 'v = s / t' },
          { label: 'Time', value: 't = s / v' },
        ],
        variables: [
          's = distance',
          'v = speed',
          't = time',
        ],
      },
      {
        id: 'persen',
        name: 'Percentage',
        tagline: 'Calculates a part of a whole in percent (%).',
        formulas: [
          { label: 'Percentage', value: '(part / total) x 100%' },
          { label: 'Part', value: '(percent / 100) x total' },
          { label: 'Total', value: '(part x 100) / percent' },
        ],
        variables: [
          'part = partial value',
          'total = whole value',
          'percent = percentage (%)',
        ],
      },
      {
        id: 'rata-rata',
        name: 'Average',
        tagline: 'Formula for the average (mean) of a data set.',
        formulas: [
          { label: 'Average', value: 'average = sum / number of data' },
          { label: 'Sum', value: 'sum = average x number of data' },
          { label: 'Number of Data', value: 'number of data = sum / average' },
        ],
        variables: [
          'sum = total of all values',
          'number of data = number of data points',
          'average = mean',
        ],
      },
      {
        id: 'skala',
        name: 'Scale',
        tagline: 'Compares distance on a map/model with actual distance.',
        formulas: [
          { label: 'Scale', value: 'map distance / actual distance' },
          { label: 'Map Distance', value: 'scale x actual distance' },
          { label: 'Actual Distance', value: 'map distance / scale' },
        ],
        variables: [
          'scale = comparison ratio',
          'map distance = distance on map/model',
          'actual distance = real distance',
        ],
      },
      {
        id: 'fpb-kpk',
        name: 'GCF and LCM',
        tagline: 'Finds the greatest common factor and least common multiple.',
        formulas: [
          { label: 'GCF', value: 'greatest common factor of a and b' },
          { label: 'LCM', value: '(a x b) / GCF(a, b)' },
        ],
        variables: [
          'a and b = positive integers',
          'GCF = greatest common factor',
          'LCM = least common multiple',
        ],
      },
      {
        id: 'pecahan',
        name: 'Basic Fractions',
        tagline: 'Converts fractions to decimals and percentages, plus equivalent fractions.',
        formulas: [
          { label: 'Fraction Value', value: 'numerator / denominator' },
          { label: 'Percentage', value: '(numerator / denominator) x 100%' },
          { label: 'Equivalent Fraction', value: '(p x n) / (q x n)' },
        ],
        variables: [
          'numerator = top number',
          'denominator = bottom number (must not be 0)',
          'n = same multiplier',
        ],
      },
      {
        id: 'konversi-satuan',
        name: 'Length Unit Conversion',
        tagline: 'Converts values between metric and non-metric length units.',
        formulas: [
          { label: 'Unit Ladder', value: 'km - hm - dam - m - dm - cm - mm' },
          { label: 'Down 1 Step', value: 'x 10' },
          { label: 'Up 1 Step', value: ': 10' },
          { label: 'Inch Conversion', value: '1 inch = 2.54 cm' },
          { label: 'Foot Conversion', value: '1 foot = 12 inches = 0.3048 m' },
          { label: 'Yard Conversion', value: '1 yard = 3 feet = 0.9144 m' },
          { label: 'Mile Conversion', value: '1 mile = 1760 yards = 1.609344 km' },
        ],
        variables: [
          'km = kilometer',
          'hm = hectometer',
          'dam = decameter',
          'm = meter',
          'dm = decimeter',
          'cm = centimeter',
          'mm = millimeter',
          'inch = in',
          'foot = ft',
          'yard = yd',
          'mile = mi',
        ],
      },
      {
        id: 'debit',
        name: 'Flow Rate',
        tagline: 'Relationship between volume, time, and flow speed.',
        formulas: [
          { label: 'Flow Rate', value: 'flow rate = volume / time' },
          { label: 'Volume', value: 'volume = flow rate x time' },
          { label: 'Time', value: 'time = volume / flow rate' },
        ],
        variables: [
          'flow rate = rate of flow (e.g., liter/second)',
          'volume = amount of liquid',
          'time = duration of flow',
        ],
      },
    ],
  },
];

export const formulaSectionsByLocale = {
  id: formulaSectionsId,
  en: formulaSectionsEn,
};

export const formulaSections = formulaSectionsByLocale[DEFAULT_LOCALE];
