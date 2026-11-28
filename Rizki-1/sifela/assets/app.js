/* ============================================================
   Sifela.id — aplikasi dengan backend Supabase
   ============================================================ */
import { supabase } from "./supabase.js";
import SIFELA_DATA from "./data.js";

(function () {
  "use strict";

  /* ---------------- konstanta ---------------- */
  const DATA = SIFELA_DATA;

  const FREE = { visibleJobs: 6, applies: 3, maxRadius: 10 };
  const MAX_RADIUS = 50;
  const FREE_PARTNER_JOBS = 2;
  const MATCH_MIN = 70;

  const PLANS = [
    { id: "bulanan", label: "1 Bulan", price: 29000, days: 30, note: "Paling fleksibel" },
    { id: "triwulan", label: "3 Bulan", price: 75000, days: 90, note: "Hemat 14%" },
    { id: "semester", label: "6 Bulan", price: 139000, days: 180, note: "Hemat 20%" }
  ];

  const PARTNER_PLANS = [
    { id: "mitra-bulanan", label: "1 Bulan", price: 49000, days: 30, note: "Mulai dari sini" },
    { id: "mitra-3bulan", label: "3 Bulan", price: 129000, days: 90, note: "Hemat 12%" },
    { id: "mitra-6bulan", label: "6 Bulan", price: 239000, days: 180, note: "Hemat 19%" }
  ];

  /* halaman yang bisa dibuka lewat #/nama-halaman */
  const TABS = ["beranda", "cari", "rekomendasi", "lamaran", "akun", "premium", "mitra", "checkout", "sukses"];

  /* warna aksen per kategori, dipakai di logo kartu lowongan */
  const CAT_COLOR = {
    fnb: "#c2410c", retail: "#7c3aed", kreatif: "#db2777", konten: "#0891b2",
    event: "#d97706", tutor: "#059669", admin: "#475569", logistik: "#0369a1",
    data: "#4f46e5", teknologi: "#0f172a"
  };

  const ICONS = {};
  DATA.categories.forEach(c => { ICONS[c.id] = c.icon; });
  const CAT_LABEL = {};
  DATA.categories.forEach(c => { CAT_LABEL[c.id] = c.label; });
  const TYPE_LABEL = {};
  DATA.types.forEach(t => { TYPE_LABEL[t.id] = t.label; });
  const DAY_LABEL = {};
  DATA.days.forEach(d => { DAY_LABEL[d.id] = d.label; });

  /* ---------------- state ---------------- */
  const state = {
    user: null,
    session: null,
    applications: [],
    employerApplications: [],
    employerLoadedFor: null,
    admin: { mitra: [], jobs: [] },
    adminLoadedFor: null,
    tab: "beranda",
    filters: {
      q: "", city: "bandung", radius: 10, cats: [], types: [],
      days: [], minPay: 0, scheduleOnly: false, matchOnly: false, sort: "relevance"
    },
    modal: null,
    checkout: { product: "plus", planId: "bulanan", method: "qris" }
  };

  /* ---------------- helper ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function fmtRp(n) {
    if (n >= 1000000) return "Rp" + (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + "jt";
    if (n >= 1000) return "Rp" + Math.round(n / 1000) + "rb";
    return "Rp" + n;
  }

  /* nominal penuh untuk halaman harga/pembayaran: Rp29.000 */
  function fmtRpFull(n) {
    return "Rp" + Number(n).toLocaleString("id-ID");
  }

  function unitLabel(u) {
    return { jam: "/jam", proyek: "/proyek", hari: "/hari", paket: "/paket", bulan: "/bulan" }[u] || "";
  }

  function payLabel(job) {
    if (!job || Number(job.pay) <= 0) return "Gaji tidak disebutkan";
    return fmtRp(job.pay) + unitLabel(job.unit);
  }

  function hourly(job) {
    if (job.unit === "jam") return job.pay;
    if (job.hours > 0) return Math.round(job.pay / job.hours);
    return null;
  }

  function initials(name) {
    return (name || "?").trim().split(/\s+/).slice(0, 2)
      .map(w => w[0] || "").join("").toUpperCase();
  }

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = d => d * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function cityOf(id) { return DATA.cities.find(c => c.id === id) || DATA.cities[0]; }

  function distanceTo(job) {
    if (job.remote) return 0;
    const c = cityOf(job.city);
    return haversine(c.lat, c.lng, job.lat, job.lng);
  }

  function km(d) {
    if (d <= 0) return "0 km";
    return d.toFixed(1).replace(".0", "") + " km";
  }

  /* area + jarak, tanpa mengulang "Remote" dua kali */
  function areaText(job) {
    const bits = [job.area];
    if (job.remote) {
      if (normalize(job.area) !== "remote") bits.push("Remote");
    } else {
      bits.push(km(distanceTo(job)));
    }
    return bits.join(" · ");
  }

  /* latar logo kartu mengikuti warna kategori */
  function catStyle(cat) {
    const c = CAT_COLOR[cat] || "#4f46e5";
    return ' style="background:' + c + '1a;color:' + c + '"';
  }

  function timeAgo(ts) {
    const diff = Date.now() - ts;
    const h = Math.floor(diff / 36e5);
    if (h < 1) return "baru saja";
    if (h < 24) return h + " jam lalu";
    const d = Math.floor(h / 24);
    return d + " hari lalu";
  }

  function daysText(job) {
    if (!job.days || !job.days.length) return "Jadwal bebas";
    if (job.days.length === 7) return "Setiap hari";
    return job.days.map(d => DAY_LABEL[d]).join(" · ");
  }

  function timeText(job) {
    if (!job.start || !job.end) return "";
    return job.start + "–" + job.end;
  }

  function toast(msg, kind) {
    const root = $("#toast-root");
    const t = document.createElement("div");
    t.className = "toast" + (kind ? " " + kind : "");
    t.textContent = msg;
    root.appendChild(t);
    setTimeout(() => {
      t.style.transition = "opacity .25s ease, transform .25s ease";
      t.style.opacity = "0";
      t.style.transform = "translateY(6px)";
      setTimeout(() => t.remove(), 260);
    }, 3200);
  }

  /* ---------------- profil & sesi (Supabase) ---------------- */
  function defaultProfile(city) {
    return {
      city: city || "bandung",
      interests: [],
      skills: [],
      days: ["sen", "sel", "rab", "kam", "jum"],
      radius: 10,
      onboarded: false,
      headline: "",
      campus: "",

      /* data kerja yang dapat dicantumkan pengguna */
      phone: "",
      address: "",
      education: "",
      portfolio: "",
      expectedPay: 0,
      availability: "sesuai-jadwal",
      workType: "",
      cvName: "",
      cvUrl: "",
      cvData: "",
      experiences: []
    };
  }

  function ensureProfile(user) {
    if (!user) return user;
    user.profile = Object.assign({}, defaultProfile(user.profile && user.profile.city), user.profile || {});
    if (!Array.isArray(user.profile.experiences)) user.profile.experiences = [];
    return user;
  }

  function sessionEmail() {
    return state.session && state.session.user ? state.session.user.email : null;
  }
  function currentUid() {
    return state.session && state.session.user ? state.session.user.id : null;
  }

  /* Simpan perubahan profil ke tabel profiles (RLS: hanya baris sendiri). */
  async function persistUser() {
    if (!currentUid() || !state.user) return;
    const p = state.user.profile;
    const { error } = await supabase.from("profiles").update({
      full_name: state.user.name,
      city: p.city,
      interests: p.interests,
      skills: p.skills,
      days: p.days,
      radius: p.radius,
      onboarded: !!p.onboarded,
      headline: p.headline,
      campus: p.campus,
      phone: p.phone,
      address: p.address,
      education: p.education,
      portfolio: p.portfolio,
      expected_pay: Number(p.expectedPay) || 0,
      availability: p.availability,
      work_type: p.workType,
      cv_path: p.cvUrl || "",
      experiences: p.experiences || [],
      saved: state.user.saved || [],
      plan_type: (state.user.plan && state.user.plan.type) || "free",
      plan_until: (state.user.plan && state.user.plan.until) || 0,
      partner_plan_type: (state.user.partnerPlan && state.user.partnerPlan.type) || "free",
      partner_plan_until: (state.user.partnerPlan && state.user.partnerPlan.until) || 0
    }).eq("id", currentUid());
    if (error) toast("Gagal menyimpan profil: " + error.message, "warn");
  }

  function myPostedJobs() {
    if (!currentUid()) return [];
    return DATA.jobs.filter(j => j.owner === currentUid());
  }

  /* ---------------- pemetaan Supabase -> bentuk UI ---------------- */
  function rowObject(v) { return Array.isArray(v) ? (v[0] || {}) : (v || {}); }

  function mapProfile(row, authUser) {
    const p = row || {};
    const email = (authUser && authUser.email) || "";
    const cvPath = p.cv_path || "";
    return ensureProfile({
      id: p.id,
      name: p.full_name || email.split("@")[0] || "Pengguna Sifela",
      email: email,
      role: p.role === "mitra" ? "mitra" : p.role === "admin" ? "admin" : "pencari",
      isVerified: !!p.is_verified,
      company: {
        name: p.company_name || "",
        description: p.company_description || "",
        website: p.website || "",
        contact: p.contact || "",
        documents: p.company_documents || []
      },
      profile: {
        city: p.city || "bandung",
        interests: p.interests || [],
        skills: p.skills || [],
        days: p.days || [],
        radius: p.radius || 10,
        onboarded: !!p.onboarded,
        headline: p.headline || "",
        campus: p.campus || "",
        phone: p.phone || "",
        address: p.address || "",
        education: p.education || "",
        portfolio: p.portfolio || "",
        expectedPay: Number(p.expected_pay) || 0,
        availability: p.availability || "sesuai-jadwal",
        workType: p.work_type || "",
        cvName: cvPath ? cvPath.split("/").pop() : "",
        cvUrl: cvPath,
        cvData: "",
        experiences: p.experiences || []
      },
      plan: { type: p.plan_type || "free", until: Number(p.plan_until) || 0 },
      partnerPlan: {
        type: p.partner_plan_type || "free",
        until: Number(p.partner_plan_until) || 0
      },
      saved: p.saved || [],
      applications: []
    });
  }

  function mapJob(row) {
    const r = row || {};
    const owner = rowObject(r.profiles);
    const created = r.created_at ? Date.parse(r.created_at) : Date.now();
    return {
      id: r.id,
      title: r.title || "Lowongan",
      org: r.company_name || owner.company_name || owner.full_name || "Mitra Sifela",
      cat: r.category || "fnb",
      type: r.employment_type || "shift",
      city: r.city || "bandung",
      area: r.area || r.location || "",
      lat: Number(r.lat) || -6.9175,
      lng: Number(r.lng) || 107.6191,
      pay: Number(r.pay || r.salary_min) || 0,
      unit: r.unit || "jam",
      hours: Number(r.hours) || 0,
      days: r.work_days || [],
      start: r.start_time || "",
      end: r.end_time || "",
      slots: Number(r.slots) || 1,
      skills: r.skills || [],
      rating: Number(r.rating) || 0,
      reviews: Number(r.reviews) || 0,
      verified: !!owner.is_verified,
      urgent: false,
      remote: !!r.remote,
      posted: Math.max(0, Math.floor((Date.now() - created) / 864e5)),
      views: Number(r.views) || 0,
      boosted: !!r.boosted,
      desc: r.description || "",
      sourceUrl: r.source_url || "",
      owner: r.employer_id,
      status: r.status || "pending",
      custom: true
    };
  }

  function mapApplication(a) {
    const status = a.status || "pending";
    return {
      id: a.id,
      jobId: a.job_id,
      at: a.created_at ? Date.parse(a.created_at) : Date.now(),
      status: status === "pending" ? "sent" : status === "reviewed" ? "review" : status,
      rawStatus: status,
      cvUrl: a.cv_url || "",
      cvName: a.cv_file_name || "",
      coverLetter: a.cover_letter || "",
      applicantName: rowObject(a.profiles).full_name || "Pelamar",
      jobTitle: rowObject(a.jobs).title || "Lowongan"
    };
  }

  function publicJobs() {
    return DATA.jobs.filter(j => j.status === "approved");
  }

  async function loadJobs() {
    const { data, error } = await supabase
      .from("jobs")
      .select("*, profiles!jobs_employer_id_fkey(company_name, full_name, is_verified)")
      .order("created_at", { ascending: false });
    if (error) { toast("Gagal memuat lowongan: " + error.message, "warn"); return; }
    DATA.jobs = (data || []).map(mapJob);
    if ($("#stat-jobs")) $("#stat-jobs").textContent = publicJobs().length;
  }

  async function loadMyApplications() {
    if (!currentUid()) { state.applications = []; return; }
    const { data, error } = await supabase
      .from("applications")
      .select("*, jobs!inner(id, title)")
      .eq("applicant_id", currentUid())
      .order("created_at", { ascending: false });
    if (error) { toast("Gagal memuat lamaran: " + error.message, "warn"); return; }
    state.applications = (data || []).map(mapApplication);
    if (state.user) state.user.applications = state.applications;
  }

  async function loadEmployerApplications() {
    if (!currentUid()) return [];
    const { data, error } = await supabase
      .from("applications")
      .select("*, profiles!applications_applicant_id_fkey(full_name), jobs!inner(id, title, employer_id)")
      .eq("jobs.employer_id", currentUid())
      .order("created_at", { ascending: false });
    if (error) { toast("Gagal memuat pelamar: " + error.message, "warn"); return []; }
    state.employerApplications = (data || []).map(mapApplication);
    return state.employerApplications;
  }

  async function loadAdminData() {
    const mitra = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "mitra")
      .order("created_at", { ascending: false });
    const jobs = await supabase
      .from("jobs")
      .select("*, profiles!jobs_employer_id_fkey(company_name, full_name)")
      .in("status", ["pending", "rejected"])
      .order("created_at", { ascending: false });
    state.admin = {
      mitra: mitra.error ? [] : (mitra.data || []),
      jobs: jobs.error ? [] : (jobs.data || []).map(mapJob)
    };
  }

  /* ---------------- premium ---------------- */
  function isPremium() {
    const p = state.user && state.user.plan;
    return !!(p && p.type === "plus" && p.until > Date.now());
  }

  function premiumUntilText() {
    if (!isPremium()) return "";
    return new Date(state.user.plan.until).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric"
    });
  }

  function isMitraPro() {
    const p = state.user && state.user.partnerPlan;
    return !!(p && p.type === "pro" && p.until > Date.now());
  }

  function mitraUntilText() {
    if (!isMitraPro()) return "";
    return new Date(state.user.partnerPlan.until).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric"
    });
  }

  function activePlans() {
    return state.checkout.product === "mitra" ? PARTNER_PLANS : PLANS;
  }

  function appliesThisMonth() {
    const cutoff = Date.now() - 30 * 864e5;
    return (state.user.applications || []).filter(a => a.at > cutoff).length;
  }

  function canApplyMore() {
    return isPremium() || appliesThisMonth() < FREE.applies;
  }

  /* ---------------- scoring ---------------- */
  function scoreJob(job) {
    const p = state.user.profile;
    const parts = {};

    const jobSkills = job.skills || [];
    const mine = p.skills || [];
    const overlap = jobSkills.filter(s => mine.includes(s)).length;
    parts.skill = jobSkills.length
      ? (overlap / jobSkills.length) * 40
      : (mine.length ? 20 : 14);
    parts.skillWhy = jobSkills.length ? overlap + "/" + jobSkills.length + " skill cocok" : "Tanpa syarat skill khusus";

    parts.category = (p.interests || []).includes(job.cat) ? 20 : 6;
    parts.categoryWhy = (p.interests || []).includes(job.cat) ? "Sesuai minat" : "Di luar minat utama";

    if (!job.days || !job.days.length) {
      parts.schedule = 16;
      parts.scheduleWhy = "Jadwal bebas";
    } else if (!(p.days || []).length) {
      parts.schedule = 12;
      parts.scheduleWhy = "Jadwal belum diisi";
    } else {
      const fit = job.days.filter(d => p.days.includes(d)).length;
      parts.schedule = (fit / job.days.length) * 20;
      parts.scheduleWhy = fit + "/" + job.days.length + " hari cocok";
    }

    const d = distanceTo(job);
    const maxR = Math.max(p.radius || 10, 1);
    parts.distance = job.remote ? 20 : Math.max(0, 20 * (1 - d / (maxR * 1.6)));
    parts.distanceWhy = job.remote ? "Bisa remote" : km(d) + " dari pusat kota";

    const total = Math.round(parts.skill + parts.category + parts.schedule + parts.distance);
    return { total: Math.max(0, Math.min(100, total)), parts, distance: d };
  }

  function isConflict(job) {
    const p = state.user.profile;
    if (!job.days || !job.days.length) return false;
    if (!(p.days || []).length) return false;
    return job.days.some(d => !p.days.includes(d));
  }

  /* ---------------- filtering ---------------- */
  function normalize(s) { return String(s || "").toLowerCase(); }

  function getFiltered() {
    const f = state.filters;
    let list = publicJobs();

    list = list.filter(j => j.remote ? true : j.city === f.city);
    list = list.filter(j => j.remote || distanceTo(j) <= f.radius);

    if (f.q.trim()) {
      const q = normalize(f.q);
      list = list.filter(j =>
        normalize(j.title).includes(q) ||
        normalize(j.org).includes(q) ||
        normalize(j.area).includes(q) ||
        normalize(CAT_LABEL[j.cat]).includes(q) ||
        (j.skills || []).some(s => normalize(s).includes(q)) ||
        (j.desc || "").toLowerCase().includes(q)
      );
    }

    if (f.cats.length) list = list.filter(j => f.cats.includes(j.cat));
    if (f.types.length) list = list.filter(j => f.types.includes(j.type));
    if (f.days.length) list = list.filter(j => !j.days.length || j.days.some(d => f.days.includes(d)));

    if (f.minPay > 0) {
      list = list.filter(j => {
        const h = hourly(j);
        return h == null ? true : h >= f.minPay;
      });
    }

    if (f.scheduleOnly) list = list.filter(j => !isConflict(j));

    let withScore = list.map(j => ({ job: j, s: scoreJob(j) }));
    if (f.matchOnly) withScore = withScore.filter(e => e.s.total >= MATCH_MIN);

    const sorters = {
      relevance: (a, b) => b.s.total - a.s.total,
      pay: (a, b) => (hourly(b.job) || 0) - (hourly(a.job) || 0),
      newest: (a, b) => a.job.posted - b.job.posted,
      distance: (a, b) => a.s.distance - b.s.distance
    };
    const base = sorters[f.sort] || sorters.relevance;
    withScore.sort((a, b) => (b.job.boosted ? 1 : 0) - (a.job.boosted ? 1 : 0) || base(a, b));
    return withScore;
  }

  /* ============================================================
     RENDER — sidebar
     ============================================================ */
  function renderSidebar() {
    if (!state.user) return;
    const f = state.filters;

    const citySel = $("#filter-city");
    citySel.innerHTML = DATA.cities.map(c =>
      '<option value="' + c.id + '"' + (c.id === f.city ? " selected" : "") + '>' + c.name + "</option>"
    ).join("");
    citySel.value = f.city;

    const radiusInput = $("#filter-radius");
    radiusInput.max = isPremium() ? MAX_RADIUS : FREE.maxRadius;
    if (f.radius > Number(radiusInput.max)) f.radius = Number(radiusInput.max);
    radiusInput.value = f.radius;
    $("#radius-label").textContent = f.radius + " km";
    if (isPremium()) {
      $("#radius-hint").innerHTML = "Jangkauan penuh aktif (maks. " + MAX_RADIUS + " km).";
    } else {
      const beyond = publicJobs().filter(j =>
        !j.remote && j.city === f.city && distanceTo(j) > f.radius).length;
      $("#radius-hint").innerHTML = beyond
        ? '<b>' + beyond + " lowongan</b> di luar " + f.radius +
          ' km. <a href="#" data-open-premium="radius">Buka dengan Plus →</a>'
        : 'Gratis maks. ' + FREE.maxRadius +
          ' km. <a href="#" data-open-premium="radius">Perluas jangkauan →</a>';
    }

    $("#filter-cats").innerHTML = DATA.categories.map(c => {
      const on = f.cats.includes(c.id);
      return '<button class="chip' + (on ? " active" : "") + '" data-cat="' + c.id + '">' +
        c.icon + " " + c.label + "</button>";
    }).join("");

    $("#filter-types").innerHTML = DATA.types.map(t =>
      '<button class="chip' + (f.types.includes(t.id) ? " active" : "") + '" data-type="' + t.id + '">' +
      t.label + "</button>"
    ).join("");

    $("#filter-days").innerHTML = DATA.days.map(d =>
      '<button class="chip' + (f.days.includes(d.id) ? " active" : "") + '" data-day="' + d.id + '">' +
      d.label + "</button>"
    ).join("");

    $("#filter-pay").value = f.minPay;
    $("#pay-label").textContent = f.minPay > 0 ? fmtRp(f.minPay) + "/jam" : "Bebas";
    $("#filter-schedule").checked = f.scheduleOnly;
    $("#filter-match").checked = f.matchOnly;

    renderReachBars();
  }

  function renderReachBars() {
    const f = state.filters;
    const cityJobs = publicJobs().filter(j => j.city === f.city);
    const bands = [
      { label: "<2 km", max: 2 },
      { label: "2–5", max: 5 },
      { label: "5–10", max: 10 },
      { label: "10–25", max: 25 },
      { label: "25+", max: 999 }
    ];
    const counts = bands.map(b => ({
      label: b.label,
      max: b.max,
      n: cityJobs.filter(j => {
        if (j.remote) return false;
        const d = distanceTo(j);
        const prev = bands[bands.indexOf(b) - 1];
        return d <= b.max && (!prev || d > prev.max);
      }).length
    }));
    const max = Math.max(1, ...counts.map(c => c.n));

    $("#reach-bars").innerHTML = counts.map(c => {
      const inRadius = c.max <= f.radius;
      const w = Math.round((c.n / max) * 100);
      return '<div class="reach-bar"><span>' + c.label + "</span>" +
        '<div class="track"><div class="fill' + (inRadius ? "" : " dim") + '" style="width:' + w + '%"></div></div>' +
        "<span>" + c.n + "</span></div>";
    }).join("");
  }

  /* ============================================================
     RENDER — job card
     ============================================================ */
  function jobCard(entry, opts) {
    const o = opts || {};
    const job = entry.job;
    const s = entry.s;
    const premium = isPremium();
    const showScore = premium || o.forceScore;
    const badgeType = '<span class="badge badge-type">' + TYPE_LABEL[job.type] + "</span>";
    const badges = [];
    if (job.verified) badges.push('<span class="badge badge-verified">Terverifikasi</span>');
    if (job.urgent) badges.push('<span class="badge badge-urgent">Butuh cepat</span>');
    if (job.remote) badges.push('<span class="badge badge-remote">Remote</span>');
    if (job.boosted) badges.push('<span class="badge badge-boost">Ditonjolkan</span>');
    if (job.owner === state.user.email) badges.push('<span class="badge badge-mine">Lowonganmu</span>');

    const scoreHtml = showScore
      ? '<span class="match-pill' + (s.total < 55 ? " low" : "") + '">' + s.total + "% cocok</span>"
      : '<span class="match-pill locked">🔒 Skor</span>';

    const locked = o.locked;

    return '<article class="job-card' + (locked ? " locked" : "") + '" data-job="' + job.id + '">' +
      (locked ? '<div class="lock-overlay"><div class="lock-overlay-inner"><span class="ico">🔒</span> Buka dengan Sifela Plus</div></div>' : "") +
      '<div class="job-logo">' + ICONS[job.cat] + "</div>" +
      '<div class="job-main">' +
        '<div class="job-title-row">' +
          '<span class="job-title">' + esc(job.title) + "</span>" +
          badgeType + badges.join("") +
        "</div>" +
        '<div class="job-org">' + esc(job.org) + " · " + esc(areaText(job)) + "</div>" +
        '<div class="job-meta">' +
          "<span>🗓 " + daysText(job) + "</span>" +
          (timeText(job) ? "<span>⏰ " + timeText(job) + "</span>" : "") +
          (job.hours ? "<span>⏱ " + job.hours + " jam</span>" : "") +
          (job.reviews > 0 ? "<span>⭐ " + job.rating + "</span>" : "") +
          (job.slots > 1 ? "<span>👥 " + job.slots + " slot</span>" : "") +
        "</div>" +
        '<div class="job-tags">' + (job.skills || []).slice(0, 4).map(t => '<span class="tag">' + esc(t) + "</span>").join("") + "</div>" +
      "</div>" +
      '<div class="job-side">' +
        '<div class="job-pay">' + payLabel(job) + "</div>" +
        scoreHtml +
      "</div>" +
    "</article>";
  }

  /* ============================================================
     RENDER — pages
     ============================================================ */
  function renderApp() {
    if (state.tab === "cari") renderCari();
    else if (state.tab === "rekomendasi") renderRekomendasi();
    else if (state.tab === "lamaran") renderLamaran();
    else if (state.tab === "profil") renderProfil();
    else if (state.tab === "premium") renderPremium();
    else if (state.tab === "mitra") renderMitra();
    else if (state.tab === "admin") renderAdmin();
    else if (state.tab === "checkout") renderCheckout();
    else if (state.tab === "sukses") renderSuccess();

    $$(".appnav-item").forEach(b => {
      b.classList.toggle("active", b.dataset.appNav === state.tab);
    });
    const adminNav = $("#admin-nav");
    if (adminNav) adminNav.classList.toggle("hidden", !state.user || state.user.role !== "admin");
    $("#sidebar").style.display = (state.tab === "cari") ? "" : "none";
    $(".app-body").style.gridTemplateColumns = (state.tab === "cari") ? "" : "minmax(0,1fr)";

    const badge = $("#plan-badge");
    badge.textContent = isMitraPro() ? "Mitra Pro" : (isPremium() ? "Plus" : "Gratis");
    badge.className = "plan-badge" + (isPremium() || isMitraPro() ? " plus" : "");
    $("#avatar-btn").textContent = initials(state.user.name);
  }

  function renderCari() {
    const results = getFiltered();
    const premium = isPremium();
    const visible = premium ? results.length : Math.min(results.length, FREE.visibleJobs);

    const head = '<div class="page-head">' +
      "<h2>Cari Lowongan di " + esc(cityOf(state.filters.city).name) + "</h2>" +
      "<p>Pekerjaan paruh waktu berbasis shift, proyek freelance kecil, dan pekerjaan harian di sekitar Anda.</p>" +
      "</div>";

    const banner = premium ? "" :
      '<div class="banner">🔒 <span><strong>' + Math.max(0, results.length - FREE.visibleJobs) +
      " lowongan terkunci.</strong> Buka semua akses dan skor kecocokan dengan Plus.</span>" +
      '<button class="btn btn-gold btn-sm" data-open-premium>Buka</button></div>';

    const bar = '<div class="result-bar">' +
      '<span class="result-count"><b>' + results.length + "</b> lowongan ditemukan</span>" +
      (premium ? "" : '<span class="badge badge-type">Menampilkan ' + visible + " dari " + results.length + "</span>") +
      '<select class="sort-select" id="sort-select">' +
        '<option value="relevance"' + (state.filters.sort === "relevance" ? " selected" : "") + ">Paling cocok</option>" +
        '<option value="newest"' + (state.filters.sort === "newest" ? " selected" : "") + ">Terbaru</option>" +
        '<option value="pay"' + (state.filters.sort === "pay" ? " selected" : "") + ">Upah tertinggi</option>" +
        '<option value="distance"' + (state.filters.sort === "distance" ? " selected" : "") + ">Terdekat</option>" +
      "</select></div>";

    let body;
    if (!results.length) {
      body = emptyState("Tidak ada lowongan yang cocok",
        "Coba perluas radius, kurangi filter, atau matikan opsi “hanya yang cocok jadwal”.",
        '<button class="btn btn-outline btn-sm" id="empty-reset">Reset filter</button>');
    } else {
      body = '<div class="job-list">' + results.map((r, i) => {
        if (!premium && i >= FREE.visibleJobs) return jobCard(r, { locked: true });
        return jobCard(r, {});
      }).join("") + "</div>";
    }

    $("#app-main").innerHTML = head + banner + bar + body;
  }

  function renderRekomendasi() {
    const p = state.user.profile;
    const premium = isPremium();
    const scored = publicJobs()
      .filter(j => j.remote || j.city === p.city)
      .map(j => ({ job: j, s: scoreJob(j) }))
      .sort((a, b) => b.s.total - a.s.total);

    const shown = premium ? scored : scored.slice(0, 3);

    const hero = '<div class="rec-hero">' +
      "<h2>Rekomendasi untuk " + esc(state.user.name.split(" ")[0]) + "</h2>" +
      "<p>Skor dihitung dari 4 faktor: skill (40%), minat kategori (20%), kecocokan jadwal (20%), dan jarak (20%).</p>" +
      '<div class="rec-hero-actions">' +
        '<button class="btn btn-outline btn-sm" data-app-nav="profil">Perbarui profil</button>' +
        (premium ? '<span class="badge badge-verified">Plus aktif</span>'
                 : '<button class="btn btn-gold btn-sm" data-open-premium>Buka skor detail</button>') +
      "</div></div>";

    let body;
    if (!shown.length) {
      body = emptyState("Belum ada rekomendasi", "Lengkapi profil minat dan skill dulu supaya sistem bisa mencocokkan.", "");
    } else {
      body = '<div class="job-list">' + shown.map(r => {
        const card = jobCard(r, {});
        if (premium) {
          const pts = r.s.parts;
          return card +
            '<div class="rec-factor"><span>Skill</span><div class="bar"><div style="width:' +
              Math.round(pts.skill / 40 * 100) + '%"></div></div><b>' + Math.round(pts.skill) + '/40</b></div>' +
            '<div class="rec-factor"><span>Minat</span><div class="bar"><div style="width:' +
              Math.round(pts.category / 20 * 100) + '%"></div></div><b>' + Math.round(pts.category) + '/20</b></div>' +
            '<div class="rec-factor"><span>Jadwal</span><div class="bar"><div style="width:' +
              Math.round(pts.schedule / 20 * 100) + '%"></div></div><b>' + Math.round(pts.schedule) + '/20</b></div>' +
            '<div class="rec-factor"><span>Jarak</span><div class="bar"><div style="width:' +
              Math.round(pts.distance / 20 * 100) + '%"></div></div><b>' + Math.round(pts.distance) + '/20</b></div>';
        }
        return card;
      }).join("") + "</div>";

      if (!premium) {
        body += '<div class="banner" style="margin-top:14px">🔒 <span><strong>Alasan di balik skor masih terkunci.</strong>' +
          " Plus menampilkan rincian per faktor dan seluruh rekomendasi.</span>" +
          '<button class="btn btn-gold btn-sm" data-open-premium>Buka</button></div>';
      }
    }

    $("#app-main").innerHTML = hero + body;
  }

  function renderLamaran() {
    const apps = (state.user.applications || []).slice().sort((a, b) => b.at - a.at);
    const used = appliesThisMonth();
    const limit = isPremium() ? "∞" : FREE.applies;

    const head = '<div class="page-head page-head-row">' +
      "<div><h2>Lamaran saya</h2><p>" + apps.length + " lamaran terkirim · " +
      used + " dari " + limit + " kuota bulan ini</p></div>" +
      (isPremium() ? "" : '<button class="btn btn-gold btn-sm" data-open-premium>Tambah kuota</button>') +
      "</div>";

    let body;
    if (!apps.length) {
      body = emptyState("Belum ada lamaran", "Mulai cari kerja dan kirim lamaran pertamamu.",
        '<button class="btn btn-primary btn-sm" data-app-nav="cari">Cari kerja</button>');
    } else {
      body = '<div class="app-list">' + apps.map(a => {
        const job = DATA.jobs.find(j => j.id === a.jobId);
        if (!job) return "";
        const statusTxt = ({ sent: "Terkirim", review: "Ditinjau", accepted: "Diterima", rejected: "Ditolak" })[a.status] || a.status;
        const statusCls = a.status === "review" || a.status === "accepted" ? "review" : "sent";
        return '<div class="app-row" data-job="' + job.id + '">' +
          '<div class="job-logo">' + ICONS[job.cat] + "</div>" +
          "<div><strong>" + esc(job.title) + "</strong>" +
          '<div class="job-org">' + esc(job.org) + " · dikirim " +
            new Date(a.at).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) + "</div></div>" +
          '<span class="app-status ' + statusCls + '">' + statusTxt + "</span>" +
        "</div>";
      }).join("") + "</div>";
    }

    const savedJobs = (state.user.saved || [])
      .map(id => DATA.jobs.find(j => j.id === id))
      .filter(Boolean);

    const savedBlock = savedJobs.length
      ? '<div class="panel" style="margin-top:14px"><h3>Lowongan tersimpan</h3>' +
        '<p class="panel-sub">' + savedJobs.length + " lowongan kamu tandai. Klik untuk membuka detail.</p>" +
        '<div class="app-list">' + savedJobs.map(job =>
          '<div class="app-row" data-job="' + job.id + '">' +
            '<div class="job-logo">' + ICONS[job.cat] + "</div>" +
            "<div><strong>" + esc(job.title) + "</strong>" +
            '<div class="job-org">' + esc(job.org) + " · " + esc(areaText(job)) + " · " +
              payLabel(job) + "</div></div>" +
            '<span class="app-status">Tersimpan</span>' +
          "</div>").join("") + "</div></div>"
      : "";

    $("#app-main").innerHTML = head + body + savedBlock;
  }

  function renderProfil() {
    const u = state.user;
    const p = ensureProfile(u).profile;

    const head = '<div class="page-head"><h2>Akun &amp; Profil</h2>' +
      "<p>Lengkapi data kerja Anda agar rekomendasi lowongan lebih tepat.</p></div>";

    const availabilityOptions = [
      ["sesuai-jadwal", "Sesuai jadwal kuliah"],
      ["setiap-hari", "Setiap hari"],
      ["akhir-pekan", "Akhir pekan"],
      ["pagi", "Shift pagi"],
      ["sore", "Shift sore"],
      ["remote", "Remote saja"]
    ];
    const availabilityLabel = (availabilityOptions.find(o => o[0] === p.availability) || ["", "Sesuai jadwal kuliah"])[1];

    const cvInfo = p.cvName
      ? '<span class="muted-text">' + esc(p.cvName) + " · tersimpan di Supabase Storage</span>"
      : '<span class="muted-text">Belum ada CV</span>';

    const card = '<div class="panel">' +
      '<div class="profile-head">' +
        '<div class="profile-avatar">' + initials(u.name) + "</div>" +
        "<div><h2>" + esc(u.name) + "</h2><p>" + esc(u.email) + "</p></div>" +
      "</div>" +
      '<div class="form-grid">' +
        '<label class="field"><span>Nama lengkap</span><input id="pf-name" value="' + esc(u.name) + '"></label>' +
        '<label class="field"><span>Nomor telepon / WhatsApp</span><input id="pf-phone" type="tel" placeholder="Misal: 0812-3456-7890" value="' + esc(p.phone || "") + '"></label>' +
        '<label class="field"><span>Alamat lengkap</span><input id="pf-address" placeholder="Jalan, nomor, kecamatan, kota" value="' + esc(p.address || "") + '"></label>' +
        '<label class="field"><span>Bio singkat</span><input id="pf-headline" placeholder="Misal: mahasiswa desain yang cari freelance" value="' + esc(p.headline || "") + '"></label>' +
        '<label class="field"><span>Kampus / institusi</span><input id="pf-campus" placeholder="Nama kampus atau usaha" value="' + esc(p.campus || "") + '"></label>' +
        '<label class="field"><span>Pendidikan terakhir</span><input id="pf-education" placeholder="Misal: S1 Manajemen, semester 6" value="' + esc(p.education || "") + '"></label>' +
        '<label class="field"><span>Kota</span><select id="pf-city">' +
          DATA.cities.map(c => '<option value="' + c.id + '"' + (c.id === p.city ? " selected" : "") + ">" + c.name + "</option>").join("") +
        "</select></label>" +
        '<label class="field"><span>Ketersediaan</span><select id="pf-availability">' +
          availabilityOptions.map(o => '<option value="' + o[0] + '"' + (o[0] === p.availability ? " selected" : "") + ">" + o[1] + "</option>").join("") +
        "</select></label>" +
        '<label class="field"><span>Jenis pekerjaan yang dicari</span><select id="pf-worktype">' +
          '<option value="">Belum ditentukan</option>' +
          DATA.types.map(t => '<option value="' + t.id + '"' + (p.workType === t.id ? " selected" : "") + ">" + esc(t.label) + "</option>").join("") +
        "</select></label>" +
        '<label class="field"><span>Target upah per jam (Rp)</span><input id="pf-pay" type="number" min="0" step="1000" placeholder="Misal: 25000" value="' + (p.expectedPay || "") + '"></label>' +
        '<label class="field"><span>Portofolio / profil profesional</span><input id="pf-portfolio" type="url" placeholder="Tautan portfolio, LinkedIn, atau GitHub" value="' + esc(p.portfolio || "") + '"></label>' +
        '<label class="field"><span>Radius jangkauan (' + p.radius + " km)</span>" +
          '<input type="range" id="pf-radius" min="1" max="' + (isPremium() ? MAX_RADIUS : FREE.maxRadius) +
          '" value="' + p.radius + '">' +
        "</label>" +
      "</div>" +
      '<div class="cv-block">' +
        '<div><strong>Berkas CV</strong><p class="panel-sub">' +
          (p.cvName ? "Tersimpan: " + esc(p.cvName) + " · " + cvInfo : "Unggah PDF atau DOC/DOCX (maksimal 5 MB).") +
        "</p></div>" +
        '<div class="cv-actions"><input type="file" id="pf-cv-file" accept=".pdf,.doc,.docx,image/*">' +
          (p.cvName || p.cvData ? '<button class="btn btn-ghost btn-sm" id="pf-cv-clear">Hapus berkas</button>' : "") +
        "</div>" +
      "</div>" +
      '<button class="btn btn-primary" id="pf-save">Simpan perubahan</button>' +
    "</div>";

    const baris = (label, value) => '<div class="summary-row"><span>' + label + "</span><b>" + value + "</b></div>";
    const ringkasan = '<div class="panel"><h3>Ringkasan data kerja</h3>' +
      '<p class="panel-sub">Data tersimpan berikut ikut dipertimbangkan saat mencari lowongan.</p>' +
      '<div class="summary-grid">' +
        baris("Telepon", esc(p.phone || "Belum diisi")) +
        baris("Alamat", esc(p.address || "Belum diisi")) +
        baris("Lokasi", esc(cityOf(p.city).name) + " · radius " + p.radius + " km") +
        baris("Pendidikan", esc(p.education || p.campus || "Belum diisi")) +
        baris("Target upah", p.expectedPay ? fmtRpFull(p.expectedPay) + "/jam" : "Belum diisi") +
        baris("Ketersediaan", esc(availabilityLabel)) +
        baris("CV", cvInfo) +
        baris("Pengalaman", (p.experiences || []).length + " entri") +
      "</div></div>";

    const pengalamanRows = (p.experiences || []).map((e, i) =>
      '<div class="exp-row">' +
        '<div class="exp-row-head"><strong>Pengalaman ' + (i + 1) + "</strong>" +
          '<button class="btn btn-ghost btn-sm" data-exp-remove="' + i + '">Hapus</button></div>' +
        '<div class="form-grid">' +
          '<label class="field"><span>Jabatan</span><input data-exp-index="' + i + '" data-exp-field="role" placeholder="Misal: Barista" value="' + esc(e.role || "") + '"></label>' +
          '<label class="field"><span>Nama usaha / organisasi</span><input data-exp-index="' + i + '" data-exp-field="org" placeholder="Nama tempat kerja" value="' + esc(e.org || "") + '"></label>' +
          '<label class="field"><span>Periode</span><input data-exp-index="' + i + '" data-exp-field="period" placeholder="Jan 2025 – Jun 2025" value="' + esc(e.period || "") + '"></label>' +
          '<label class="field"><span>Jenis pekerjaan</span><select data-exp-index="' + i + '" data-exp-field="type">' +
            '<option value="">Lainnya</option>' +
            DATA.types.map(t => '<option value="' + t.id + '"' + (e.type === t.id ? " selected" : "") + ">" + esc(t.label) + "</option>").join("") +
          "</select></label>" +
        "</div>" +
        '<label class="field"><span>Rincian tugas dan capaian</span><textarea rows="2" data-exp-index="' + i + '" data-exp-field="desc" placeholder="Jelaskan pekerjaan dan hasilnya">' + esc(e.desc || "") + "</textarea></label>" +
      "</div>").join("");

    const pengalaman = '<div class="panel"><h3>Pengalaman kerja</h3>' +
      '<p class="panel-sub">Tambahkan riwayat pekerjaan, magang, atau proyek freelance yang pernah Anda jalani.</p>' +
      (pengalamanRows || '<p class="muted-text">Belum ada pengalaman yang dicantumkan.</p>') +
      '<button class="btn btn-outline btn-sm" id="pf-add-exp" style="margin-top:8px">+ Tambah pengalaman</button>' +
      "</div>";

    const minat = '<div class="panel"><h3>Minat kategori</h3>' +
      '<p class="panel-sub">Pilih yang Anda minati. Memengaruhi 20% skor.</p>' +
      '<div class="skill-grid">' + DATA.categories.map(c =>
        '<button class="chip' + (p.interests.includes(c.id) ? " active" : "") + '" data-pf-cat="' + c.id + '">' +
        c.icon + " " + c.label + "</button>").join("") + "</div></div>";

    const skill = '<div class="panel"><h3>Skill</h3>' +
      '<p class="panel-sub">Memengaruhi 40% skor kecocokan.</p>' +
      '<div class="skill-grid">' + DATA.skills.map(s =>
        '<button class="chip' + (p.skills.includes(s) ? " active" : "") + '" data-pf-skill="' + esc(s) + '">' +
        esc(s) + "</button>").join("") + "</div></div>";

    const jadwal = '<div class="panel"><h3>Hari tersedia</h3>' +
      '<p class="panel-sub">Shift yang bentrok dengan hari di luar pilihan ini akan ditandai.</p>' +
      '<div class="day-grid">' + DATA.days.map(d =>
        '<button class="day-btn' + (p.days.includes(d.id) ? " active" : "") + '" data-pf-day="' + d.id + '">' +
        d.label + "</button>").join("") + "</div></div>";

    const akun = '<div class="panel"><h3>Akun</h3>' +
      '<p class="panel-sub">Peran: <b>' + (u.role === "mitra" ? "Pemilik usaha" : "Pencari kerja") +
        "</b> · Paket: <b>" + (isPremium() ? "Plus hingga " + premiumUntilText() : "Gratis") +
        "</b> · Mitra: <b>" + (isMitraPro() ? "Pro hingga " + mitraUntilText() : "Gratis") + "</b></p>" +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
        '<button class="btn btn-outline btn-sm" data-app-nav="mitra">' +
          (u.role === "mitra" ? "Kelola lowongan" : "Mode mitra") + "</button>" +
        (isPremium() ? '<button class="btn btn-outline btn-sm" id="pf-cancel">Jeda Plus (demo)</button>' :
          '<button class="btn btn-gold btn-sm" data-open-premium>Upgrade ke Plus</button>') +
      "</div></div>";

    const keluar = '<div class="panel signout-panel">' +
      "<div><h3>Keluar dari akun</h3>" +
      '<p class="panel-sub">Anda perlu masuk kembali untuk mengakses profil dan lamaran.</p></div>' +
      '<button class="btn btn-outline" id="pf-logout">Keluar dari Akun</button>' +
      "</div>";

    $("#app-main").innerHTML = head + card + ringkasan + pengalaman + minat + skill + jadwal + akun + keluar;
  }

  function renderPremium() {
    const premium = isPremium();

    const hero = '<div class="premium-hero">' +
      "<h2>Sifela Plus</h2>" +
      "<p>" + (premium
        ? "Plus aktif hingga " + premiumUntilText() + ". Semua fitur terbuka."
        : "Buka semua lowongan, skor kecocokan detail, radius penuh, dan lamaran tanpa batas.") +
      "</p></div>";

    const plans = '<div class="panel"><h3>Pilih paket</h3>' +
      '<p class="panel-sub">Simulasi — tidak ada tagihan nyata.</p>' +
      '<div class="plan-grid">' + PLANS.map((pl, i) =>
        '<button class="plan-card' + (i === 0 ? " selected" : "") + '" data-plan="' + pl.id + '">' +
          "<h4>" + pl.label + "</h4>" +
          '<div class="plan-price">' + fmtRpFull(pl.price) + " <small>/ " + pl.label.toLowerCase() + "</small></div>" +
          '<div class="plan-note">' + pl.note + "</div>" +
        "</button>").join("") + "</div>" +
      '<button class="btn btn-gold btn-block" data-open-checkout="plus" style="margin-top:16px">' +
        (premium ? "Perpanjang Plus" : "Lanjut ke pembayaran") + "</button>" +
      '<p class="panel-sub" style="margin:12px 0 0;text-align:center">Punya usaha? <button class="link" data-app-nav="mitra">Lihat paket Mitra Pro →</button></p>' +
      "</div>";

    const features = [
      ["Semua lowongan terbuka", premium, "6 pertama saja"],
      ["Skor kecocokan + rincian faktor", premium, "Terkunci"],
      ["Radius hingga 50 km", premium, "Maks. 10 km"],
      ["Lamaran tanpa batas", premium, FREE.applies + "/bulan"],
      ["Kontak langsung & chat", premium, "Tidak tersedia"],
      ["Notifikasi shift baru", premium, "Tidak tersedia"]
    ];

    const status = '<div class="panel"><h3>Status fitur</h3>' +
      '<p class="panel-sub">Perbandingan paket Gratis dan Plus.</p>' +
      '<div class="feature-status">' + features.map(f =>
        '<div class="fs-row' + (f[1] ? "" : " locked") + '">' +
          "<span>" + (f[1] ? "✅" : "🔒") + " " + f[0] + "</span>" +
          '<span class="fs-state ' + (f[1] ? "on" : "off") + '">' + (f[1] ? "Aktif" : f[2]) + "</span>" +
        "</div>").join("") + "</div></div>";

    const note = '<div class="panel"><h3>Kenapa berbayar?</h3>' +
      '<p class="panel-sub">Fitur gratis tetap berguna. Plus menutup biaya kurasi lowongan, verifikasi mitra, dan pengembangan pencocokan.</p>' +
      '<ul class="check-list" style="margin:0">' +
        "<li>Kurasi & verifikasi lowongan setiap hari</li>" +
        "<li>Pencocokan berbasis skill dan jadwal</li>" +
        "<li>Tanpa biaya komisi dari mahasiswa</li>" +
      "</ul></div>";

    $("#app-main").innerHTML = hero + plans + status + note;
  }

  /* ============================================================
     MITRA / PEMILIK USAHA
     ============================================================ */
  function renderMitra() {
    if (!currentUid() || !state.user || state.user.role !== "mitra") {
      $("#app-main").innerHTML = '<div class="page-head"><h2>Ruang Mitra</h2></div>' +
        emptyState("Masuk sebagai mitra",
          "Daftar sebagai pemilik usaha, unggah legalitas, lalu tunggu verifikasi admin sebelum memasang lowongan.",
          '<button class="btn btn-primary btn-sm" data-go="auth" data-mode="login">Masuk / Daftar</button>');
      return;
    }

    if (state.employerLoadedFor !== currentUid()) {
      state.employerLoadedFor = currentUid();
      loadEmployerApplications().then(() => { if (state.tab === "mitra") renderApp(); });
    }

    const jobs = myPostedJobs();
    const approved = jobs.filter(j => j.status === "approved").length;
    const pending = jobs.filter(j => j.status === "pending").length;
    const lamaran = (state.employerApplications || []).length;
    const verified = !!state.user.isVerified;
    const c = state.user.company || {};

    const head = '<div class="page-head page-head-row">' +
      "<div><h2>Ruang Mitra</h2><p>Lowongan ditinjau admin sebelum tayang. Lamaran masuk langsung ke dashboard ini.</p></div>" +
      '<div class="hero-cta" style="margin:0">' +
        '<button class="btn btn-outline" data-partner-profile>Profil Usaha</button>' +
        '<button class="btn btn-primary" data-post-job>+ Pasang lowongan</button>' +
      "</div></div>";

    const banner = verified
      ? '<div class="banner banner-ok">✓ <span><strong>Usaha terverifikasi.</strong> Lowongan yang Anda pasang tetap menunggu persetujuan admin sebelum tayang.</span></div>'
      : '<div class="banner">⏳ <span><strong>Menunggu verifikasi admin.</strong> Lengkapi profil usaha dan dokumen legalitas agar dapat memasang lowongan.</span>' +
        '<button class="btn btn-outline btn-sm" data-partner-profile>Lengkapi</button></div>';

    const company = '<div class="panel"><h3>Profil usaha</h3>' +
      '<p class="panel-sub">' + (c.name ? esc(c.name) + " · " + esc(c.contact || "-") : "Belum ada data perusahaan.") + "</p>" +
      '<p class="panel-sub">Dokumen legalitas: ' + ((c.documents || []).length) + " berkas</p>" +
      '<button class="btn btn-outline btn-sm" data-partner-profile>Ubah profil &amp; dokumen</button></div>';

    const stats = '<div class="mitra-stats">' +
      '<div class="m-stat"><span>Lowongan tayang</span><b>' + approved + "</b></div>" +
      '<div class="m-stat"><span>Menunggu moderasi</span><b>' + pending + "</b></div>" +
      '<div class="m-stat"><span>Lamaran masuk</span><b>' + lamaran + "</b></div>" +
      "</div>";

    const statusBadge = j => j.status === "approved"
      ? '<span class="badge badge-verified">Tayang</span>'
      : j.status === "rejected"
        ? '<span class="badge badge-urgent">Ditolak</span>'
        : '<span class="badge badge-type">Menunggu</span>';

    const list = !jobs.length
      ? emptyState("Belum ada lowongan", "Pasang shift part-time, freelance kecil, atau gig harian pertama Anda.",
          '<button class="btn btn-primary btn-sm" data-post-job>Pasang lowongan</button>')
      : '<div class="owner-list">' + jobs.map(j =>
          '<div class="owner-row">' +
            '<div class="job-logo">' + ICONS[j.cat] + "</div>" +
            "<div><strong>" + esc(j.title) + "</strong>" +
              '<div class="job-org">' + esc(j.area || j.city) + " · " + payLabel(j) + "</div>" +
              '<div class="owner-tags">' + statusBadge(j) +
                '<span class="badge badge-type">' + TYPE_LABEL[j.type] + "</span>" +
                (j.boosted ? '<span class="badge badge-boost">Ditonjolkan</span>' : "") +
              "</div></div>" +
            '<div class="owner-actions">' +
              '<button class="btn btn-outline btn-sm" data-job="' + j.id + '">Lihat</button>' +
              '<button class="btn btn-ghost btn-sm" data-del-job="' + j.id + '">Hapus</button>' +
            "</div>" +
          "</div>").join("") + "</div>";

    const applicants = !lamaran
      ? '<div class="panel"><h3>Pelamar masuk</h3><p class="panel-sub">Belum ada lamaran untuk lowongan Anda.</p></div>'
      : '<div class="panel"><h3>Pelamar masuk</h3><p class="panel-sub">CV dibuka lewat tautan bertanda tangan yang berlaku 1 jam.</p>' +
        '<div class="app-list">' + state.employerApplications.map(a =>
          '<div class="app-row">' +
            "<div><strong>" + esc(a.applicantName) + "</strong>" +
              '<div class="job-org">' + esc(a.jobTitle) + " · " +
                new Date(a.at).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) + "</div></div>" +
            '<span class="app-status">' + esc(a.status) + "</span>" +
            '<button class="btn btn-outline btn-sm" data-cv="' + esc(a.cvUrl) + '" data-cv-bucket="cvs">Lihat CV</button>' +
          "</div>").join("") + "</div></div>";

    $("#app-main").innerHTML = head + banner + stats + company + list + applicants;
  }

  function openPostJob() {
    if (!state.user || state.user.role !== "mitra" || !currentUid()) {
      toast("Masuk sebagai mitra terlebih dahulu.", "warn");
      showView("auth"); setAuthTab("login");
      return;
    }
    if (!state.user.isVerified) {
      toast("Akun belum diverifikasi admin. Lengkapi legalitas di Profil Usaha.", "warn");
      return;
    }

    const catOpts = DATA.categories.map(c =>
      '<option value="' + c.id + '">' + c.icon + " " + c.label + "</option>").join("");
    const typeOpts = DATA.types.map(t =>
      '<option value="' + t.id + '">' + t.label + "</option>").join("");
    const cityOpts = DATA.cities.map(c =>
      '<option value="' + c.id + '"' + (c.id === state.user.profile.city ? " selected" : "") + ">" + c.name + "</option>").join("");
    const dayBtns = DATA.days.map(d =>
      '<button type="button" class="day-btn" data-pick-day="' + d.id + '">' + d.label + "</button>").join("");

    openModal(
      '<h3 style="font-size:19px;font-weight:800;margin-bottom:4px">Pasang lowongan</h3>' +
      '<p class="panel-sub">Lowongan akan berstatus <b>pending</b> dan tayang setelah disetujui admin.</p>' +
      '<form id="post-job-form">' +
        '<label class="field"><span>Nama lowongan</span><input name="title" placeholder="Contoh: Barista Shift Pagi" required></label>' +
        '<label class="field"><span>Nama usaha</span><input name="org" value="' + esc(state.user.name) + '" required></label>' +
        '<div class="field-row">' +
          '<label class="field"><span>Kategori</span><select name="cat">' + catOpts + "</select></label>" +
          '<label class="field"><span>Tipe kerja</span><select name="type">' + typeOpts + "</select></label>" +
        "</div>" +
        '<div class="field-row">' +
          '<label class="field"><span>Kota / wilayah</span><select name="city">' + cityOpts + "</select></label>" +
          '<label class="field"><span>Area, mis. Dago</span><input name="area" placeholder="Nama area" required></label>' +
        "</div>" +
        '<div class="field-row">' +
          '<label class="field"><span>Upah (Rp)</span><input name="pay" type="number" min="1000" step="1000" value="20000" required></label>' +
          '<label class="field"><span>Satuan upah</span><select name="unit">' +
            '<option value="jam">per jam</option><option value="hari">per hari</option>' +
            '<option value="proyek">per proyek</option><option value="paket">per paket</option>' +
          "</select></label>" +
        "</div>" +
        '<div class="field-row">' +
          '<label class="field"><span>Mulai</span><input name="start" type="time"></label>' +
          '<label class="field"><span>Selesai</span><input name="end" type="time"></label>' +
        "</div>" +
        '<label class="field"><span>Hari kerja</span></label>' +
        '<div class="day-grid" id="post-days">' + dayBtns + "</div>" +
        '<label class="field" style="margin-top:16px"><span>Skill (pisahkan dengan koma)</span>' +
          '<input name="skills" placeholder="Komunikasi, Barista"></label>' +
        '<label class="field"><span>Deskripsi singkat</span>' +
          '<textarea name="desc" rows="3" placeholder="Apa yang akan dikerjakan?" required style="width:100%;padding:11px 14px;border:1px solid var(--line);border-radius:var(--radius-sm);font-family:inherit;font-size:14px"></textarea></label>' +
        '<div class="ob-actions"><button type="button" class="btn btn-outline" data-close-modal>Batal</button>' +
        '<button type="submit" class="btn btn-primary">Terbitkan lowongan</button></div>' +
      "</form>",
      { name: "post", wide: true }
    );

    $$("#modal-sheet [data-pick-day]").forEach(b => b.addEventListener("click", () => {
      b.classList.toggle("active");
    }));

    $("#post-job-form").addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      const city = cityOf(fd.get("city"));
      const days = $$("#modal-sheet [data-pick-day].active").map(b => b.dataset.pickDay);
      const skills = String(fd.get("skills") || "").split(",").map(s => s.trim()).filter(Boolean).slice(0, 6);
      const unit = fd.get("unit");
      const start = fd.get("start"), end = fd.get("end");
      const hours = (unit === "jam" && start && end)
        ? Math.max(1, Math.round((Number(end.slice(0, 2)) * 60 + Number(end.slice(3))) -
            (Number(start.slice(0, 2)) * 60 + Number(start.slice(3)))) / 60)
        : 0;
      const pay = Number(fd.get("pay"));

      const payload = {
        employer_id: currentUid(),
        title: String(fd.get("title")).trim(),
        description: String(fd.get("desc")).trim(),
        category: fd.get("cat"),
        employment_type: fd.get("type"),
        status: "pending",
        city: fd.get("city"),
        area: String(fd.get("area")).trim(),
        location: String(fd.get("area")).trim(),
        lat: city.lat,
        lng: city.lng,
        pay: pay,
        salary_min: pay,
        unit: unit,
        hours: hours,
        work_days: days,
        start_time: start,
        end_time: end,
        slots: 1,
        skills: skills,
        rating: 0,
        reviews: 0,
        remote: false,
        views: 0,
        boosted: false
      };

      const { error } = await supabase.from("jobs").insert(payload);
      if (error) { toast("Gagal memasang lowongan: " + error.message, "warn"); return; }
      closeModal();
      await loadJobs();
      state.tab = "mitra";
      renderApp();
      toast("Lowongan terkirim. Menunggu persetujuan admin.", "ok");
    });
  }

  async function toggleBoost(jobId) {
    if (!isMitraPro()) { openPaywall("boost"); return; }
    const job = DATA.jobs.find(j => j.id === jobId);
    if (!job) return;
    const { error } = await supabase.from("jobs").update({ boosted: !job.boosted }).eq("id", jobId);
    if (error) { toast("Gagal mengubah penonjolan: " + error.message, "warn"); return; }
    job.boosted = !job.boosted;
    renderApp();
    toast(job.boosted ? "Lowongan ditonjolkan" : "Penonjolan dimatikan", "ok");
  }

  async function deleteJob(jobId) {
    if (!window.confirm("Hapus lowongan ini?")) return;
    const { error } = await supabase.from("jobs").delete().eq("id", jobId);
    if (error) { toast("Gagal menghapus: " + error.message, "warn"); return; }
    await loadJobs();
    renderApp();
    toast("Lowongan dihapus");
  }

  /* Profil usaha + unggah dokumen legalitas ke bucket company_docs. */
  function openPartnerProfile() {
    const c = state.user.company || {};
    const docs = (c.documents || []).map((d, i) =>
      "<li>" + esc(d.name) + ' <button class="link" data-doc-index="' + i + '">hapus</button></li>').join("") || "<li>Belum ada dokumen.</li>";
    openModal(
      '<h3 style="font-size:19px;font-weight:800;margin-bottom:4px">Profil usaha</h3>' +
      '<p class="panel-sub">Dokumen legalitas/NIB tersimpan privat dan hanya bisa dilihat admin.</p>' +
      '<form id="partner-form">' +
        '<label class="field"><span>Nama perusahaan / usaha</span><input name="company_name" value="' + esc(c.name || "") + '" required></label>' +
        '<label class="field"><span>Deskripsi usaha</span><textarea name="company_description" rows="3" style="width:100%;padding:11px 14px;border:1px solid var(--line);border-radius:var(--radius-sm);font-family:inherit;font-size:14px">' + esc(c.description || "") + '</textarea></label>' +
        '<div class="field-row">' +
          '<label class="field"><span>Website</span><input name="website" value="' + esc(c.website || "") + '" placeholder="https://..."></label>' +
          '<label class="field"><span>Kontak (email/telepon)</span><input name="contact" value="' + esc(c.contact || "") + '" required></label>' +
        "</div>" +
        '<label class="field"><span>Dokumen legalitas / NIB (PDF, JPG, PNG — maks. 10 MB)</span>' +
          '<input type="file" name="legal" accept=".pdf,.jpg,.jpeg,.png"></label>' +
        '<ul class="check-list">' + docs + "</ul>" +
        '<div class="ob-actions"><button type="button" class="btn btn-outline" data-close-modal>Batal</button>' +
        '<button type="submit" class="btn btn-primary">Simpan profil usaha</button></div>' +
      "</form>",
      { name: "partner", wide: true }
    );

    $$("#modal-sheet [data-doc-index]").forEach(btn => btn.addEventListener("click", async () => {
      const index = Number(btn.dataset.docIndex);
      const doc = state.user.company.documents[index];
      if (!doc) return;
      await supabase.storage.from("company_docs").remove([doc.path]);
      const next = state.user.company.documents.filter((_, i) => i !== index);
      await supabase.from("profiles").update({ company_documents: next }).eq("id", currentUid());
      state.user.company.documents = next;
      openPartnerProfile();
    }));

    $("#partner-form").addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      let documents = (state.user.company.documents || []).slice();
      const file = fd.get("legal");
      if (file && file.size) {
        if (file.size > 10 * 1024 * 1024) { toast("Dokumen terlalu besar (maks. 10 MB).", "warn"); return; }
        const path = currentUid() + "/" + Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const up = await supabase.storage.from("company_docs").upload(path, file, { upsert: true });
        if (up.error) { toast("Gagal unggah dokumen: " + up.error.message, "warn"); return; }
        documents.push({ name: file.name, path: path });
      }
      const { error } = await supabase.from("profiles").update({
        company_name: String(fd.get("company_name")).trim(),
        company_description: String(fd.get("company_description")).trim(),
        website: String(fd.get("website")).trim(),
        contact: String(fd.get("contact")).trim(),
        company_documents: documents
      }).eq("id", currentUid());
      if (error) { toast("Gagal menyimpan profil usaha: " + error.message, "warn"); return; }
      state.user.company = {
        name: String(fd.get("company_name")).trim(),
        description: String(fd.get("company_description")).trim(),
        website: String(fd.get("website")).trim(),
        contact: String(fd.get("contact")).trim(),
        documents: documents
      };
      closeModal();
      renderApp();
      toast("Profil usaha disimpan. Menunggu verifikasi admin.", "ok");
    });
  }

  /* ============================================================
     DASHBOARD MODERASI ADMIN
     ============================================================ */
  function renderAdmin() {
    if (!currentUid() || !state.user || state.user.role !== "admin") {
      $("#app-main").innerHTML = '<div class="page-head"><h2>Moderasi Admin</h2></div>' +
        emptyState("Akses khusus admin", "Hanya akun dengan role admin yang dapat memverifikasi mitra dan menyetujui lowongan.", "");
      return;
    }
    if (state.adminLoadedFor !== currentUid()) {
      state.adminLoadedFor = currentUid();
      loadAdminData().then(() => { if (state.tab === "admin") renderApp(); });
    }

    const mitraRows = state.admin.mitra.length
      ? '<div class="app-list">' + state.admin.mitra.map(p => {
          const docs = p.company_documents || [];
          return '<div class="app-row">' +
            "<div><strong>" + esc(p.company_name || p.full_name || "Mitra") + "</strong>" +
              '<div class="job-org">' + esc(p.contact || "-") + " · " + docs.length + " dokumen</div>" +
              '<div class="job-tags">' + docs.map(d =>
                '<button class="tag link" data-doc="' + esc(d.path) + '" data-doc-bucket="company_docs">' + esc(d.name) + "</button>").join("") + "</div>" +
            "</div>" +
            (p.is_verified
              ? '<span class="app-status">Terverifikasi</span>'
              : '<button class="btn btn-primary btn-sm" data-verify-mitra="' + p.id + '">Verifikasi Mitra</button>') +
            "</div>";
        }).join("") + "</div>"
      : emptyState("Belum ada mitra mendaftar", "Mitra baru akan muncul di sini setelah mendaftar.", "");

    const jobRows = state.admin.jobs.length
      ? '<div class="app-list">' + state.admin.jobs.map(j =>
          '<div class="app-row">' +
            "<div><strong>" + esc(j.title) + "</strong>" +
              '<div class="job-org">' + esc(j.org) + " · " + esc(j.area || j.city) + " · " + payLabel(j) + "</div>" +
              '<p class="panel-sub">' + esc((j.desc || "").slice(0, 160)) + "</p></div>" +
            '<div class="owner-actions">' +
              '<button class="btn btn-outline btn-sm" data-job="' + j.id + '">Lihat</button>' +
              '<button class="btn btn-primary btn-sm" data-moderate-job="' + j.id + '" data-status="approved">Setujui</button>' +
              '<button class="btn btn-ghost btn-sm" data-moderate-job="' + j.id + '" data-status="rejected">Tolak</button>' +
            "</div></div>").join("") + "</div>"
      : emptyState("Tidak ada lowongan menunggu", "Lowongan baru dari mitra masuk ke sini dengan status pending.", "");

    $("#app-main").innerHTML =
      '<div class="page-head"><h2>Moderasi Admin</h2>' +
      "<p>Verifikasi legalitas mitra dan putuskan lowongan sebelum tayang ke publik.</p></div>" +
      '<div class="panel"><h3>Mitra menunggu verifikasi</h3>' + mitraRows + "</div>" +
      '<div class="panel" style="margin-top:14px"><h3>Lowongan menunggu moderasi</h3>' + jobRows + "</div>";
  }

  async function verifyMitra(id) {
    const { error } = await supabase.from("profiles").update({ is_verified: true }).eq("id", id);
    if (error) { toast("Gagal memverifikasi: " + error.message, "warn"); return; }
    state.adminLoadedFor = null;
    await loadJobs();
    await loadAdminData();
    renderApp();
    toast("Mitra terverifikasi", "ok");
  }

  async function moderateJob(id, status) {
    const { error } = await supabase.from("jobs").update({ status: status }).eq("id", id);
    if (error) { toast("Gagal memperbarui lowongan: " + error.message, "warn"); return; }
    state.adminLoadedFor = null;
    await loadJobs();
    await loadAdminData();
    renderApp();
    toast(status === "approved" ? "Lowongan disetujui dan tayang" : "Lowongan ditolak", "ok");
  }

  async function openSignedDoc(bucket, path) {
    if (!path) return;
    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 3600);
    if (error || !data) { toast("Gagal membuka berkas: " + (error ? error.message : "tidak tersedia"), "warn"); return; }
    window.open(data.signedUrl, "_blank", "noopener");
  }

  /* ============================================================
     HALAMAN PEMBAYARAN
     ============================================================ */
  function renderCheckout() {
    const product = state.checkout.product;
    const mitra = product === "mitra";
    const plans = activePlans();
    const plan = plans.find(p => p.id === state.checkout.planId) || plans[0];
    const method = state.checkout.method;
    const title = mitra ? "Mitra Pro" : "Sifela Plus";

    const back = paymentViewOpen()
      ? '<button class="link" data-go="landing">← Kembali ke Beranda</button>'
      : '<button class="link" data-app-nav="' + (mitra ? "mitra" : "premium") + '">← Kembali</button>';
    const head = '<div class="page-head">' + back +
      '<h2 style="margin-top:10px">Pembayaran ' + title + "</h2>" +
      "<p>Pilih paket, tentukan metode pembayaran, lalu konfirmasi. Ini simulasi; tidak ada dana yang ditarik.</p></div>";

    const step1 = '<div class="panel"><div class="checkout-step"><b>1</b><h3>Pilih paket</h3></div>' +
      '<div class="plan-grid">' + plans.map(p =>
        '<button class="plan-card' + (p.id === plan.id ? " selected" : "") + '" data-checkout-plan="' + p.id + '">' +
          "<h4>" + p.label + "</h4>" +
          '<div class="plan-price">' + fmtRpFull(p.price) + "</div>" +
          '<div class="plan-note">' + p.note + "</div>" +
        "</button>").join("") + "</div></div>";

    const step2 = '<div class="panel"><div class="checkout-step"><b>2</b><h3>Metode pembayaran</h3></div>' +
      '<div class="pay-methods">' +
        '<button class="pay-method' + (method === "qris" ? " selected" : "") + '" data-checkout-method="qris">' +
          '<span class="pm-ico">📱</span> QRIS</button>' +
        '<button class="pay-method' + (method === "ewallet" ? " selected" : "") + '" data-checkout-method="ewallet">' +
          '<span class="pm-ico">💳</span> E-wallet</button>' +
        '<button class="pay-method' + (method === "transfer" ? " selected" : "") + '" data-checkout-method="transfer">' +
          '<span class="pm-ico">🏦</span> Transfer</button>' +
      "</div>" +
      (method === "qris"
        ? '<div class="pay-instruction"><div class="qris-box">QRIS<br><small>sifela.id</small></div>' +
          "<p>Scan dengan aplikasi pembayaran apa pun setelah konfirmasi. Kode ini hanya ilustrasi.</p></div>"
        : method === "ewallet"
          ? '<div class="pay-instruction"><div class="pay-code">sifela.id / e-wallet</div>' +
            "<p>Pilih GoPay, OVO, DANA, atau ShopeePay di aplikasi masing-masing (simulasi).</p></div>"
          : '<div class="pay-instruction"><div class="pay-code">BANK SIFELA · 9001 2026</div>' +
            "<p>Transfer ke nomor rekening contoh, lalu simpan bukti (simulasi).</p></div>") +
      "</div>";

    const summary = '<div class="checkout-side"><div class="panel">' +
      "<h3>Ringkasan pesanan</h3>" +
      '<div class="checkout-summary">' +
        '<div class="checkout-row"><span>' + title + " · " + plan.label + "</span><span>" + fmtRpFull(plan.price) + "</span></div>" +
        '<div class="checkout-row"><span>Biaya layanan</span><span>Rp0</span></div>' +
        '<div class="checkout-row total"><span>Total bayar</span><span>' + fmtRpFull(plan.price) + "</span></div>" +
      "</div>" +
      '<div class="demo-note">⚠️ Mode demo. Tombol di bawah hanya mengubah status paket di browser ini.</div>' +
      '<button class="btn btn-gold btn-block" data-pay>Bayar ' + fmtRpFull(plan.price) + "</button>" +
      '<p class="paywall-foot">Dengan melanjutkan, Anda menyetujui simulasi langganan sifela.id.</p>' +
      "</div></div>";

    checkoutTarget().innerHTML = head + '<div class="checkout-grid"><div>' + step1 + step2 + "</div>" + summary + "</div>";
  }

  function renderSuccess() {
    const mitra = state.checkout.product === "mitra";
    const inPayment = paymentViewOpen();
    const primary = inPayment
      ? (mitra
          ? '<button class="btn btn-primary" data-go="cari">Kelola Lowongan</button>'
          : '<button class="btn btn-primary" data-go="cari">Mulai Cari Lowongan</button>')
      : (mitra
          ? '<button class="btn btn-primary" data-app-nav="mitra">Kelola lowongan</button>'
          : '<button class="btn btn-primary" data-app-nav="cari">Mulai cari kerja</button>');
    const secondary = inPayment
      ? '<button class="btn btn-outline" data-go="landing">Kembali ke Beranda</button>'
      : '<button class="btn btn-outline" data-app-nav="premium">Lihat paket</button>';

    checkoutTarget().innerHTML =
      '<div class="success-card"><div class="success-ico">🎉</div>' +
      "<h2>Pembayaran berhasil</h2>" +
      "<p>" + (mitra ? "Mitra Pro" : "Sifela Plus") +
        " aktif pada akun ini. Seluruh fitur berbayar langsung dapat digunakan.</p>" +
      '<div class="success-chip">' + (mitra ? "Mitra Pro" : "Sifela Plus") + " aktif</div>" +
      '<div class="success-actions">' + primary + secondary + "</div>" +
      '<p class="paywall-foot">Simulasi prototipe sifela.id — tidak ada transaksi nyata.</p>' +
      "</div>";
  }

  function emptyState(title, sub, actionHtml) {
    return '<div class="empty"><div class="e-ico">🔍</div><h3>' + esc(title) + "</h3><p>" + esc(sub) + "</p>" +
      (actionHtml || "") + "</div>";
  }

  /* ============================================================
     MODAL
     ============================================================ */
  function openModal(html, opts) {
    const o = opts || {};
    const root = $("#modal-root");
    const sheet = $("#modal-sheet");
    sheet.className = "modal-sheet" + (o.wide ? " wide" : "");
    sheet.innerHTML = '<button class="modal-close" data-close-modal aria-label="Tutup">✕</button>' + html;
    root.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    state.modal = o.name || "generic";
  }

  function closeModal() {
    $("#modal-root").classList.add("hidden");
    $("#modal-sheet").innerHTML = "";
    document.body.style.overflow = "";
    state.modal = null;
  }

  /* ---------------- paywall ---------------- */
  function openPaywall(reason) {
    const reasons = {
      jobs: ["Buka semua lowongan", "Kamu sudah melihat 6 lowongan gratis. Plus membuka seluruh daftar tanpa batas."],
      score: ["Lihat skor kecocokan", "Plus menampilkan persentase kecocokan dan rincian per faktor untuk setiap lowongan."],
      radius: ["Perluas jangkauan", "Paket Gratis dibatasi 10 km. Plus membuka radius hingga 50 km."],
      apply: ["Kuota lamaran habis", "Paket Gratis memberi 3 lamaran per bulan. Plus tidak membatasi jumlah lamaran."],
      contact: ["Kontak langsung", "Hubungi perekrut langsung lewat chat hanya tersedia di Plus."],
      alert: ["Notifikasi shift baru", "Dapatkan pemberitahuan saat shift baru muncul di radiusmu — fitur Plus."],
      boost: ["Tonjolkan lowonganmu", "Mitra Pro menaruh lowonganmu di urutan teratas, menampilkan badge “Ditonjolkan”, dan membuka statistik lamaran."],
      partnerQuota: ["Pasang lebih banyak lowongan", "Gratis maksimal " + FREE_PARTNER_JOBS + " lowongan aktif. Mitra Pro membuka hingga 10 lowongan sekaligus."],
      partnerStats: ["Statistik calon pekerja", "Lihat jumlah pembuka dan lamaran masuk untuk setiap lowonganmu dengan Mitra Pro."]
    };
    const r = reasons[reason] || reasons.jobs;
    const forPartner = !!reasons[reason] && /^(boost|partnerQuota|partnerStats)$/.test(reason);

    openModal(
      '<div class="paywall-head">' +
        '<div class="paywall-ico">✨</div>' +
        "<h3>" + esc(r[0]) + "</h3>" +
        "<p>" + esc(r[1]) + "</p>" +
      "</div>" +
      '<ul class="paywall-list">' +
        (forPartner
          ? "<li>Hingga 10 lowongan aktif sekaligus</li>" +
            "<li>Badge “Ditonjolkan” di pencarian</li>" +
            "<li>Statistik pembuka & lamaran masuk</li>" +
            "<li>Verifikasi mitra diprioritaskan</li>"
          : "<li>Semua lowongan tanpa batas</li>" +
            "<li>Skor kecocokan + rincian faktor</li>" +
            "<li>Radius hingga 50 km</li>" +
            "<li>Lamaran tanpa batas</li>" +
            "<li>Kontak langsung & notifikasi shift baru</li>") +
      "</ul>" +
      '<button class="btn btn-gold btn-block" id="pw-cta">' +
        (forPartner ? "Lihat paket Mitra Pro — mulai Rp49.000" : "Lihat paket Plus — mulai Rp29.000") +
      "</button>" +
      '<p class="paywall-foot">Simulasi prototipe. Tidak ada pembayaran nyata.</p>',
      { name: "paywall" }
    );

    $("#pw-cta").addEventListener("click", () => {
      closeModal();
      if (forPartner) goCheckout("mitra");
      else { state.tab = "premium"; renderApp(); }
    });
  }

  /* ---------------- checkout ---------------- */
  function goCheckout(product, planId) {
    const plans = product === "mitra" ? PARTNER_PLANS : PLANS;
    state.checkout.product = product;
    state.checkout.planId = planId || plans[0].id;
    state.tab = "checkout";
    renderApp();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function payNow() {
    const product = state.checkout.product;
    const plans = activePlans();
    const plan = plans.find(p => p.id === state.checkout.planId) || plans[0];
    const until = Date.now() + plan.days * 864e5;

    if (product === "mitra") {
      state.user.partnerPlan = { type: "pro", until: until, plan: plan.id };
    } else {
      state.user.plan = { type: "plus", until: until, plan: plan.id };
    }
    persistUser();

    if (paymentViewOpen()) {
      renderSuccess();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    renderSidebar();
    state.tab = "sukses";
    renderApp();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------------- job detail ---------------- */
  function openJob(jobId) {
    const job = DATA.jobs.find(j => j.id === jobId);
    if (!job) return;
    const s = scoreJob(job);
    const premium = isPremium();
    const applied = (state.user.applications || []).some(a => a.jobId === job.id);
    const saved = (state.user.saved || []).includes(job.id);

    const scoreBlock = premium
      ? '<div class="fs-row" style="margin-bottom:14px"><span>Skor kecocokan</span>' +
        '<b style="margin-left:auto">' + s.total + "%</b></div>" +
        '<div class="rec-factor"><span>Skill</span><div class="bar"><div style="width:' + Math.round(s.parts.skill / 40 * 100) + '%"></div></div><b>' + Math.round(s.parts.skill) + "/40</b></div>" +
        '<div class="rec-factor"><span>Minat</span><div class="bar"><div style="width:' + Math.round(s.parts.category / 20 * 100) + '%"></div></div><b>' + Math.round(s.parts.category) + "/20</b></div>" +
        '<div class="rec-factor"><span>Jadwal</span><div class="bar"><div style="width:' + Math.round(s.parts.schedule / 20 * 100) + '%"></div></div><b>' + Math.round(s.parts.schedule) + "/20</b></div>" +
        '<div class="rec-factor"><span>Jarak</span><div class="bar"><div style="width:' + Math.round(s.parts.distance / 20 * 100) + '%"></div></div><b>' + Math.round(s.parts.distance) + "/20</b></div>"
      : '<button class="btn btn-outline btn-block btn-sm" data-open-premium="score" style="margin-bottom:14px">🔒 Lihat skor kecocokan (Plus)</button>';

    openModal(
      '<div class="jd-head">' +
        '<div class="job-logo">' + ICONS[job.cat] + "</div>" +
        '<div><h3>' + esc(job.title) + "</h3>" +
        "<p>" + esc(job.org) + " · " + esc(areaText(job)) + "</p></div>" +
      "</div>" +
      '<div class="jd-grid">' +
        '<div class="jd-cell"><span>Upah</span><b>' + payLabel(job) + "</b></div>" +
        '<div class="jd-cell"><span>Hari</span><b>' + daysText(job) + "</b></div>" +
        (timeText(job) ? '<div class="jd-cell"><span>Jam</span><b>' + timeText(job) + "</b></div>" : "") +
        '<div class="jd-cell"><span>Durasi</span><b>' + (job.hours ? job.hours + " jam/shift" : "Per proyek") + "</b></div>" +
        '<div class="jd-cell"><span>Slot tersedia</span><b>' + job.slots + " orang</b></div>" +
        (job.reviews > 0
          ? '<div class="jd-cell"><span>Rating mitra</span><b>⭐ ' + job.rating + " (" + job.reviews + " ulasan)</b></div>"
          : "") +
      "</div>" +
      '<p class="jd-desc">' + esc(job.desc) + "</p>" +
      (job.sourceUrl
        ? '<p><a class="source-link" href="' + esc(job.sourceUrl) + '" target="_blank" rel="noopener noreferrer">Lihat sumber lowongan ↗</a></p>'
        : "") +
      (isConflict(job) && !isPremium()
        ? '<div class="demo-note">⚠️ Shift ini kemungkinan bentrok dengan hari tersediamu. Atur ulang di Profil.</div>'
        : "") +
      scoreBlock +
      '<div class="jd-actions">' +
        '<button class="btn btn-primary" id="jd-apply"' + (applied ? " disabled" : "") + ">" +
          (applied ? "Sudah dilamar" : "Lamar sekarang") + "</button>" +
        '<button class="btn btn-outline" id="jd-save">' + (saved ? "★ Tersimpan" : "☆ Simpan") + "</button>" +
        '<button class="btn btn-outline" id="jd-contact">💬 Kontak</button>' +
      "</div>" +
      '<p class="paywall-foot">Lowongan dari mitra terverifikasi dan dimoderasi admin.</p>',
      { name: "job", wide: true }
    );

    $("#jd-apply").addEventListener("click", () => {
      if (!currentUid()) { closeModal(); showView("auth"); setAuthTab("login"); return; }
      if (!canApplyMore()) { closeModal(); openPaywall("apply"); return; }
      if (applied) return;
      openApplyForm(job);
    });

    $("#jd-save").addEventListener("click", () => {
      state.user.saved = state.user.saved || [];
      const i = state.user.saved.indexOf(job.id);
      if (i >= 0) { state.user.saved.splice(i, 1); toast("Dihapus dari simpanan"); }
      else { state.user.saved.push(job.id); toast("Disimpan", "ok"); }
      persistUser();
      $("#jd-save").textContent = state.user.saved.includes(job.id) ? "★ Tersimpan" : "☆ Simpan";
    });

    $("#jd-contact").addEventListener("click", () => {
      if (!isPremium()) { closeModal(); openPaywall("contact"); return; }
      toast("Chat dibuka — ini simulasi prototipe");
    });

    const scoreBtn = $("#modal-sheet [data-open-premium]");
    if (scoreBtn) scoreBtn.addEventListener("click", () => { closeModal(); openPaywall("score"); });
  }

  /* Lamaran nyata: unggah CV ke bucket cvs lalu simpan baris applications. */
  function openApplyForm(job) {
    openModal(
      '<h3 style="font-size:19px;font-weight:800;margin-bottom:4px">Lamar: ' + esc(job.title) + "</h3>" +
      '<p class="panel-sub">CV dikirim langsung ke mitra pemilik lowongan.</p>' +
      '<form id="apply-form">' +
        '<label class="field"><span>CV (PDF/DOC/DOCX, maks. 5 MB)</span>' +
          '<input type="file" name="cv" accept=".pdf,.doc,.docx,application/pdf" required></label>' +
        '<label class="field"><span>Surat singkat / pesan (opsional)</span>' +
          '<textarea name="cover" rows="4" style="width:100%;padding:11px 14px;border:1px solid var(--line);border-radius:var(--radius-sm);font-family:inherit;font-size:14px" placeholder="Ceritakan singkat mengapa Anda cocok"></textarea></label>' +
        '<div class="ob-actions"><button type="button" class="btn btn-outline" data-close-modal>Batal</button>' +
        '<button type="submit" class="btn btn-primary">Kirim lamaran</button></div>' +
      "</form>",
      { name: "apply", wide: true }
    );

    $("#apply-form").addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      const file = fd.get("cv");
      if (!file || !file.size) { toast("Pilih berkas CV terlebih dahulu.", "warn"); return; }
      if (file.size > 5 * 1024 * 1024) { toast("CV terlalu besar (maks. 5 MB).", "warn"); return; }
      const path = currentUid() + "/" + Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const up = await supabase.storage.from("cvs").upload(path, file, { upsert: true });
      if (up.error) { toast("Gagal unggah CV: " + up.error.message, "warn"); return; }

      const { error } = await supabase.from("applications").insert({
        job_id: job.id,
        applicant_id: currentUid(),
        cv_url: path,
        cv_file_name: file.name,
        cover_letter: String(fd.get("cover") || "").trim(),
        status: "pending"
      });
      if (error) {
        await supabase.storage.from("cvs").remove([path]);
        toast("Gagal mengirim lamaran: " + error.message, "warn");
        return;
      }
      closeModal();
      await loadMyApplications();
      renderApp();
      toast("Lamaran terkirim ke " + job.org, "ok");
    });
  }

  /* ---------------- onboarding ---------------- */
  function startOnboarding() {
    let step = 0;
    const draft = {
      interests: state.user.profile.interests.slice(),
      skills: state.user.profile.skills.slice(),
      days: state.user.profile.days.slice(),
      radius: state.user.profile.radius
    };

    function draw() {
      const dots = '<div class="ob-steps">' +
        [0, 1, 2].map(i => '<div class="ob-step' + (i <= step ? " done" : "") + '"></div>').join("") +
        "</div>";

      let body = "";
      if (step === 0) {
        body = '<div class="ob-title">Apa yang kamu minati?</div>' +
          '<div class="ob-sub">Pilih satu atau lebih. Dipakai untuk mencocokkan lowongan.</div>' +
          '<div class="skill-grid">' + DATA.categories.map(c =>
            '<button class="chip' + (draft.interests.includes(c.id) ? " active" : "") + '" data-ob-cat="' + c.id + '">' +
            c.icon + " " + c.label + "</button>").join("") + "</div>";
      } else if (step === 1) {
        body = '<div class="ob-title">Skill yang kamu punya</div>' +
          '<div class="ob-sub">Tidak harus mahir — pilih yang kamu nyaman kerjakan.</div>' +
          '<div class="skill-grid">' + DATA.skills.map(s =>
            '<button class="chip' + (draft.skills.includes(s) ? " active" : "") + '" data-ob-skill="' + esc(s) + '">' +
            esc(s) + "</button>").join("") + "</div>";
      } else {
        body = '<div class="ob-title">Jadwal & jangkauan</div>' +
          '<div class="ob-sub">Kami akan menyembunyikan shift yang bentrok.</div>' +
          '<div class="day-grid" style="margin-bottom:18px">' + DATA.days.map(d =>
            '<button class="day-btn' + (draft.days.includes(d.id) ? " active" : "") + '" data-ob-day="' + d.id + '">' +
            d.label + "</button>").join("") + "</div>" +
          '<label class="field"><span>Radius: <b id="ob-r-label">' + draft.radius + " km</b></span>" +
            '<input type="range" id="ob-radius" min="1" max="' + MAX_RADIUS + '" value="' + draft.radius + '"></label>' +
          '<div class="demo-note">Radius di atas 10 km hanya aktif setelah Plus.</div>';
      }

      const actions = '<div class="ob-actions">' +
        (step > 0 ? '<button class="btn btn-outline" data-ob-back>Kembali</button>' : "") +
        '<button class="btn btn-primary" data-ob-next>' + (step === 2 ? "Selesai" : "Lanjut") + "</button>" +
        "</div>";

      openModal(dots + body + actions, { name: "onboarding", wide: true });

      $$("#modal-sheet [data-ob-cat]").forEach(b => b.addEventListener("click", () => {
        const v = b.dataset.obCat;
        const i = draft.interests.indexOf(v);
        if (i >= 0) draft.interests.splice(i, 1); else draft.interests.push(v);
        b.classList.toggle("active");
      }));
      $$("#modal-sheet [data-ob-skill]").forEach(b => b.addEventListener("click", () => {
        const v = b.dataset.obSkill;
        const i = draft.skills.indexOf(v);
        if (i >= 0) draft.skills.splice(i, 1); else draft.skills.push(v);
        b.classList.toggle("active");
      }));
      $$("#modal-sheet [data-ob-day]").forEach(b => b.addEventListener("click", () => {
        const v = b.dataset.obDay;
        const i = draft.days.indexOf(v);
        if (i >= 0) draft.days.splice(i, 1); else draft.days.push(v);
        b.classList.toggle("active");
      }));

      const rSlider = $("#ob-radius");
      if (rSlider) rSlider.addEventListener("input", () => {
        draft.radius = Number(rSlider.value);
        $("#ob-r-label").textContent = draft.radius + " km";
      });

      const backBtn = $("#modal-sheet [data-ob-back]");
      if (backBtn) backBtn.addEventListener("click", () => { step--; draw(); });

      $("#modal-sheet [data-ob-next]").addEventListener("click", () => {
        if (step < 2) { step++; draw(); return; }
        state.user.profile.interests = draft.interests;
        state.user.profile.skills = draft.skills;
        state.user.profile.days = draft.days;
        state.user.profile.radius = Math.min(draft.radius, FREE.maxRadius);
        state.user.profile.onboarded = true;
        persistUser();
        closeModal();
        state.filters.city = state.user.profile.city;
        state.filters.radius = state.user.profile.radius;
        renderSidebar();
        state.tab = "rekomendasi";
        renderApp();
        toast("Profil siap. Ini rekomendasi pertamamu ✨", "ok");
      });
    }

    draw();
  }

  /* ============================================================
     AUTH
     ============================================================ */
  function showView(name) {
    ["landing", "auth", "app", "payment"].forEach(v => {
      $("#view-" + v).classList.toggle("hidden", v !== name);
    });
    window.scrollTo(0, 0);
  }

  /* halaman pembayaran bisa dibuka tanpa masuk lebih dulu */
  function paymentViewOpen() {
    return !$("#view-payment").classList.contains("hidden");
  }

  function checkoutTarget() {
    return paymentViewOpen() ? $("#payment-main") : $("#app-main");
  }

  function guestUser() {
    return {
      name: "Pengguna Tamu",
      email: "",
      role: "pencari",
      profile: defaultProfile("bandung"),
      plan: { type: "free", until: 0 },
      partnerPlan: { type: "free", until: 0 },
      saved: [],
      applications: []
    };
  }

  /* Menu "Cari Lowongan" langsung membuka hasil pencarian.
     Pengguna tanpa sesi mendapat akun tamu sementara. */
  function openSearch() {
    if (!state.user) state.user = guestUser();
    state.tab = "cari";
    state.filters.city = state.user.profile.city;
    state.filters.radius = Math.min(state.user.profile.radius, isPremium() ? MAX_RADIUS : FREE.maxRadius);
    showView("app");
    renderSidebar();
    renderApp();
    if (!sessionEmail()) toast("Pencarian ditampilkan dengan akun tamu.", "ok");
  }

  /* Menu "Akun & Profil": pengguna yang sudah masuk langsung ke profil.
     Pengguna tanpa sesi tetap diarahkan ke halaman masuk/daftar. */
  function openAccount() {
    if (sessionEmail() && state.user) {
      state.tab = "profil";
      showView("app");
      renderSidebar();
      renderApp();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    showView("auth");
    setAuthTab("register");
  }

  /* Tombol Sifela Plus di homepage langsung menuju pembayaran */
  function openGuestCheckout() {
    if (!state.user) state.user = guestUser();
    state.checkout.product = "plus";
    state.checkout.planId = PLANS[0].id;
    showView("payment");
    renderCheckout();
    window.scrollTo(0, 0);
  }

  function setAuthTab(mode) {
    $$(".auth-tab").forEach(t => t.classList.toggle("active", t.dataset.authTab === mode));
    $("#form-login").classList.toggle("hidden", mode !== "login");
    $("#form-register").classList.toggle("hidden", mode !== "register");
    $$(".form-error").forEach(e => e.textContent = "");
  }

  function enterApp() {
    state.filters.city = state.user.profile.city;
    state.filters.radius = Math.min(state.user.profile.radius, isPremium() ? MAX_RADIUS : FREE.maxRadius);
    state.tab = state.user.role === "mitra"
      ? "mitra"
      : (state.user.profile.onboarded ? "cari" : "rekomendasi");
    showView("app");
    renderSidebar();
    renderApp();
  }

  function finishRegistration(fresh) {
    enterApp();
    if (fresh && state.user.role !== "mitra") startOnboarding();
    else if (fresh) toast("Akun mitra siap. Pasang lowongan pertama Anda 🏪", "ok");
  }

  async function login(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
      email: String(email || "").trim(),
      password: String(password || "")
    });
    if (error) {
      return error.message === "Invalid login credentials"
        ? "Email atau kata sandi salah."
        : error.message;
    }
    return null;
  }

  async function register(data) {
    const email = String(data.email || "").toLowerCase().trim();
    const { data: result, error } = await supabase.auth.signUp({
      email,
      password: String(data.password || ""),
      options: {
        data: {
          full_name: String(data.name || "").trim(),
          role: data.role === "mitra" ? "mitra" : "pelamar"
        }
      }
    });
    if (error) return error.message;
    if (!result.session) return "Akun dibuat. Silakan masuk (konfirmasi email mungkin diperlukan).";

    const { error: upErr } = await supabase.from("profiles").update({
      full_name: String(data.name || "").trim(),
      city: data.city
    }).eq("id", result.user.id);
    if (upErr) return upErr.message;
    return null;
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) toast("Gagal keluar: " + error.message, "warn");
    state.session = null;
    state.user = null;
    state.applications = [];
    DATA.jobs = [];
    closeModal();
    showView("landing");
  }

  /* ============================================================
     EVENTS
     ============================================================ */
  function bindEvents() {
    document.addEventListener("click", (ev) => {
      const t = ev.target;

      const closeBtn = t.closest("[data-close-modal]");
      if (closeBtn) { closeModal(); return; }

      const goBtn = t.closest("[data-go]");
      if (goBtn) {
        ev.preventDefault();
        const dest = goBtn.dataset.go;
        if (dest === "auth") { showView("auth"); setAuthTab(goBtn.dataset.mode || "login"); }
        else if (dest === "akun") openAccount();
        else if (dest === "cari") openSearch();
        else if (dest === "payment") openGuestCheckout();
        else showView(dest);
        return;
      }

      const authTab = t.closest("[data-auth-tab]");
      if (authTab) { ev.preventDefault(); setAuthTab(authTab.dataset.authTab); return; }

      const navBtn = t.closest("[data-app-nav]");
      if (navBtn) {
        ev.preventDefault();
        if (!state.user) { showView("auth"); setAuthTab("login"); return; }
        state.tab = navBtn.dataset.appNav;
        if (state.tab === "cari") { $("#sidebar").style.display = ""; }
        renderApp();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const premiumBtn = t.closest("[data-open-premium]");
      if (premiumBtn) { ev.preventDefault(); openPaywall(premiumBtn.dataset.openPremium || "jobs"); return; }

      const checkoutBtn = t.closest("[data-open-checkout]");
      if (checkoutBtn) {
        ev.preventDefault();
        goCheckout(checkoutBtn.dataset.openCheckout || "plus");
        return;
      }

      const jobEl = t.closest("[data-job]");
      if (jobEl) {
        if (jobEl.classList.contains("locked")) { openPaywall("jobs"); return; }
        openJob(jobEl.dataset.job);
        return;
      }

      const avatar = t.closest("#avatar-btn");
      if (avatar) { state.tab = "profil"; renderApp(); return; }
    });

    // filter chips (delegated)
    $("#sidebar").addEventListener("click", (ev) => {
      const t = ev.target;
      const cat = t.closest("[data-cat]");
      if (cat) { toggleIn(state.filters.cats, cat.dataset.cat); renderSidebar(); renderApp(); return; }
      const typ = t.closest("[data-type]");
      if (typ) { toggleIn(state.filters.types, typ.dataset.type); renderSidebar(); renderApp(); return; }
      const day = t.closest("[data-day]");
      if (day) { toggleIn(state.filters.days, day.dataset.day); renderSidebar(); renderApp(); return; }
    });

    $("#filter-city").addEventListener("change", (e) => {
      state.filters.city = e.target.value;
      renderSidebar(); renderApp();
    });

    $("#filter-radius").addEventListener("input", (e) => {
      state.filters.radius = Number(e.target.value);
      $("#radius-label").textContent = state.filters.radius + " km";
      renderReachBars();
      renderApp();
    });

    $("#filter-pay").addEventListener("input", (e) => {
      state.filters.minPay = Number(e.target.value);
      $("#pay-label").textContent = state.filters.minPay > 0 ? fmtRp(state.filters.minPay) + "/jam" : "Bebas";
      renderApp();
    });

    $("#filter-schedule").addEventListener("change", (e) => {
      state.filters.scheduleOnly = e.target.checked;
      renderApp();
    });

    $("#filter-match").addEventListener("change", (e) => {
      state.filters.matchOnly = e.target.checked;
      renderApp();
    });

    $("#reset-filters").addEventListener("click", () => {
      state.filters.cats = []; state.filters.types = []; state.filters.days = [];
      state.filters.minPay = 0; state.filters.scheduleOnly = false; state.filters.matchOnly = false;
      state.filters.q = ""; $("#global-search").value = "";
      state.filters.radius = state.user.profile.radius;
      state.filters.sort = "relevance";
      renderSidebar(); renderApp();
    });

    // global search
    let searchTimer = null;
    $("#global-search").addEventListener("input", (e) => {
      clearTimeout(searchTimer);
      const val = e.target.value;
      searchTimer = setTimeout(() => {
        state.filters.q = val;
        if (state.tab !== "cari") state.tab = "cari";
        renderApp();
      }, 180);
    });

    // klik di area aplikasi dan halaman pembayaran memakai penangan yang sama
    function handleMainClick(ev) {
      const t = ev.target;

      const ckPlan = t.closest("[data-checkout-plan]");
      if (ckPlan) { state.checkout.planId = ckPlan.dataset.checkoutPlan; renderCheckout(); return; }

      const ckMethod = t.closest("[data-checkout-method]");
      if (ckMethod) { state.checkout.method = ckMethod.dataset.checkoutMethod; renderCheckout(); return; }

      if (t.closest("[data-pay]")) { payNow(); return; }

      const postBtn = t.closest("[data-post-job]");
      if (postBtn) { openPostJob(); return; }

      const boostBtn = t.closest("[data-boost]");
      if (boostBtn) { ev.stopPropagation(); toggleBoost(boostBtn.dataset.boost); return; }

      const delBtn = t.closest("[data-del-job]");
      if (delBtn) { ev.stopPropagation(); deleteJob(delBtn.dataset.delJob); return; }

      const partnerBtn = t.closest("[data-partner-profile]");
      if (partnerBtn) { openPartnerProfile(); return; }

      const verifyBtn = t.closest("[data-verify-mitra]");
      if (verifyBtn) { verifyMitra(verifyBtn.dataset.verifyMitra); return; }

      const modBtn = t.closest("[data-moderate-job]");
      if (modBtn) { moderateJob(modBtn.dataset.moderateJob, modBtn.dataset.status); return; }

      const docBtn = t.closest("[data-doc]");
      if (docBtn) { openSignedDoc(docBtn.dataset.docBucket || "company_docs", docBtn.dataset.doc); return; }

      const cvBtn = t.closest("[data-cv]");
      if (cvBtn) { openSignedDoc(cvBtn.dataset.cvBucket || "cvs", cvBtn.dataset.cv); return; }

      const sortSel = t.closest("#sort-select");
      if (sortSel) return;

      const reset = t.closest("#empty-reset");
      if (reset) {
        state.filters.cats = []; state.filters.types = []; state.filters.days = [];
        state.filters.minPay = 0; state.filters.scheduleOnly = false; state.filters.q = "";
        state.filters.sort = "relevance";
        renderSidebar(); renderApp();
        return;
      }

      const pfCat = t.closest("[data-pf-cat]");
      if (pfCat) {
        toggleIn(state.user.profile.interests, pfCat.dataset.pfCat);
        persistUser(); renderProfil(); return;
      }
      const pfSkill = t.closest("[data-pf-skill]");
      if (pfSkill) {
        toggleIn(state.user.profile.skills, pfSkill.dataset.pfSkill);
        persistUser(); renderProfil(); return;
      }
      const pfDay = t.closest("[data-pf-day]");
      if (pfDay) {
        toggleIn(state.user.profile.days, pfDay.dataset.pfDay);
        persistUser(); renderProfil(); return;
      }

      const addExp = t.closest("#pf-add-exp");
      if (addExp) {
        state.user.profile.experiences.push({ role: "", org: "", period: "", type: "", desc: "" });
        persistUser(); renderProfil(); return;
      }

      const removeExp = t.closest("[data-exp-remove]");
      if (removeExp) {
        state.user.profile.experiences.splice(Number(removeExp.dataset.expRemove), 1);
        persistUser(); renderProfil(); toast("Pengalaman dihapus.");
        return;
      }

      if (t.closest("#pf-cv-clear")) {
        const oldPath = state.user.profile.cvUrl;
        state.user.profile.cvName = "";
        state.user.profile.cvUrl = "";
        state.user.profile.cvData = "";
        (async () => {
          if (oldPath) await supabase.storage.from("cvs").remove([oldPath]);
          await persistUser();
          renderProfil();
          toast("Berkas CV dihapus.");
        })();
        return;
      }

      if (t.closest("#pf-save")) {
        const val = (id) => $("#" + id) ? $("#" + id).value.trim() : "";
        const name = val("pf-name");
        if (name) state.user.name = name;
        const p = state.user.profile;
        p.phone = val("pf-phone");
        p.address = val("pf-address");
        p.headline = val("pf-headline");
        p.campus = val("pf-campus");
        p.education = val("pf-education");
        p.city = val("pf-city");
        p.availability = val("pf-availability") || "sesuai-jadwal";
        p.workType = val("pf-worktype");
        p.expectedPay = Number(val("pf-pay")) || 0;
        p.portfolio = val("pf-portfolio");
        p.radius = Number(val("pf-radius")) || p.radius;
        persistUser();
        state.filters.city = p.city;
        state.filters.radius = Math.min(p.radius, isPremium() ? MAX_RADIUS : FREE.maxRadius);
        renderSidebar(); renderApp();
        toast("Data profil berhasil disimpan.", "ok");
        return;
      }

      if (t.closest("#pf-logout")) { logout(); return; }

      if (t.closest("#pf-cancel")) {
        state.user.plan = { type: "free", until: 0 };
        persistUser(); renderSidebar(); renderApp();
        toast("Plus dijeda (demo)");
        return;
      }
    }

    $("#app-main").addEventListener("click", handleMainClick);
    $("#payment-main").addEventListener("click", handleMainClick);

    $("#app-main").addEventListener("change", (ev) => {
      const t = ev.target;
      if (t.id === "sort-select") {
        state.filters.sort = t.value;
        renderApp();
        return;
      }

      if (t.dataset && t.dataset.expField) {
        updateExperienceField(t);
        return;
      }

      if (t.id === "pf-cv-file") {
        const file = t.files && t.files[0];
        if (!file) return;
        if (!currentUid()) { toast("Masuk terlebih dahulu untuk menyimpan CV.", "warn"); return; }
        if (file.size > 5 * 1024 * 1024) {
          toast("Berkas terlalu besar. Gunakan file di bawah 5 MB.", "warn");
          return;
        }
        (async () => {
          const path = currentUid() + "/profil-" + Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
          const up = await supabase.storage.from("cvs").upload(path, file, { upsert: true });
          if (up.error) { toast("Gagal unggah CV: " + up.error.message, "warn"); return; }
          state.user.profile.cvName = file.name;
          state.user.profile.cvUrl = path;
          state.user.profile.cvData = "";
          await persistUser();
          renderProfil();
          toast("CV berhasil disimpan di Supabase Storage.", "ok");
        })();
      }
    });

    $("#app-main").addEventListener("input", (ev) => {
      const t = ev.target;
      if (t.id === "pf-radius") {
        const label = t.parentElement.querySelector("span");
        if (label) label.textContent = "Radius jangkauan (" + t.value + " km)";
        return;
      }
      if (t.dataset && t.dataset.expField) updateExperienceField(t);
    });

    // forms
    $("#form-login").addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      const errEl = $('[data-error-for="login"]');
      errEl.textContent = "Memeriksa akun…";
      const err = await login(fd.get("email"), fd.get("password"));
      errEl.textContent = err || "";
      if (!err) {
        await restoreSession();
        enterApp();
      }
    });

    $("#form-register").addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      const errEl = $('[data-error-for="register"]');
      errEl.textContent = "Membuat akun…";
      const err = await register({
        name: fd.get("name"),
        email: fd.get("email"),
        password: fd.get("password"),
        city: fd.get("city"),
        role: fd.get("role")
      });
      errEl.textContent = err || "";
      if (!err) {
        await restoreSession();
        finishRegistration(true);
      }
    });

    // modal backdrop close
    $("#modal-root").addEventListener("click", (ev) => {
      if (ev.target.dataset.closeModal !== undefined) closeModal();
    });

    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && state.modal) closeModal();
    });
  }

  function toggleIn(arr, val) {
    const i = arr.indexOf(val);
    if (i >= 0) arr.splice(i, 1); else arr.push(val);
  }

  /* Input pengalaman langsung tersimpan supaya tidak hilang
     ketika panel profil dirender ulang. */
  function updateExperienceField(el) {
    const index = Number(el.dataset.expIndex);
    const item = state.user.profile.experiences[index];
    if (!item) return;
    item[el.dataset.expField] = el.value;
    persistUser();
  }

  /* ============================================================
     INIT
     ============================================================ */
  async function restoreSession() {
    const { data } = await supabase.auth.getSession();
    state.session = data.session || null;
    if (!state.session) {
      state.user = null;
      state.applications = [];
      return null;
    }

    const uid = state.session.user.id;
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", uid)
      .maybeSingle();
    if (error || !profile) {
      toast("Profil belum tersedia: " + (error ? error.message : "data kosong"), "warn");
      return null;
    }

    state.user = mapProfile(profile, state.session.user);
    state.employerLoadedFor = null;
    state.adminLoadedFor = null;
    await loadJobs();
    await loadMyApplications();
    return state.user;
  }

  async function init() {
    if (!dataOk()) {
      document.body.innerHTML =
        '<div style="padding:40px;font-family:sans-serif">' +
        "<h2>Data dasar gagal dimuat</h2><p>Pastikan <code>assets/data.js</code> ada dan tidak rusak.</p></div>";
      return;
    }

    $("#reg-city").innerHTML = DATA.cities.map(c =>
      '<option value="' + c.id + '">' + c.name + "</option>").join("");
    if ($("#stat-cities")) $("#stat-cities").textContent = DATA.cities.length;
    if ($("#stat-types")) $("#stat-types").textContent = DATA.types.length;

    bindEvents();
    setAuthTab("login");
    supabase.auth.onAuthStateChange((_event, session) => { state.session = session || null; });

    await restoreSession();
    await loadJobs();
    if (state.user) { enterApp(); return; }
    showView("landing");
  }

  function dataOk() {
    return DATA && Array.isArray(DATA.jobs) &&
      Array.isArray(DATA.cities) && Array.isArray(DATA.categories);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
