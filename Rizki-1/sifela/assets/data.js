/* ============================================================
   Sifela — Data contoh (mock)
   Semua lowongan, organisasi, dan angka di sini adalah fiktif.
   Dibuat untuk keperluan prototipe/demo, bukan data nyata.
   ============================================================ */

const SIFELA_DATA = {
  cities: [
    { id: "bandung",    name: "Bandung",    lat: -6.9175, lng: 107.6191 },
    { id: "jakarta",    name: "Jakarta",    lat: -6.2088, lng: 106.8456 },
    { id: "yogyakarta", name: "Yogyakarta", lat: -7.7956, lng: 110.3695 },
    { id: "surabaya",   name: "Surabaya",   lat: -7.2575, lng: 112.7521 },
    { id: "malang",     name: "Malang",     lat: -7.9666, lng: 112.6326 },
    { id: "semarang",   name: "Semarang",   lat: -6.9666, lng: 110.4167 }
  ],

  categories: [
    { id: "fnb",       label: "FnB & Barista",    icon: "☕" },
    { id: "retail",    label: "Retail & Toko",    icon: "🛍️" },
    { id: "kreatif",   label: "Desain & Kreatif", icon: "🎨" },
    { id: "konten",    label: "Konten & Sosmed",  icon: "📱" },
    { id: "event",     label: "Event & Acara",    icon: "🎪" },
    { id: "tutor",     label: "Pendidikan",       icon: "📚" },
    { id: "admin",     label: "Administrasi",     icon: "🗂️" },
    { id: "logistik",  label: "Logistik",         icon: "🛵" },
    { id: "data",      label: "Data & Riset",     icon: "📊" },
    { id: "teknologi", label: "Teknologi",        icon: "💻" }
  ],

  types: [
    { id: "shift",     label: "Shift Part-time", desc: "Jam kerja per shift, bisa disesuaikan jadwal kuliah" },
    { id: "freelance", label: "Freelance Kecil", desc: "Proyek lepas, dibayar per proyek" },
    { id: "gig",       label: "Gig Harian",      desc: "Kerja harian/event, dibayar per hari" }
  ],

  skills: [
    "Barista", "Kasir", "Pelayanan Pelanggan", "Komunikasi", "Manajemen Stok",
    "Desain Grafis", "Figma", "Canva", "Adobe Illustrator", "Video Editing",
    "Copywriting", "Content Planning", "Fotografi", "TikTok", "Instagram",
    "Microsoft Excel", "Data Entry", "Riset", "Mengajar", "Public Speaking",
    "Penulisan Artikel", "Administrasi", "Pengiriman", "Negosiasi", "Coding"
  ],

  days: [
    { id: "sen", label: "Sen" }, { id: "sel", label: "Sel" },
    { id: "rab", label: "Rab" }, { id: "kam", label: "Kam" },
    { id: "jum", label: "Jum" }, { id: "sab", label: "Sab" },
    { id: "min", label: "Min" }
  ],

  /* pay = rupiah. unit: "jam" | "proyek" | "hari" | "paket" */
  jobs: [
    {
      id: "j01", title: "Barista Shift Pagi", org: "Kopi Senja", cat: "fnb", type: "shift",
      city: "bandung", area: "Dago", lat: -6.8850, lng: 107.6130,
      pay: 22000, unit: "jam", hours: 4, days: ["sen", "sel", "rab", "kam"],
      start: "07:00", end: "11:00", slots: 2,
      skills: ["Barista", "Pelayanan Pelanggan", "Komunikasi"],
      rating: 4.7, reviews: 38, verified: true, urgent: false, posted: 2,
      desc: "Menyiapkan espresso-based drink, menjaga kebersihan bar, dan melayani pelanggan pagi."
    },
    {
      id: "j02", title: "Staf Kasir Weekend", org: "Toko Buku Aksara", cat: "retail", type: "shift",
      city: "bandung", area: "Dipatiukur", lat: -6.8930, lng: 107.6165,
      pay: 20000, unit: "jam", hours: 6, days: ["sab", "min"],
      start: "10:00", end: "16:00", slots: 1,
      skills: ["Kasir", "Pelayanan Pelanggan", "Manajemen Stok"],
      rating: 4.5, reviews: 21, verified: true, urgent: true, posted: 1,
      desc: "Melayani transaksi, menata rak, dan membantu pencarian buku pelanggan di akhir pekan."
    },
    {
      id: "j03", title: "Desain 12 Feed Instagram", org: "Studio Rupa", cat: "kreatif", type: "freelance",
      city: "bandung", area: "Cigadung", lat: -6.8750, lng: 107.6300,
      pay: 450000, unit: "proyek", hours: 0, days: [], start: "", end: "", slots: 1,
      skills: ["Desain Grafis", "Figma", "Canva"],
      rating: 4.8, reviews: 12, verified: true, urgent: false, posted: 3,
      desc: "Butuh 12 desain feed untuk brand lokal. Brief jelas, revisi 2x, deadline 10 hari."
    },
    {
      id: "j04", title: "Tutor Matematika SMP", org: "Bimbel Cerdas", cat: "tutor", type: "shift",
      city: "bandung", area: "Antapani", lat: -6.9140, lng: 107.6600,
      pay: 50000, unit: "jam", hours: 2, days: ["sel", "kam"],
      start: "16:00", end: "18:00", slots: 2,
      skills: ["Mengajar", "Public Speaking", "Komunikasi"],
      rating: 4.9, reviews: 54, verified: true, urgent: false, posted: 5,
      desc: "Mengajar kelas kecil (maks 6 siswa). Modul dan ruang kelas disediakan."
    },
    {
      id: "j05", title: "Crew Event Kampus", org: "Eventia", cat: "event", type: "gig",
      city: "bandung", area: "Sabuga", lat: -6.8900, lng: 107.6100,
      pay: 150000, unit: "hari", hours: 8, days: ["sab"], start: "08:00", end: "16:00", slots: 12,
      skills: ["Komunikasi", "Pelayanan Pelanggan"],
      rating: 4.3, reviews: 87, verified: false, urgent: true, posted: 1,
      desc: "Registrasi peserta, mengatur antrean, dan membantu rundown acara seminar nasional."
    },

    {
      id: "j06", title: "Barista Shift Sore", org: "Kopi Senja", cat: "fnb", type: "shift",
      city: "jakarta", area: "Kemang", lat: -6.2600, lng: 106.8130,
      pay: 28000, unit: "jam", hours: 5, days: ["sen", "rab", "jum"],
      start: "15:00", end: "20:00", slots: 1,
      skills: ["Barista", "Pelayanan Pelanggan"],
      rating: 4.6, reviews: 44, verified: true, urgent: false, posted: 4,
      desc: "Shift sore untuk kafe ramai. Diutamakan yang sudah punya pengalaman mesin espresso."
    },
    {
      id: "j07", title: "Social Media Officer", org: "Agensi Kelana", cat: "konten", type: "shift",
      city: "jakarta", area: "Tebet", lat: -6.2260, lng: 106.8580,
      pay: 25000, unit: "jam", hours: 4, days: ["sen", "sel", "rab", "kam", "jum"],
      start: "09:00", end: "13:00", slots: 1,
      skills: ["Content Planning", "Instagram", "Copywriting"],
      rating: 4.4, reviews: 19, verified: true, urgent: false, posted: 6,
      desc: "Menyusun kalender konten mingguan dan menjawab komentar untuk 2 akun klien."
    },
    {
      id: "j08", title: "Fotografer Produk (1 Hari)", org: "Studio Rupa", cat: "kreatif", type: "freelance",
      city: "jakarta", area: "Kebayoran", lat: -6.2400, lng: 106.7900,
      pay: 700000, unit: "proyek", hours: 6, days: [], start: "", end: "", slots: 1,
      skills: ["Fotografi", "Desain Grafis"],
      rating: 4.7, reviews: 8, verified: false, urgent: true, posted: 2,
      desc: "Sesi foto 20 produk skincare di studio. Editing dasar sudah termasuk."
    },
    {
      id: "j09", title: "Kasir Toko Roti", org: "Toko Roti Harum", cat: "retail", type: "shift",
      city: "jakarta", area: "Tebet", lat: -6.2300, lng: 106.8500,
      pay: 22000, unit: "jam", hours: 6, days: ["sab", "min"],
      start: "08:00", end: "14:00", slots: 2,
      skills: ["Kasir", "Pelayanan Pelanggan"],
      rating: 4.2, reviews: 31, verified: true, urgent: false, posted: 7,
      desc: "Melayani pembeli, packing pesanan online, dan menutup kas harian."
    },
    {
      id: "j10", title: "Crew Pameran 3 Hari", org: "Eventia", cat: "event", type: "gig",
      city: "jakarta", area: "Kemayoran", lat: -6.1570, lng: 106.8530,
      pay: 175000, unit: "hari", hours: 9, days: ["jum", "sab", "min"], start: "09:00", end: "18:00", slots: 20,
      skills: ["Komunikasi", "Administrasi"],
      rating: 4.1, reviews: 63, verified: false, urgent: true, posted: 1,
      desc: "Menjaga booth, mencatat lead pengunjung, dan membantu bongkar-pasang display."
    },

    {
      id: "j11", title: "Barista Part-time", org: "Kopi Senja", cat: "fnb", type: "shift",
      city: "yogyakarta", area: "Malioboro", lat: -7.7920, lng: 110.3660,
      pay: 18000, unit: "jam", hours: 4, days: ["sel", "kam", "jum"],
      start: "16:00", end: "20:00", slots: 2,
      skills: ["Barista", "Komunikasi"],
      rating: 4.5, reviews: 27, verified: true, urgent: false, posted: 3,
      desc: "Kafe kecil dengan pelanggan tetap. Cocok untuk mahasiswa yang kuliah pagi."
    },
    {
      id: "j12", title: "Admin Toko Buku", org: "Arsip Nusa", cat: "admin", type: "shift",
      city: "yogyakarta", area: "Sagan", lat: -7.7830, lng: 110.3760,
      pay: 19000, unit: "jam", hours: 5, days: ["sen", "rab", "jum"],
      start: "13:00", end: "18:00", slots: 1,
      skills: ["Administrasi", "Microsoft Excel", "Data Entry"],
      rating: 4.4, reviews: 15, verified: true, urgent: false, posted: 8,
      desc: "Input data stok, rekap penjualan harian, dan menyusun laporan mingguan."
    },
    {
      id: "j13", title: "Tutor Les Privat", org: "Bimbel Cerdas", cat: "tutor", type: "shift",
      city: "yogyakarta", area: "Seturan", lat: -7.7700, lng: 110.3950,
      pay: 55000, unit: "jam", hours: 2, days: ["sen", "sel", "kam", "jum"],
      start: "15:00", end: "17:00", slots: 3,
      skills: ["Mengajar", "Komunikasi", "Public Speaking"],
      rating: 4.8, reviews: 41, verified: true, urgent: false, posted: 2,
      desc: "Les privat SMA untuk mata pelajaran Matematika dan Fisika. Jadwal fleksibel."
    },
    {
      id: "j14", title: "Desain Logo UMKM", org: "Kriya Lokal", cat: "kreatif", type: "freelance",
      city: "yogyakarta", area: "Kotagede", lat: -7.8180, lng: 110.3980,
      pay: 350000, unit: "proyek", hours: 0, days: [], start: "", end: "", slots: 1,
      skills: ["Desain Grafis", "Adobe Illustrator"],
      rating: 4.6, reviews: 6, verified: false, urgent: false, posted: 5,
      desc: "UMKM kerajinan perak butuh logo + kartu nama. Revisi 3x, aset file vektor."
    },
    {
      id: "j15", title: "Fotografer Wisuda", org: "Lensa Jogja", cat: "kreatif", type: "freelance",
      city: "yogyakarta", area: "Bulaksumur", lat: -7.7710, lng: 110.3790,
      pay: 400000, unit: "proyek", hours: 3, days: [], start: "", end: "", slots: 2,
      skills: ["Fotografi", "Komunikasi"],
      rating: 4.9, reviews: 52, verified: true, urgent: true, posted: 1,
      desc: "Sesi foto wisuda 1 jam + editing 15 foto. Musim wisuda, banyak slot tersedia."
    },

    {
      id: "j16", title: "Kasir Warung Nusa", org: "Warung Nusa", cat: "fnb", type: "shift",
      city: "surabaya", area: "Gubeng", lat: -7.2700, lng: 112.7500,
      pay: 20000, unit: "jam", hours: 5, days: ["sen", "sel", "rab", "kam"],
      start: "11:00", end: "16:00", slots: 1,
      skills: ["Kasir", "Pelayanan Pelanggan"],
      rating: 4.3, reviews: 22, verified: true, urgent: false, posted: 4,
      desc: "Melayani pesanan makan siang, mencatat stok, dan menjaga kebersihan area."
    },
    {
      id: "j17", title: "Barista Shift Malam", org: "Kopi Senja", cat: "fnb", type: "shift",
      city: "surabaya", area: "Tunjungan", lat: -7.2580, lng: 112.7380,
      pay: 24000, unit: "jam", hours: 4, days: ["kam", "jum", "sab"],
      start: "18:00", end: "22:00", slots: 2,
      skills: ["Barista", "Pelayanan Pelanggan"],
      rating: 4.6, reviews: 33, verified: true, urgent: false, posted: 2,
      desc: "Shift malam di area ramai. Bonus untuk yang bisa latte art."
    },
    {
      id: "j18", title: "Editor Video 8 Reel", org: "Agensi Kelana", cat: "kreatif", type: "freelance",
      city: "surabaya", area: "Darmo", lat: -7.2900, lng: 112.7350,
      pay: 600000, unit: "proyek", hours: 0, days: [], start: "", end: "", slots: 1,
      skills: ["Video Editing", "TikTok", "Instagram"],
      rating: 4.5, reviews: 9, verified: true, urgent: true, posted: 1,
      desc: "Edit 8 video pendek vertikal dari footage mentah. Caption dan transisi disiapkan."
    },
    {
      id: "j19", title: "Admin Online Shop", org: "Toko Buku Aksara", cat: "admin", type: "shift",
      city: "surabaya", area: "Rungkut", lat: -7.3100, lng: 112.7800,
      pay: 19000, unit: "jam", hours: 4, days: ["sen", "sel", "rab", "kam", "jum"],
      start: "09:00", end: "13:00", slots: 1,
      skills: ["Administrasi", "Microsoft Excel", "Data Entry"],
      rating: 4.2, reviews: 18, verified: true, urgent: false, posted: 9,
      desc: "Memproses pesanan marketplace, cetak label, dan membalas chat pembeli."
    },
    {
      id: "j20", title: "Crew Pameran Edukasi", org: "Eventia", cat: "event", type: "gig",
      city: "surabaya", area: "Kenjeran", lat: -7.2300, lng: 112.7700,
      pay: 160000, unit: "hari", hours: 8, days: ["sab", "min"], start: "08:00", end: "16:00", slots: 15,
      skills: ["Komunikasi", "Public Speaking"],
      rating: 4.0, reviews: 47, verified: false, urgent: false, posted: 3,
      desc: "Mendampingi pengunjung pameran edukasi, mengisi form, dan menjaga booth."
    },

    {
      id: "j21", title: "Barista Kafe Kampus", org: "Kopi Senja", cat: "fnb", type: "shift",
      city: "malang", area: "Soekarno Hatta", lat: -7.9550, lng: 112.6150,
      pay: 18000, unit: "jam", hours: 4, days: ["sen", "sel", "rab"],
      start: "08:00", end: "12:00", slots: 2,
      skills: ["Barista", "Komunikasi"],
      rating: 4.4, reviews: 26, verified: true, urgent: false, posted: 5,
      desc: "Kafe dekat kampus, pelanggan mayoritas mahasiswa. Ramah untuk yang baru belajar."
    },
    {
      id: "j22", title: "Desain Kemasan Produk", org: "Studio Rupa", cat: "kreatif", type: "freelance",
      city: "malang", area: "Klojen", lat: -7.9800, lng: 112.6300,
      pay: 500000, unit: "proyek", hours: 0, days: [], start: "", end: "", slots: 1,
      skills: ["Desain Grafis", "Adobe Illustrator"],
      rating: 4.7, reviews: 11, verified: true, urgent: false, posted: 4,
      desc: "Desain kemasan snack lokal, termasuk mockup dan file siap cetak."
    },
    {
      id: "j23", title: "Tutor Kimia SMA", org: "Bimbel Cerdas", cat: "tutor", type: "shift",
      city: "malang", area: "Lowokwaru", lat: -7.9400, lng: 112.6100,
      pay: 48000, unit: "jam", hours: 2, days: ["rab", "jum"],
      start: "16:00", end: "18:00", slots: 1,
      skills: ["Mengajar", "Komunikasi"],
      rating: 4.8, reviews: 35, verified: true, urgent: false, posted: 6,
      desc: "Kelas persiapan ujian. Modul dan latihan soal sudah tersedia."
    },
    {
      id: "j24", title: "Staf Toko Buku", org: "Toko Buku Aksara", cat: "retail", type: "shift",
      city: "malang", area: "Ijen", lat: -7.9700, lng: 112.6250,
      pay: 19000, unit: "jam", hours: 5, days: ["sab", "min"],
      start: "09:00", end: "14:00", slots: 1,
      skills: ["Kasir", "Manajemen Stok", "Pelayanan Pelanggan"],
      rating: 4.3, reviews: 14, verified: false, urgent: true, posted: 1,
      desc: "Menata rak, melayani pembeli, dan membantu event bedah buku bulanan."
    },
    {
      id: "j25", title: "Kurir Sepeda Area Kampus", org: "KirimAja", cat: "logistik", type: "gig",
      city: "malang", area: "Sumbersari", lat: -7.9500, lng: 112.6200,
      pay: 15000, unit: "paket", hours: 3, days: ["sen", "sel", "rab", "kam", "jum"],
      start: "10:00", end: "13:00", slots: 4,
      skills: ["Pengiriman", "Komunikasi"],
      rating: 4.1, reviews: 58, verified: true, urgent: false, posted: 2,
      desc: "Antar paket ringan antar-fakultas. Sepeda disediakan, dibayar per paket."
    },

    {
      id: "j26", title: "Barista Shift Sore", org: "Kopi Senja", cat: "fnb", type: "shift",
      city: "semarang", area: "Pandanaran", lat: -7.0000, lng: 110.4100,
      pay: 19000, unit: "jam", hours: 4, days: ["sel", "kam", "jum"],
      start: "15:00", end: "19:00", slots: 1,
      skills: ["Barista", "Pelayanan Pelanggan"],
      rating: 4.5, reviews: 20, verified: true, urgent: false, posted: 3,
      desc: "Menyiapkan minuman, menjaga area bar, dan menutup kas sore."
    },
    {
      id: "j27", title: "Admin Input Data", org: "Arsip Nusa", cat: "data", type: "shift",
      city: "semarang", area: "Pleburan", lat: -6.9900, lng: 110.4200,
      pay: 18000, unit: "jam", hours: 4, days: ["sen", "rab", "jum"],
      start: "10:00", end: "14:00", slots: 2,
      skills: ["Data Entry", "Microsoft Excel", "Riset"],
      rating: 4.2, reviews: 9, verified: false, urgent: false, posted: 7,
      desc: "Memindahkan arsip fisik ke spreadsheet dan memeriksa duplikasi data."
    },
    {
      id: "j28", title: "Content Writer Artikel", org: "Agensi Kelana", cat: "konten", type: "freelance",
      city: "semarang", area: "Remote", lat: -6.9666, lng: 110.4167, remote: true,
      pay: 250000, unit: "proyek", hours: 0, days: [], start: "", end: "", slots: 1,
      skills: ["Penulisan Artikel", "Copywriting", "Riset"],
      rating: 4.6, reviews: 17, verified: true, urgent: false, posted: 2,
      desc: "5 artikel 800 kata, topik gaya hidup. Bisa dikerjakan dari mana saja."
    },
    {
      id: "j29", title: "Crew Weekend Warung Nusa", org: "Warung Nusa", cat: "fnb", type: "shift",
      city: "semarang", area: "Tembalang", lat: -7.0500, lng: 110.4400,
      pay: 20000, unit: "jam", hours: 6, days: ["sab", "min"],
      start: "10:00", end: "16:00", slots: 2,
      skills: ["Kasir", "Pelayanan Pelanggan"],
      rating: 4.3, reviews: 25, verified: true, urgent: false, posted: 4,
      desc: "Melayani pelanggan akhir pekan, menyiapkan meja, dan mencatat pesanan."
    },
    {
      id: "j30", title: "Fotografer Produk UMKM", org: "Lensa Jogja", cat: "kreatif", type: "freelance",
      city: "semarang", area: "Simpang Lima", lat: -6.9900, lng: 110.4150,
      pay: 450000, unit: "proyek", hours: 4, days: [], start: "", end: "", slots: 1,
      skills: ["Fotografi", "Video Editing"],
      rating: 4.4, reviews: 7, verified: false, urgent: true, posted: 1,
      desc: "Foto 15 produk makanan untuk katalog online, termasuk 3 video pendek."
    },

    {
      id: "j31", title: "Desain Carousel Instagram", org: "Studio Rupa", cat: "kreatif", type: "freelance",
      city: "bandung", area: "Remote", lat: -6.9175, lng: 107.6191, remote: true,
      pay: 275000, unit: "proyek", hours: 0, days: [], start: "", end: "", slots: 2,
      skills: ["Canva", "Desain Grafis", "Content Planning"],
      rating: 4.5, reviews: 23, verified: true, urgent: false, posted: 3,
      desc: "10 slide carousel edukasi. Template sudah ada, tinggal disesuaikan brand."
    },
    {
      id: "j32", title: "Asisten Riset Data (Paruh Waktu)", org: "Arsip Nusa", cat: "data", type: "shift",
      city: "bandung", area: "Remote", lat: -6.9175, lng: 107.6191, remote: true,
      pay: 30000, unit: "jam", hours: 3, days: ["sen", "sel", "rab", "kam", "jum"],
      start: "19:00", end: "22:00", slots: 1,
      skills: ["Riset", "Microsoft Excel", "Data Entry"],
      rating: 4.6, reviews: 13, verified: true, urgent: false, posted: 5,
      desc: "Membersihkan dan merapikan dataset survei. Bisa dikerjakan malam dari kos."
    },

    {
      id: "j33", title: "Crew Toko Lembang", org: "Toko Buku Aksara", cat: "retail", type: "shift",
      city: "bandung", area: "Lembang", lat: -6.8125, lng: 107.6175,
      pay: 19000, unit: "jam", hours: 5, days: ["sab", "min"],
      start: "09:00", end: "14:00", slots: 2,
      skills: ["Kasir", "Pelayanan Pelanggan", "Manajemen Stok"],
      rating: 4.3, reviews: 12, verified: true, urgent: false, posted: 2,
      desc: "Toko oleh-oleh di jalur Lembang. Membantu kasir, menata rak, dan packing pesanan."
    },
    {
      id: "j34", title: "Admin Gudang Soreang", org: "KirimAja", cat: "logistik", type: "shift",
      city: "bandung", area: "Soreang", lat: -7.0264, lng: 107.5183,
      pay: 20000, unit: "jam", hours: 6, days: ["sen", "sel", "rab", "kam", "jum"],
      start: "08:00", end: "14:00", slots: 1,
      skills: ["Administrasi", "Manajemen Stok", "Microsoft Excel"],
      rating: 4.1, reviews: 8, verified: false, urgent: true, posted: 1,
      desc: "Mencatat barang masuk-keluar, sortir paket, dan rekap stok harian di gudang."
    },
    {
      id: "j35", title: "Barista Kafe Padalarang", org: "Kopi Senja", cat: "fnb", type: "shift",
      city: "bandung", area: "Padalarang", lat: -6.8431, lng: 107.4825,
      pay: 21000, unit: "jam", hours: 4, days: ["jum", "sab"],
      start: "15:00", end: "19:00", slots: 1,
      skills: ["Barista", "Komunikasi"],
      rating: 4.4, reviews: 16, verified: true, urgent: false, posted: 3,
      desc: "Kafe dekat stasiun Padalarang. Shift sore untuk penumpang pulang kerja."
    },
    {
      id: "j36", title: "Kasir Cabang Bekasi", org: "Warung Nusa", cat: "retail", type: "shift",
      city: "jakarta", area: "Bekasi", lat: -6.2383, lng: 106.9756,
      pay: 23000, unit: "jam", hours: 6, days: ["sab", "min"],
      start: "10:00", end: "16:00", slots: 2,
      skills: ["Kasir", "Pelayanan Pelanggan"],
      rating: 4.2, reviews: 19, verified: true, urgent: false, posted: 4,
      desc: "Cabang baru di Bekasi. Melayani pembeli, buka-tutup kas, dan cek stok harian."
    },
    {
      id: "j37", title: "Tutor Privat Depok", org: "Bimbel Cerdas", cat: "tutor", type: "shift",
      city: "jakarta", area: "Depok", lat: -6.4025, lng: 106.7942,
      pay: 52000, unit: "jam", hours: 2, days: ["sen", "rab", "jum"],
      start: "16:00", end: "18:00", slots: 2,
      skills: ["Mengajar", "Komunikasi", "Public Speaking"],
      rating: 4.7, reviews: 24, verified: true, urgent: false, posted: 2,
      desc: "Les privat SMP di rumah siswa kawasan Depok. Transport ditanggung mitra."
    },
    {
      id: "j38", title: "Desain Feed Kafe (Batu)", org: "Studio Rupa", cat: "kreatif", type: "freelance",
      city: "malang", area: "Batu", lat: -7.8672, lng: 112.5239,
      pay: 380000, unit: "proyek", hours: 0, days: [], start: "", end: "", slots: 1,
      skills: ["Desain Grafis", "Canva", "Content Planning"],
      rating: 4.5, reviews: 5, verified: false, urgent: false, posted: 6,
      desc: "8 desain feed + 3 story untuk kafe wisata di Batu. Brief dan foto tersedia."
    }
  ]
};

/* expose ke global: `const` di top-level script tidak otomatis jadi properti window */
window.SIFELA_DATA = SIFELA_DATA;
