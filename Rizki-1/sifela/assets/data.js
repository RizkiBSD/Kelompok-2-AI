/* ============================================================
   Sifela — Metadata tampilan
   Hanya berisi daftar kota, kategori, keahlian, hari, dan jenis pekerjaan.
   Lowongan dan data pengguna diambil dari Supabase, bukan data contoh.
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
  jobs: [],
  /* Lowongan nyata diambil dari Supabase (tabel jobs, status = approved). */
};

/* Diekspor sebagai modul ES agar ikut ter-bundling oleh Vite. */
export default SIFELA_DATA;
