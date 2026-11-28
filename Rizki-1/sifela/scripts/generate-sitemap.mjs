import { readFile, writeFile, mkdir } from "node:fs/promises";

const SITE_URL = (process.env.SITE_URL || "https://sifela-id.vercel.app").replace(/\/$/, "");
const source = await readFile(new URL("../assets/supabase.js", import.meta.url), "utf8");
const url = process.env.VITE_SUPABASE_URL || source.match(/DEFAULT_SUPABASE_URL\s*=\s*'([^']+)'/)?.[1];
const key = process.env.VITE_SUPABASE_ANON_KEY || source.match(/DEFAULT_SUPABASE_ANON_KEY\s*=\s*'([^']+)'/)?.[1];

const esc = (value) => String(value || "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const stamp = (value) => {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
};

const entries = [
  { loc: SITE_URL + "/", lastmod: stamp(), priority: "1.0" }
];

if (url && key) {
  try {
    const now = new Date().toISOString();
    const query = encodeURIComponent(`(status.eq.approved,expires_at.is.null,expires_at.gt.${now})`);
    const response = await fetch(
      `${url}/rest/v1/jobs?select=id,created_at,updated_at&or=${query}&order=created_at.desc`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    );
    if (response.ok) {
      const jobs = await response.json();
      jobs.forEach((job) => {
        entries.push({
          loc: `${SITE_URL}/#lowongan/${job.id}`,
          lastmod: stamp(job.updated_at || job.created_at),
          priority: "0.7"
        });
      });
    } else {
      console.warn(`Sitemap: gagal mengambil lowongan (${response.status}); memakai entri statis.`);
    }
  } catch (error) {
    console.warn("Sitemap: lowongan tidak dimuat, memakai entri statis.", error.message);
  }
}

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  entries.map((entry) =>
    "  <url>\n" +
    `    <loc>${esc(entry.loc)}</loc>\n` +
    `    <lastmod>${entry.lastmod}</lastmod>\n` +
    `    <priority>${entry.priority}</priority>\n` +
    "  </url>"
  ).join("\n") +
  "\n</urlset>\n";

await mkdir(new URL("../dist/", import.meta.url), { recursive: true });
await writeFile(new URL("../dist/sitemap.xml", import.meta.url), xml, "utf8");
console.log(`Sitemap ditulis: ${entries.length} URL`);
