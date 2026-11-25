import { CircleDot } from "lucide-react";
import { STUDIO } from "@/lib/site-config";

/**
 * Badge kuota. Angkanya diambil dari src/lib/site-config.ts
 * (kuotaMingguan & sisaSlot) - ubah di sana, tidak perlu sentuh kode ini.
 */
export default function CapacityBadge({ compact = false }: { compact?: boolean }) {
  const sisa = Math.max(0, STUDIO.sisaSlot);
  const full = sisa === 0;

  return (
    <div
      className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[0.72rem] ${
        full
          ? "border-[#b5651d]/40 bg-[#b5651d]/10 text-[#8a4a12]"
          : "border-[#4a6b5d]/35 bg-[#4a6b5d]/10 text-[#3c5648]"
      }`}
    >
      <CircleDot size={11} className={full ? "text-[#b5651d]" : "text-[#4a6b5d]"} />
      {full ? (
        <span>Kuota minggu ini penuh - masuk daftar tunggu</span>
      ) : (
        <span>
          Sisa <strong>{sisa}</strong> dari {STUDIO.kuotaMingguan} slot minggu ini
          {!compact && " \u00b7 buka Senin\u2013Sabtu"}
        </span>
      )}
    </div>
  );
}
