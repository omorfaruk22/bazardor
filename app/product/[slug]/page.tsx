"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Protected from "@/components/Protected";
import { DetailSkeleton } from "@/components/Skeletons";
import { fetchProduct, Product } from "@/lib/api";
import { formatPrice, formatChange, changeColor, toBn } from "@/lib/bn";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchProduct(slug)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <DetailSkeleton />;

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl">🥲</div>
        <h1 className="text-2xl font-bold mt-4">প্রোডাক্ট পাওয়া যায়নি</h1>
        <Link
          href="/"
          className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-brand-600 text-white font-medium"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const change = product.change ?? 0;

  return (
    <Protected>
      <article className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="text-5xl">{product.emoji || "🛍️"}</div>
              <div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p className="text-gray-500 text-sm mt-1">
                  আজকের বাজার সারসংক্ষেপ — {product.markets.length}টি বাজার থেকে সংগৃহীত
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.categoryName && (
                    <span className="text-xs px-2 py-1 rounded-full bg-brand-50 text-brand-700">
                      {product.categoryIcon} {product.categoryName}
                    </span>
                  )}
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {product.unitLabel}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">আজকের দাম</p>
              <p className="text-2xl font-bold text-brand-700">
                {toBn(product.price)} টাকা
              </p>
              <p className={"text-sm font-semibold " + changeColor(change)}>
                {formatChange(change)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <StatCard label="সর্বনিম্ন দাম" value={formatPrice(product.min)} />
          <StatCard label="সর্বোচ্চ দাম" value={formatPrice(product.max)} />
          <StatCard label="গড় দাম" value={formatPrice(product.avg)} />
        </div>

        <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-lg mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2">বাজার</th>
                  <th className="py-2">বিভাগ</th>
                  <th className="py-2 text-right">সর্বনিম্ন</th>
                  <th className="py-2 text-right">সর্বোচ্চ</th>
                  <th className="py-2 text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.length ? (
                  product.markets.map((m, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-2">{m.market}</td>
                      <td className="py-2 text-gray-500">{m.division}</td>
                      <td className="py-2 text-right">{toBn(m.min)}</td>
                      <td className="py-2 text-right">{toBn(m.max)}</td>
                      <td className="py-2 text-right font-medium">
                        {toBn(m.avg)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-3 text-gray-500" colSpan={5}>
                      বাজারভিত্তিক তথ্য এই মুহূর্তে নেই।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </Protected>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}