const BASE = "https://api.api-store.workers.dev/api/bazardor";

export type MarketRow = {
  market: string;
  division?: string;
  min: number;
  max: number;
  avg: number;
};

export type Product = {
  id: number | string;
  slug: string;
  name: string;
  emoji: string;
  unit: string;
  unitLabel: string;
  category: string;
  categoryName: string;
  categoryIcon: string;
  price: number;
  change: number;
  min: number;
  max: number;
  avg: number;
  markets: MarketRow[];
};

export type Category = {
  slug: string;
  name: string;
  icon?: string;
};

const UNIT_MAP: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pis: "প্রতি পিস",
  gram: "প্রতি গ্রাম",
  gm: "প্রতি গ্রাম",
};

function unitToBn(unit: string): string {
  if (!unit) return "প্রতি একক";
  const key = unit.toLowerCase().trim();
  return UNIT_MAP[key] || "প্রতি " + unit;
}

function num(v: any, fallback = 0): number {
  if (v === null || v === undefined) return fallback;
  const n = Number(v);
  return isFinite(n) ? n : fallback;
}

function normalizeProduct(raw: any): Product {
  const markets: MarketRow[] = Array.isArray(raw.markets)
    ? raw.markets.map((m: any) => {
        const mn = num(m.min, 0);
        const mx = num(m.max, 0);
        return {
          market: m.market || m.name || "বাজার",
          division: m.division || "",
          min: mn,
          max: mx,
          avg: Math.round((mn + mx) / 2),
        };
      })
    : [];

  const min = markets.length ? Math.min(...markets.map((m) => m.min)) : num(raw.today);
  const max = markets.length ? Math.max(...markets.map((m) => m.max)) : num(raw.today);
  const avg = markets.length
    ? Math.round(markets.reduce((s, m) => s + m.avg, 0) / markets.length)
    : num(raw.today);

  const pct =
    raw?.change && typeof raw.change === "object"
      ? num(raw.change.pct, 0)
      : num(raw.change, 0);

  return {
    id: raw.id ?? raw.slug,
    slug: String(raw.slug ?? raw.id),
    name: raw.nameBn ?? raw.name ?? "অজানা পণ্য",
    emoji: raw.image ?? raw.emoji ?? "🛍️",
    unit: raw.unit ?? "",
    unitLabel: unitToBn(raw.unit ?? ""),
    category: raw.category ?? "",
    categoryName: raw.categoryNameBn ?? raw.category ?? "",
    categoryIcon: raw.categoryIcon ?? "",
    price: num(raw.today, 0),
    change: pct,
    min,
    max,
    avg,
    markets,
  };
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(BASE + path, { cache: "no-store" });
  if (!res.ok) throw new Error("API error " + res.status);
  return res.json() as Promise<T>;
}

export async function fetchProducts(category?: string): Promise<Product[]> {
  const q = category ? "?category=" + encodeURIComponent(category) : "";
  try {
    const data = await get<any>("/products" + q);
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.products)
      ? data.products
      : Array.isArray(data?.data)
      ? data.data
      : [];
    return list.map(normalizeProduct);
  } catch {
    return [];
  }
}

export async function fetchProduct(
  idOrSlug: string | number
): Promise<Product | null> {
  try {
    const data = await get<any>("/products/" + idOrSlug);
    const raw = data?.product ?? data?.data ?? data;
    if (raw && raw.slug) return normalizeProduct(raw);
  } catch {
    void 0;
  }

  try {
    const all = await fetchProducts();
    const key = String(idOrSlug).toLowerCase();
    const found = all.find(
      (p) => p.slug.toLowerCase() === key || String(p.id) === key
    );
    return found ?? null;
  } catch {
    return null;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const data = await get<any>("/categories");
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.categories)
      ? data.categories
      : Array.isArray(data?.data)
      ? data.data
      : [];
    return list.map((c: any) => ({
      slug: String(c.slug ?? c.id ?? c.name ?? ""),
      name: String(c.nameBn ?? c.name ?? c.title ?? c.slug ?? ""),
      icon: c.icon ?? c.emoji ?? "",
    }));
  } catch {
    return [];
  }
}

export async function fetchCategory(slug: string): Promise<Category | null> {
  try {
    const data = await get<any>("/categories/" + slug);
    const raw = data?.category ?? data?.data ?? data;
    if (!raw) return null;
    return {
      slug: String(raw.slug ?? raw.id ?? slug),
      name: String(raw.nameBn ?? raw.name ?? raw.title ?? slug),
      icon: raw.icon ?? raw.emoji ?? "",
    };
  } catch {
    return null;
  }
}

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/\s+/g, "-");