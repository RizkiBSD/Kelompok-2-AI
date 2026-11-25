"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ImagePlus,
  MessageCircle,
  Pencil,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import {
  ADDONS,
  COMPLEXITY,
  DEADLINES,
  SERVICES,
  SIZES,
  calculateQuote,
  formatIDR,
  type ServiceId,
} from "@/lib/catalog";
import { track, utmParams } from "@/lib/analytics";
import { STUDIO, waLink } from "@/lib/site-config";

type PaymentMethod = "qris" | "va" | "ewallet" | "manual";

interface FormState {
  serviceId: ServiceId;
  sizeId: string;
  complexityId: string;
  deadlineId: string;
  addons: string[];
  description: string;
  reference: { name: string; type: string; size: number; dataUrl?: string } | null;
  customer: {
    name: string;
    whatsapp: string;
    email: string;
    address: string;
    city: string;
    postal: string;
    notes: string;
  };
  payment: { method: PaymentMethod; channel: string };
  agree: boolean;
}

const STEP_TITLES = [
  "Pilih kategori",
  "Ukuran kertas",
  "Tingkat kesulitan",
  "Tenggat waktu",
  "Layanan tambahan",
  "Referensi & deskripsi",
  "Data pengiriman",
  "Pembayaran",
];

export default function OrderWizard() {
  const params = useSearchParams();
  const preset = params.get("layanan") as ServiceId | null;

  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [sent, setSent] = useState<{ message: string; url: string } | null>(null);

  const [form, setForm] = useState<FormState>({
    serviceId: preset && SERVICES.some((s) => s.id === preset) ? preset : "sketsa",
    sizeId: "a4",
    complexityId: "sederhana",
    deadlineId: "standar",
    addons: [],
    description: "",
    reference: null,
    customer: {
      name: "",
      whatsapp: "",
      email: "",
      address: "",
      city: "",
      postal: "",
      notes: "",
    },
    payment: { method: "qris", channel: "QRIS" },
    agree: false,
  });

  const quote = useMemo(
    () =>
      calculateQuote({
        serviceId: form.serviceId,
        sizeId: form.sizeId,
        complexityId: form.complexityId,
        deadlineId: form.deadlineId,
        addons: form.addons,
      }),
    [form.serviceId, form.sizeId, form.complexityId, form.deadlineId, form.addons]
  );

  useEffect(() => {
    if (step > 0 && !started) {
      setStarted(true);
      track("begin_checkout", {
        service_tier: form.serviceId,
        estimated_initial_price: quote.total,
        ...utmParams(),
      });
    }
  }, [step, started, form.serviceId, quote.total]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleAddon = (id: string) =>
    setForm((f) => ({
      ...f,
      addons: f.addons.includes(id) ? f.addons.filter((a) => a !== id) : [...f.addons, id],
    }));

  const onFile = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Berkas referensi harus berupa gambar (JPG/PNG/WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran berkas maksimal 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      set("reference", {
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl: String(reader.result),
      });
    reader.readAsDataURL(file);
    setError(null);
  };

  const validate = (s: number): string | null => {
    if (s === 6) {
      const c = form.customer;
      if (c.name.trim().length < 2) return "Nama lengkap wajib diisi.";
      if (!/^(\+?62|0)8[1-9][0-9]{6,11}$/.test(c.whatsapp.replace(/[\s-]/g, "")))
        return "Nomor WhatsApp tidak valid (contoh: 081234567890).";
      if (c.address.trim().length < 8) return "Alamat pengiriman terlalu singkat.";
      if (c.city.trim().length < 3) return "Kota/kabupaten wajib diisi.";
      if (!/^[0-9]{5}$/.test(c.postal.trim())) return "Kode pos harus 5 digit.";
    }
    if (s === 7 && !form.agree)
      return "Anda perlu menyetujui Syarat & Ketentuan serta penafian akademik.";
    return null;
  };

  const next = () => {
    const err = validate(step);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep((s) => Math.min(STEP_TITLES.length - 1, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = () => {
    const err = validate(7);
    if (err) {
      setError(err);
      return;
    }

    const svc = SERVICES.find((x) => x.id === form.serviceId);
    const sz = SIZES.find((x) => x.id === form.sizeId);
    const cx = COMPLEXITY.find((x) => x.id === form.complexityId);
    const dl = DEADLINES.find((x) => x.id === form.deadlineId);
    const adds = form.addons
      .map((a) => ADDONS.find((x) => x.id === a)?.label)
      .filter(Boolean)
      .join(", ");

    const lines = [
      `Halo ${STUDIO.artist}! Saya mau pesan komisi di Bantugambar.`,
      "",
      "——— DATA PEMESAN ———",
      `Nama: ${form.customer.name}`,
      `WhatsApp: ${form.customer.whatsapp}`,
      form.customer.email ? `Email: ${form.customer.email}` : "",
      `Alamat: ${form.customer.address}, ${form.customer.city} ${form.customer.postal}`,
      "",
      "——— SPESIFIKASI ———",
      `Layanan: ${svc?.name ?? form.serviceId}`,
      `Ukuran: ${sz?.label ?? form.sizeId}`,
      `Kesulitan: ${cx?.label ?? form.complexityId}`,
      `Tenggat: ${dl?.label ?? form.deadlineId}`,
      adds ? `Tambahan: ${adds}` : "",
      "",
      "——— DESKRIPSI ———",
      form.description.trim() || "(menyusul di chat)",
      form.reference ? `Referensi: ${form.reference.name} (dikirim ulang di chat)` : "",
      "",
      "——— BIAYA ———",
      `Total: ${formatIDR(quote.total)}`,
      `DP 50%: ${formatIDR(quote.dp)}`,
      `Metode pembayaran diinginkan: ${form.payment.channel}`,
      form.customer.notes.trim() ? `Catatan: ${form.customer.notes.trim()}` : "",
      "",
      "Mohon konfirmasi ketersediaan dan langkah pembayaran DP. Terima kasih!",
    ].filter(Boolean);

    const message = lines.join("\n");
    const url = waLink(message);

    track("form_submit", {
      total_price: quote.total,
      payment_method: form.payment.method,
      service_tier: form.serviceId,
      ...utmParams(),
    });

    setSent({ message, url });
    window.open(url, "_blank", "noopener");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progress = ((step + 1) / STEP_TITLES.length) * 100;

  if (sent) {
    return (
      <div className="mx-auto max-w-2xl py-10 text-center">
        <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#4a6b5d]/12 text-[#3c5648]">
          <Check size={28} />
        </div>
        <h2 className="font-display text-[1.6rem] font-bold text-[#23201c]">Pesanan Siap Dikirim</h2>
        <p className="mx-auto mt-3 max-w-md text-[0.85rem] leading-relaxed text-[#6b6257]">
          Ringkasan pesananmu sudah dibuka di tab WhatsApp baru. Kalau belum terbuka, klik tombol di bawah.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={sent.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary !px-6 !py-3 !text-[0.85rem]"
          >
            <MessageCircle size={15} /> Buka WhatsApp Lagi
          </a>
          <button
            onClick={() => navigator.clipboard?.writeText(sent.message)}
            className="btn btn-ghost !px-4 !py-2.5 !text-[0.8rem]"
          >
            <Copy size={14} /> Salin Ringkasan
          </button>
        </div>
        <div className="mt-8 text-left rounded border border-[rgba(35,32,28,0.14)] bg-[#fffdf9] p-5">
          <p className="eyebrow mb-3">Detail ringkasan</p>
          <pre className="whitespace-pre-wrap text-[0.78rem] leading-relaxed text-[#4a443c]">{sent.message}</pre>
        </div>
        <div className="mt-8 border-t border-[rgba(35,32,28,0.12)] pt-6 text-[0.72rem] text-[#8a8074]">
          <p>Selanjutnya:</p>
          <ol className="mx-auto mt-2 max-w-md list-decimal text-left space-y-1 pl-5">
            <li>Tunggu balasan WhatsApp dari {STUDIO.artist} untuk konfirmasi slot & pembayaran DP.</li>
            <li>Kirim foto referensi jika belum dikirim melalui chat.</li>
            <li>DP 50% ditransfer, proses pengerjaan dimulai.</li>
          </ol>
          <p className="mt-4">Biasanya dibalas dalam 1×24 jam.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
      {/* ---------------- wizard ---------------- */}
      <div>
        {/* progress */}
        <div className="mb-9">
          <div className="mb-2 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.16em] text-[#8b7355]">
            <span>
              Langkah {step + 1} / {STEP_TITLES.length}
            </span>
            <span>{STEP_TITLES[step]}</span>
          </div>
          <div className="relative h-[3px] w-full bg-[rgba(35,32,28,0.12)]">
            <div
              className="absolute inset-y-0 left-0 bg-[#23201c] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 text-[#23201c] transition-all duration-500 ease-out"
              style={{ left: `calc(${progress}% - 10px)` }}
            >
              <Pencil size={18} className="-rotate-45" strokeWidth={2.2} />
            </div>
          </div>
        </div>

        <div key={step} className="animate-[fadeIn_.45s_ease-out]">
          {/* STEP 0 — service */}
          {step === 0 && (
            <Section
              title="Mau dibuat apa?"
              hint="Pilih kategori karya. Harga di kanan menyesuaikan otomatis."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    className="choice"
                    data-selected={form.serviceId === s.id}
                    onClick={() => set("serviceId", s.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-[1rem] font-bold text-[#23201c]">{s.name}</p>
                        <p className="mt-0.5 text-[0.68rem] uppercase tracking-[0.12em] text-[#8b7355]">
                          {s.tagline}
                        </p>
                      </div>
                      {form.serviceId === s.id && <Check size={16} className="mt-1 text-[#23201c]" />}
                    </div>
                    <p className="mt-2 text-[0.76rem] leading-relaxed text-[#6b6257] line-clamp-2">
                      {s.description}
                    </p>
                    <p className="mt-2 text-[0.78rem] font-semibold text-[#23201c]">
                      {formatIDR(s.basePrice)}
                    </p>
                  </button>
                ))}
              </div>
            </Section>
          )}

          {/* STEP 1 — size */}
          {step === 1 && (
            <Section title="Ukuran kertas" hint="Semua karya dikerjakan di kertas drawing 120gsm.">
              <div className="grid gap-3 sm:grid-cols-2">
                {SIZES.map((s) => (
                  <button
                    key={s.id}
                    className="choice"
                    data-selected={form.sizeId === s.id}
                    onClick={() => set("sizeId", s.id)}
                  >
                    <p className="font-display text-[1.4rem] font-bold text-[#23201c]">{s.label}</p>
                    <p className="text-[0.75rem] text-[#6b6257]">{s.detail}</p>
                    <p className="mt-1.5 text-[0.72rem] font-medium text-[#8b7355]">
                      {s.modifier === 0 ? "termasuk" : `+ ${formatIDR(s.modifier)}`}
                    </p>
                  </button>
                ))}
              </div>
            </Section>
          )}

          {/* STEP 2 — complexity */}
          {step === 2 && (
            <Section
              title="Seberapa rumit?"
              hint="Hitung jumlah subjek dan kebutuhan detail latar."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {COMPLEXITY.map((c) => (
                  <button
                    key={c.id}
                    className="choice"
                    data-selected={form.complexityId === c.id}
                    onClick={() => set("complexityId", c.id)}
                  >
                    <p className="font-display text-[1rem] font-bold text-[#23201c]">{c.label}</p>
                    <p className="mt-0.5 text-[0.75rem] text-[#6b6257]">{c.detail}</p>
                    <p className="mt-1.5 text-[0.72rem] font-medium text-[#8b7355]">
                      {c.modifier === 0 ? "termasuk" : `+ ${formatIDR(c.modifier)}`}
                    </p>
                  </button>
                ))}
              </div>
            </Section>
          )}

          {/* STEP 3 — deadline */}
          {step === 3 && (
            <Section title="Kapan dibutuhkan?" hint="Slot express terbatas 2 proyek per minggu.">
              <div className="grid gap-3 sm:grid-cols-2">
                {DEADLINES.map((d) => (
                  <button
                    key={d.id}
                    className="choice"
                    data-selected={form.deadlineId === d.id}
                    onClick={() => set("deadlineId", d.id)}
                  >
                    <p className="font-display text-[1rem] font-bold text-[#23201c]">{d.label}</p>
                    <p className="mt-0.5 text-[0.75rem] text-[#6b6257]">{d.detail}</p>
                    <p className="mt-1.5 text-[0.72rem] font-medium text-[#8b7355]">
                      {d.multiplier === 1 ? "tanpa biaya tambahan" : "+25% dari subtotal"}
                    </p>
                  </button>
                ))}
              </div>
            </Section>
          )}

          {/* STEP 4 — addons */}
          {step === 4 && (
            <Section title="Tambahan opsional" hint="Boleh dilewati — semua ini tidak wajib.">
              <div className="grid gap-3">
                {ADDONS.map((a) => {
                  const on = form.addons.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      className="choice flex items-center justify-between gap-3"
                      data-selected={on}
                      onClick={() => toggleAddon(a.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
                            on ? "border-[#23201c] bg-[#23201c] text-[#faf8f5]" : "border-[rgba(35,32,28,0.3)]"
                          }`}
                        >
                          {on && <Check size={12} />}
                        </span>
                        <div className="text-left">
                          <p className="text-[0.86rem] font-semibold text-[#23201c]">{a.label}</p>
                          <p className="text-[0.72rem] text-[#6b6257]">{a.detail}</p>
                        </div>
                      </div>
                      <p className="shrink-0 text-[0.8rem] font-semibold text-[#23201c]">
                        + {formatIDR(a.price)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </Section>
          )}

          {/* STEP 5 — reference */}
          {step === 5 && (
            <Section
              title="Referensi & deskripsi"
              hint="Semakin jelas referensinya, semakin kecil kemungkinan revisi."
            >
              <label className="block cursor-pointer border border-dashed border-[rgba(35,32,28,0.28)] bg-[#fffdf9] px-5 py-8 text-center transition hover:border-[#8b7355] hover:bg-[#f2ede4]/40">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                />
                {form.reference ? (
                  <div className="flex items-center justify-center gap-3">
                    {form.reference.dataUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={form.reference.dataUrl}
                        alt="referensi"
                        className="h-14 w-14 border border-[rgba(35,32,28,0.15)] object-cover"
                      />
                    )}
                    <div className="text-left">
                      <p className="text-[0.82rem] font-semibold text-[#23201c]">
                        {form.reference.name}
                      </p>
                      <p className="text-[0.7rem] text-[#8b7355]">
                        {(form.reference.size / 1024).toFixed(0)} KB · klik untuk ganti
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[#8b7355]">
                    <ImagePlus size={22} />
                    <p className="text-[0.82rem] font-medium">Unggah gambar referensi</p>
                    <p className="text-[0.7rem] text-[#8a8074]">JPG / PNG / WebP · maks. 5 MB</p>
                  </div>
                )}
              </label>

              <div className="mt-4">
                <label className="mb-1.5 block text-[0.75rem] font-medium text-[#4a443c]">
                  Deskripsi kebutuhan
                </label>
                <textarea
                  className="field min-h-[110px] resize-y"
                  placeholder="Contoh: diagram anatomi jantung tampak depan, diberi label bahasa Indonesia, gaya ilustrasi buku ajar."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
                <p className="mt-1.5 text-[0.68rem] text-[#8a8074]">
                  {form.description.length}/600 karakter
                </p>
              </div>
            </Section>
          )}

          {/* STEP 6 — customer */}
          {step === 6 && (
            <Section title="Data pengiriman" hint="Karya fisik dikirim, jadi alamat harus lengkap.">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <Field label="Nama lengkap" required>
                  <input
                    className="field"
                    placeholder="Nama penerima"
                    value={form.customer.name}
                    onChange={(e) =>
                      set("customer", { ...form.customer, name: e.target.value })
                    }
                  />
                </Field>
                <Field label="WhatsApp" required>
                  <input
                    className="field"
                    placeholder="081234567890"
                    inputMode="tel"
                    value={form.customer.whatsapp}
                    onChange={(e) =>
                      set("customer", { ...form.customer, whatsapp: e.target.value })
                    }
                  />
                </Field>
                <Field label="Email (opsional)">
                  <input
                    className="field"
                    type="email"
                    placeholder="nama@email.com"
                    value={form.customer.email}
                    onChange={(e) =>
                      set("customer", { ...form.customer, email: e.target.value })
                    }
                  />
                </Field>
                <Field label="Kode pos" required>
                  <input
                    className="field"
                    placeholder="76111"
                    inputMode="numeric"
                    maxLength={5}
                    value={form.customer.postal}
                    onChange={(e) =>
                      set("customer", {
                        ...form.customer,
                        postal: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Alamat lengkap" required>
                    <textarea
                      className="field min-h-[80px] resize-y"
                      placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                      value={form.customer.address}
                      onChange={(e) =>
                        set("customer", { ...form.customer, address: e.target.value })
                      }
                    />
                  </Field>
                </div>
                <Field label="Kota / Kabupaten" required>
                  <input
                    className="field"
                    placeholder="Semarang"
                    value={form.customer.city}
                    onChange={(e) =>
                      set("customer", { ...form.customer, city: e.target.value })
                    }
                  />
                </Field>
                <Field label="Catatan untuk seniman (opsional)">
                  <input
                    className="field"
                    placeholder="Contoh: warna dominan biru, jangan pakai latar"
                    value={form.customer.notes}
                    onChange={(e) =>
                      set("customer", { ...form.customer, notes: e.target.value })
                    }
                  />
                </Field>
              </div>
              <p className="mt-4 flex items-start gap-2 border border-[rgba(35,32,28,0.12)] bg-[#f2ede4]/60 px-3.5 py-3 text-[0.72rem] leading-relaxed text-[#6b6257]">
                <Truck size={14} className="mt-0.5 shrink-0 text-[#8b7355]" />
                Ongkos kirim dihitung terpisah saat pelunasan, berdasarkan berat &amp; dimensi
                paket melalui RajaOngkir (JNE / J&amp;T / SiCepat).
              </p>
            </Section>
          )}

          {/* STEP 7 — payment */}
          {step === 7 && (
            <Section title="Metode pembayaran DP" hint="Pilih metode yang kamu inginkan. Detail pembayaran & nomor rekening dikirim lewat WhatsApp setelah pesanan dicek.">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { id: "qris", label: "QRIS", detail: "Scan dari semua e-wallet & m-banking", icon: Wallet },
                  { id: "va", label: "Virtual Account", detail: "BCA · Mandiri · BRI · BNI", icon: Wallet },
                  { id: "ewallet", label: "E-Wallet", detail: "GoPay · OVO · ShopeePay · DANA", icon: Wallet },
                  { id: "manual", label: "Transfer Manual", detail: "Konfirmasi bukti transfer via WhatsApp", icon: ShieldCheck },
                ].map((m) => (
                  <button
                    key={m.id}
                    className="choice"
                    data-selected={form.payment.method === m.id}
                    onClick={() => set("payment", { method: m.id as PaymentMethod, channel: m.label })}
                  >
                    <div className="flex items-center gap-2.5">
                      <m.icon size={16} className="text-[#8b7355]" />
                      <p className="text-[0.9rem] font-semibold text-[#23201c]">{m.label}</p>
                    </div>
                    <p className="mt-1 text-[0.72rem] text-[#6b6257]">{m.detail}</p>
                  </button>
                ))}
              </div>

              <div className="mt-5 border border-[rgba(35,32,28,0.14)] bg-[#fffdf9] p-4">
                <div className="flex items-center justify-between text-[0.85rem]">
                  <span className="text-[#4a443c]">Total pesanan</span>
                  <span className="font-semibold text-[#23201c]">{formatIDR(quote.total)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[0.85rem]">
                  <span className="text-[#4a443c]">DP saat mulai (50%)</span>
                  <span className="font-semibold text-[#b5651d]">{formatIDR(quote.dp)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[0.85rem]">
                  <span className="text-[#4a443c]">Sisa saat pelunasan</span>
                  <span className="text-[#4a443c]">{formatIDR(quote.remaining)} + ongkir</span>
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-3 border border-[rgba(35,32,28,0.14)] bg-[#f2ede4]/50 p-4">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 accent-[#23201c]"
                  checked={form.agree}
                  onChange={(e) => set("agree", e.target.checked)}
                />
                <span className="text-[0.74rem] leading-relaxed text-[#4a443c]">
                  Saya menyetujui{" "}
                  <a href="/syarat-ketentuan" className="underline decoration-[#b5651d]">
                    Syarat &amp; Ketentuan
                  </a>{" "}
                  — termasuk kebijakan maksimal 2 revisi sketsa, DP tidak dapat dikembalikan
                  setelah sketsa disetujui, serta penafian bahwa karya ini adalah{" "}
                  <strong>referensi visual dan bahan belajar</strong>, bukan jasa pengerjaan tugas
                  akademik.
                </span>
              </label>
            </Section>
          )}
        </div>

        {error && (
          <p className="mt-5 border-l-2 border-[#b5651d] bg-[#b5651d]/8 px-3.5 py-2.5 text-[0.78rem] text-[#8a4a12]">
            {error}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            onClick={back}
            disabled={step === 0}
            className="btn btn-ghost !px-4 !py-2.5 !text-[0.8rem]"
          >
            <ArrowLeft size={14} /> Kembali
          </button>

          {step < STEP_TITLES.length - 1 ? (
            <button onClick={next} className="btn btn-primary !px-6 !py-3 !text-[0.85rem]">
              Lanjut <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={submit}
              className="btn btn-primary !px-6 !py-3 !text-[0.85rem]"
            >
              <>
                Kirim via WhatsApp · DP {formatIDR(quote.dp)} <MessageCircle size={15} />
              </>
            </button>
          )}
        </div>
      </div>

      {/* ---------------- sticky quote ---------------- */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="border border-[rgba(35,32,28,0.14)] bg-[#fffdf9]">
          <div className="border-b border-[rgba(35,32,28,0.12)] px-5 py-3.5">
            <p className="eyebrow">Estimasi biaya</p>
          </div>
          <div className="px-5 py-4">
            <ul className="space-y-2">
              {quote.lines.map((l, i) => (
                <li key={i} className="flex items-baseline justify-between gap-2 text-[0.78rem]">
                  <span className="text-[#4a443c]">
                    {l.label}
                    {l.note && <span className="ml-1 text-[0.65rem] text-[#8a8074]">({l.note})</span>}
                  </span>
                  <span className="shrink-0 tabular-nums text-[#23201c]">{formatIDR(l.amount)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-dashed border-[rgba(35,32,28,0.16)] pt-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[0.78rem] uppercase tracking-[0.14em] text-[#8b7355]">Total</span>
                <span
                  key={quote.total}
                  className="font-display text-[1.45rem] font-bold tabular-nums text-[#23201c] animate-[fadeIn_.4s_ease-out]"
                >
                  {formatIDR(quote.total)}
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between text-[0.76rem]">
                <span className="text-[#4a443c]">DP sekarang (50%)</span>
                <span className="font-semibold text-[#b5651d]">{formatIDR(quote.dp)}</span>
              </div>
            </div>
          </div>
          <div className="border-t border-[rgba(35,32,28,0.12)] bg-[#f2ede4]/60 px-5 py-3 text-[0.68rem] leading-relaxed text-[#6b6257]">
            Harga sudah termasuk kertas, tinta, dan scan standar. Ongkir dihitung terpisah saat
            pelunasan.
          </div>
        </div>

        <div className="mt-4 space-y-2 text-[0.7rem] text-[#8a8074]">
          <p className="flex items-center gap-2">
            <ShieldCheck size={13} className="text-[#8b7355]" /> Pembayaran DP lewat transfer
            manual, dikonfirmasi via WhatsApp
          </p>
          <p className="flex items-center gap-2">
            <Pencil size={13} className="text-[#8b7355]" /> Dikerjakan tangan, bukan AI render
          </p>
        </div>
      </aside>
    </div>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-[1.6rem] font-bold leading-tight text-[#23201c]">{title}</h2>
      <p className="mt-1.5 text-[0.82rem] text-[#6b6257]">{hint}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.75rem] font-medium text-[#4a443c]">
        {label} {required && <span className="text-[#b5651d]">*</span>}
      </span>
      {children}
    </label>
  );
}
