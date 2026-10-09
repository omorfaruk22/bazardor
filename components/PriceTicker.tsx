"use client";

import { useEffect, useState } from "react";
import { fetchProducts, Product } from "@/lib/api";
import { formatChange, changeColor, toBn } from "@/lib/bn";

export default function PriceTicker() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then((p) => setItems(p.slice(0, 20))).catch(() => {});
  }, []);

  if (!items.length) return null;
  const loop = [...items, ...items];

  return (
    <div className="bg-brand-700 text-white overflow-hidden">
      <div className="marquee-track py-1.5">
        {loop.map((p, i) => {
          const change = p.change ?? 0;
          const sign = change > 0 ? "▲" : change < 0 ? "▼" : "—";
          const color = change > 0 ? "text-green-200" : change < 0 ? "text-red-200" : "text-white/70";
          return (
            <span key={i} className="mx-4 text-xs sm:text-sm whitespace-nowrap">
              {p.emoji || "🛍️"} {p.name} —{" "}
              <b>{toBn(p.price)} টাকা/{p.unitLabel || p.unit || "একক"}</b>{" "}
              <span className={color}>
                {sign} {toBn(Math.abs(change).toFixed(1))}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}