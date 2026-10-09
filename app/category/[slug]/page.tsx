"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { GridSkeleton } from "@/components/Skeletons";
import { fetchProducts, fetchCategory, Product, Category } from "@/lib/api";

type SortKey = "default" | "low-high" | "high-low";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortKey>("default");

  useEffect(() => {
    Promise.all([fetchProducts(slug), fetchCategory(slug)])
      .then(([p, c]) => {
        setProducts(p);
        setCategory(c);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const sorted = useMemo(() => {
    const arr = [...products];
    if (sort === "low-high") arr.sort((a, b) => a.price - b.price);
    if (sort === "high-low") arr.sort((a, b) => b.price - a.price);
    return arr;
  }, [products, sort]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="h-8 w-40 bg-gray-200 animate-pulse rounded mb-6" />
        <GridSkeleton count={8} />
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl">😕</div>
        <h1 className="text-2xl font-bold mt-4">ক্যাটাগরি পাওয়া যায়নি</h1>
        <p className="text-gray-500 mt-2">
          এই ক্যাটাগরিতে এই মুহূর্তে কোনো পণ্য নেই।
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-brand-600 text-white font-medium"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h1 className="text-2xl font-bold">
          {category?.icon ? `${category.icon} ` : ""}
          {category?.name || slug}
        </h1>

        <label className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">সাজান:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-gray-200 rounded-md px-3 py-1.5 bg-white"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}