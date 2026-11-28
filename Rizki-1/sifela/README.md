# Sifela.id — Portal Lowongan Berbasis Supabase

Sifela.id adalah portal lowongan kerja paruh waktu, shift, freelance kecil, dan gig harian
untuk mahasiswa serta pemilik usaha. Aplikasi ini tidak lagi memakai data fiktif: seluruh
akun, lowongan, profil usaha, dokumen legalitas, dan lamaran disimpan di **Supabase**.

Lowongan yang tampil untuk publik hanya yang berstatus `approved`. Mitra wajib
mengunggah dokumen legalitas dan diverifikasi admin sebelum dapat memasang lowongan.
Lowongan baru selalu berstatus `pending` sampai admin menyetujuinya.

> Pembayaran (Sifela Plus / Mitra Pro), chat, dan notifikasi masih berupa simulasi UI.

---

## Arsitektur

| Lapisan | Teknologi |
| --- | --- |
| UI | HTML, CSS, JavaScript ES module |
| Build/dev | Vite |
| Auth & database | Supabase Auth + PostgreSQL |
| Berkas privat | Supabase Storage: bucket `cvs` dan `company_docs` |
| Akses data | Row Level Security (RLS) + trigger validasi |
| Deploy | Vercel, root directory `Rizki-1/sifela` |

Tabel utama:

- `profiles` — profil pengguna dengan `role` (`pelamar`, `mitra`, `admin`) dan `is_verified`.
- `jobs` — lowongan dengan `status` (`pending`, `approved`, `rejected`) dan `employer_id`.
- `applications` — lamaran beserta `cv_url` dan `cv_file_name`.

Aturan penting:

- Publik/pelamar hanya dapat membaca lowongan `approved`.
- Mitra hanya dapat mengubah dan menghapus lowongannya sendiri.
- Status lowongan dan verifikasi mitra hanya dapat diubah admin.
- CV dan dokumen legalitas disimpan pada bucket privat; tautan diakses lewat
  signed URL yang berlaku 1 jam.
- Klien browser tidak pernah memakai service role key.

Skema lengkap ada di [`supabase/schema.sql`](supabase/schema.sql) dan migration di
[`supabase/migrations/`](supabase/migrations/).

---

## Menjalankan secara lokal

1. Pastikan Node.js terpasang.
2. Salin `.env.example` menjadi `.env`, lalu isi:

   ```env
   VITE_SUPABASE_URL=https://PROJECT_ID.supabase.co
   VITE_SUPABASE_ANON_KEY=ANON_PUBLIC_KEY
   ```

3. Pasang dependency:

   ```bash
   npm install
   ```

4. Jalankan dev server:

   ```bash
   npm run dev
   ```

5. Build produksi:

   ```bash
   npm run build
   ```

Hasil build ada di folder `dist/`. Untuk mencoba hasil build:

```bash
npm run preview
```

File `.env` tidak boleh di-commit. Gunakan `.env.example` sebagai template.

---

## Supabase CLI

Proyek yang dipakai: `sifela-id` dengan project ref `ymqqxgubfyzpsguextco`.

Di Windows, jika `npx.ps1` diblokir execution policy, gunakan `npx.cmd`:

```powershell
& "C:\Program Files\nodejs\npx.cmd" --yes supabase login --token ACCESS_TOKEN
& "C:\Program Files\nodejs\npx.cmd" --yes supabase link --project-ref ymqqxgubfyzpsguextco
```

Untuk menerapkan migration ke database remote:

```powershell
$env:SUPABASE_DB_PASSWORD = 'DB_PASSWORD'
$env:SUPABASE_YES = '1'
& "C:\Program Files\nodejs\npx.cmd" --yes supabase db push --remote --yes
```

Untuk menjalankan query SQL remote:

```powershell
$env:SUPABASE_DB_PASSWORD = 'DB_PASSWORD'
& "C:\Program Files\nodejs\npx.cmd" --yes supabase db query --remote --read-only --output json \
  "select id, full_name, role, is_verified from public.profiles order by created_at desc"
```

---

## Akun admin

Akun admin awal: **admin@sifela.id**.

Kata sandi admin dibuat saat bootstrap dan harus disimpan aman. Jika perlu menggantinya,
lakukan lewat Supabase Dashboard → Authentication → Users, lalu pastikan profilnya
ber-role admin:

```sql
UPDATE public.profiles
SET role = 'admin', is_verified = true
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'admin@sifela.id'
);
```

Klik menu **Moderasi Admin** setelah login untuk:

- melihat mitra yang menunggu verifikasi beserta dokumen legalitasnya;
- menyetujui atau menolak lowongan yang masuk;
- memastikan hanya lowongan disetujui yang tampil di pencarian publik.

---

## Alur pengguna

### Mitra

1. Daftar sebagai **Pemilik Usaha** dan konfirmasi email.
2. Buka **Ubah profil & dokumen**, isi data usaha, lalu unggah legalitas/NIB.
3. Tunggu verifikasi admin.
4. Setelah terverifikasi, buka **Pasang lowongan**.
5. Lowongan berstatus `pending` sampai admin menyetujuinya.
6. Di dashboard mitra, lihat pelamar dan buka CV melalui signed URL.

### Pelamar

1. Daftar sebagai **Pencari Kerja** dan konfirmasi email.
2. Lengkapi profil, keahlian, jadwal, kota, dan CV pada **Akun & Profil**.
3. Cari lowongan approved, lalu kirim lamaran dengan CV asli.
4. Pantau status lamaran pada menu **Lamaran**.

### Admin

1. Login dengan akun admin.
2. Buka **Moderasi Admin**.
3. Periksa dokumen mitra, lalu verifikasi atau tolak.
4. Setujui atau tolak lowongan yang menunggu moderasi.

---

## Deployment Vercel

Konfigurasi sudah ada di [`vercel.json`](vercel.json):

- **Root Directory:** `Rizki-1/sifela`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

Tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` sebagai environment
variables di Vercel (Project Settings → Environment Variables), lalu deploy ulang
setelah perubahan kode atau `vercel.json`.

Sebagai cadangan agar deploy otomatis tetap berjalan tanpa konfigurasi dashboard,
`assets/supabase.js` memiliki nilai default untuk URL dan anon key proyek ini.
Keduanya adalah data publik dan aksesnya tetap dibatasi RLS. Nilai dari environment
variable selalu didahulukan daripada nilai default. Jangan pernah
menyimpan service role key atau DB password di kode, `vercel.json`, atau `.env`.

---

## Catatan

- Semua lowongan, organisasi, rating, dan ulasan fiktif sudah dihapus dari aplikasi
  dan database produksi.
- Session login disimpan oleh Supabase Auth di browser; data aplikasi tidak lagi
  disimpan di `localStorage`.
- Navigasi selalu menyediakan tombol kembali ke Beranda.
- Pembayaran, chat, dan notifikasi tetap simulasi dan tidak memproses transaksi nyata.
