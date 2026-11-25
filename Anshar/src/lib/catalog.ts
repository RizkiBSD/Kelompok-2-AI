import portfolioData from "@/data/portfolio.json";

export type ServiceId = "sketsa" | "lineart" | "fullcolor" | "fanart";

export interface Service {
  id: ServiceId;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  includes: string[];
  turnaround: string;
  art: string;
  tint: string;
  tone: "basic" | "advanced";
}

export const SERVICES: Service[] = [
  {
    id: "sketsa",
    name: "Sketsa Pensil",
    tagline: "Garis dasar, presisi pensil",
    description:
      "Studi pensil bersih dengan proporsi terukur. Cocok untuk draft visual, bagan sederhana, dan bahan presentasi.",
    basePrice: 150000,
    includes: [
      "Media kertas drawing 120gsm",
      "Pensil grafit 2B–6B",
      "Maks. 2 revisi tahap sketsa",
      "Scan digital resolusi standar",
    ],
    turnaround: "5–7 hari kerja",
    art: "/artwork/artwork-01.svg",
    tint: "#cbbba0",
    tone: "basic",
  },
  {
    id: "lineart",
    name: "Lineart Tinta",
    tagline: "Ketebalan 0.1 · 0.3 · 0.5",
    description:
      "Penintaan manual dengan drawing pen variasi. Kontras tajam, siap dipindai untuk kebutuhan cetak maupun dokumentasi.",
    basePrice: 200000,
    includes: [
      "Drawing pen 0.1 / 0.3 / 0.5",
      "Cross-hatching manual",
      "Maks. 2 revisi tahap sketsa",
      "Scan digital resolusi standar",
    ],
    turnaround: "5–7 hari kerja",
    art: "/artwork/artwork-04.svg",
    tint: "#b5a07a",
    tone: "basic",
  },
  {
    id: "fullcolor",
    name: "Full Color",
    tagline: "Marker & pensil warna",
    description:
      "Pewarnaan manual penuh dengan marker alkohol atau pensil warna. Lapisan warna bertahap, hasil akhir dipernis pelindung.",
    basePrice: 350000,
    includes: [
      "Marker / pensil warna artist-grade",
      "Lapisan fixative pelindung",
      "Maks. 2 revisi tahap sketsa",
      "Scan digital HD 300 DPI",
    ],
    turnaround: "7–10 hari kerja",
    art: "/artwork/artwork-07.svg",
    tint: "#b5651d",
    tone: "advanced",
  },
  {
    id: "fanart",
    name: "Redraw Fanart",
    tagline: "Personal use only",
    description:
      "Redraw karakter favorit dengan interpretasi manual. Ketat untuk koleksi pribadi — tanpa hak komersial apa pun.",
    basePrice: 300000,
    includes: [
      "Lineart + coloring manual",
      "Maks. 2 revisi tahap sketsa",
      "Scan digital HD 300 DPI",
      "Lisensi personal use (non-komersial)",
    ],
    turnaround: "7–10 hari kerja",
    art: "/artwork/artwork-10.svg",
    tint: "#8e5b7c",
    tone: "advanced",
  },
];

export const SIZES = [
  { id: "a4", label: "A4", detail: "21 × 29,7 cm", modifier: 0 },
  { id: "a3", label: "A3", detail: "29,7 × 42 cm", modifier: 50000 },
] as const;

export const COMPLEXITY = [
  { id: "sederhana", label: "Sederhana", detail: "1 subjek, latar minimal", modifier: 0 },
  { id: "kompleks", label: "Kompleks", detail: "Multi-subjek, detail tinggi", modifier: 75000 },
] as const;

export const DEADLINES = [
  { id: "standar", label: "Standar", detail: "5–7 hari kerja", multiplier: 1 },
  { id: "express", label: "Express", detail: "2–3 hari kerja", multiplier: 1.25 },
] as const;

export const ADDONS = [
  { id: "revisi", label: "Ekstra Revisi", detail: "1 sesi revisi tambahan", price: 15000 },
  { id: "scan", label: "Scan Digital HD", detail: "Berkas 300 DPI, siap cetak", price: 10000 },
  { id: "packaging", label: "Packaging Aman Ekstra", detail: "Bubble wrap + karton sudut", price: 8000 },
] as const;

export const DP_RATE = 0.5;

export interface QuoteInput {
  serviceId: ServiceId;
  sizeId: string;
  complexityId: string;
  deadlineId: string;
  addons: string[];
}

export interface QuoteLine {
  label: string;
  amount: number;
  note?: string;
}

export interface Quote {
  lines: QuoteLine[];
  subtotal: number;
  total: number;
  dp: number;
  remaining: number;
}

