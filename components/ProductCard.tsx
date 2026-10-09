"use client";

import Link from "next/link";
import { Product } from "@/lib/api";
import { formatChange, formatPrice, changeColor } from "@/lib/bn";

export default function ProductCard({ product }: { product: Product }) {
  const change = product.change ?? 0;
  const slug = product.slug || String(product.id);
  return (
    <Link
      href={`/product/${slug}`}
      className="card-hover block bg-white rounded-xl border border-gray-100 p-4"
    >
      <div className="flex items-start justify-between">
        <div className="text-3xl">{product.emoji || "🛍️"}</div>
        <span className={`text-xs font-semibold ${changeColor(change)}`}>
          {formatChange(change)}
        </span>
      </div>
      <h3 className="mt-3 font-semibold text-gray-900">{product.name}</h3>
      <p className="text-xs text-gray-500 mt-0.5">
        🖇️ {product.unitLabel || product.unit || "প্রতি একক"}
      </p>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-xs text-gray-500">আজকের দাম</span>
        <span className="font-bold text-brand-700">
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}