export function calculateQuote(input: QuoteInput): Quote {
  const service = SERVICES.find((s) => s.id === input.serviceId) ?? SERVICES[0];
  const size = SIZES.find((s) => s.id === input.sizeId) ?? SIZES[0];
  const complexity =
    COMPLEXITY.find((c) => c.id === input.complexityId) ?? COMPLEXITY[0];
  const deadline = DEADLINES.find((d) => d.id === input.deadlineId) ?? DEADLINES[0];

  const lines: QuoteLine[] = [
    { label: service.name, amount: service.basePrice, note: "harga dasar" },
  ];

  if (size.modifier > 0) lines.push({ label: `Ukuran ${size.label}`, amount: size.modifier });
  if (complexity.modifier > 0)
    lines.push({ label: `Tingkat ${complexity.label}`, amount: complexity.modifier });

  const beforeDeadline = lines.reduce((a, b) => a + b.amount, 0);
  if (deadline.multiplier > 1) {
    const surcharge = Math.round(beforeDeadline * (deadline.multiplier - 1));
    lines.push({ label: "Deadline Express", amount: surcharge, note: "+25%" });
  }

  for (const id of input.addons) {
    const addon = ADDONS.find((a) => a.id === id);
    if (addon) lines.push({ label: addon.label, amount: addon.price });
  }

  const total = lines.reduce((a, b) => a + b.amount, 0);
  const dp = Math.round(total * DP_RATE);

  return { lines, subtotal: total, total, dp, remaining: total - dp };
}

export const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

/* ---------------- portfolio ---------------- */

export interface Artwork {
  id: number;
  title: string;
  category: string;
  service: ServiceId;
  medium: string;
  size: string;
  src: string;
  span: "tall" | "short" | "normal";
}

/**
 * Data portofolio dibaca dari `src/data/portfolio.json`.
 * Untuk menambah karya asli: taruh foto di `public/artwork/`, lalu tambahkan
 * satu objek baru di JSON tersebut (lihat README bagian "Menambah portofolio").
 */
type PortfolioEntry = {
  title: string;
  category: string;
  service: ServiceId;
  medium: string;
  size: string;
  src: string;
  span: "tall" | "short" | "normal";
};

export const PORTFOLIO: Artwork[] = (portfolioData as PortfolioEntry[]).map((r, i) => ({
  id: i + 1,
  title: r.title,
  category: r.category,
  service: r.service,
  medium: r.medium,
  size: r.size,
  src: r.src,
  span: r.span ?? "normal",
}));

/* ---------------- testimonials ---------------- */

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rani P.",
    role: "Mahasiswa Kedokteran",
    text: "Diagram anatominya rapi banget, labelnya jelas. Dosen sampai nanya pakai aplikasi apa — padahal manual.",
    rating: 5,
  },
  {
    name: "Bagas W.",
    role: "Siswa SMK Teknik",
    text: "Gambar teknik saya jadi lebih presisi dari punya teman sekelas. Revisi sketsa cepat, komunikasinya enak.",
    rating: 5,
  },
  {
    name: "Nadia S.",
    role: "Kolektor Fanart",
    text: "Redraw karakter favorit saya hasilnya mirip, dan yang penting ada tekstur manual yang nggak bisa ditiru AI.",
    rating: 5,
  },
  {
    name: "Fajar A.",
    role: "Mahasiswa Pertanian",
    text: "Butuh ilustrasi morfologi tanaman buat laporan praktikum, selesai 4 hari. Packing-nya aman, nggak ada lipatan.",
    rating: 4,
  },
  {
    name: "Sinta M.",
    role: "Guru Seni Budaya",
    text: "Saya order poster untuk pameran sekolah. Hasil marker-nya vivid, anak-anak suka. Worth the price.",
    rating: 5,
  },
  {
    name: "Dimas R.",
    role: "Mahasiswa Teknik Sipil",
    text: "Lineart-nya tegas dan bersih. Sudah tiga kali order dan kualitasnya konsisten.",
    rating: 5,
  },
];

/* ---------------- capacity ---------------- */

export const CAPACITY = {
  weeklyQuota: 7,
  minQuota: 3,
};

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Intake Request",
    desc: "Isi form spesifikasi: unggah referensi, pilih ukuran kertas, tingkat kesulitan, dan deadline.",
  },
  {
    n: "02",
    title: "Quoting",
    desc: "Sistem menghitung harga pasti secara otomatis. Untuk request khusus, admin meninjau dalam 1×24 jam.",
  },
  {
    n: "03",
    title: "DP 50%",
    desc: "Pembayaran di muka 50% via QRIS, Virtual Account, e-wallet, atau transfer manual.",
  },
  {
    n: "04",
    title: "Approval & Revisi",
    desc: "Sketsa pensil dikirim untuk disetujui. Maksimal 2 revisi gratis sebelum lanjut ke lineart.",
  },
  {
    n: "05",
    title: "Pelunasan & Kirim",
    desc: "Sisa 50% + ongkir dilunasi, karya dikemas aman dan diserahkan ke ekspedisi dengan nomor resi.",
  },
];
