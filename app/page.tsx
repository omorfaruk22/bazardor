"use client";

import { useEffect, useMemo, useState } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { GridSkeleton } from "@/components/Skeletons";
import { fetchProducts, Product } from "@/lib/api";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((p) => setProducts(p))
      .finally(() => setLoading(false));
  }, []);

  const risers = useMemo(
    () =>
      [...products]
        .filter((p) => (p.change ?? 0) > 0)
        .sort((a, b) => (b.change ?? 0) - (a.change ?? 0))
        .slice(0, 6),
    [products]
  );

  const fallers = useMemo(
    () =>
      [...products]
        .filter((p) => (p.change ?? 0) < 0)
        .sort((a, b) => (a.change ?? 0) - (b.change ?? 0))
        .slice(0, 6),
    [products]
  );

  return (
    <>
      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          আজ দাম বেড়েছে <span className="text-green-600">▲</span>
        </h2>
        {loading ? (
          <GridSkeleton count={6} />
        ) : risers.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {risers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">কোনো তথ্য নেই।</p>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          আজ দাম কমেছে <span className="text-red-600">▼</span>
        </h2>
        {loading ? (
          <GridSkeleton count={6} />
        ) : fallers.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {fallers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">কোনো তথ্য নেই।</p>
        )}
      </section>

      <section id="সব-পণ্য" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-40">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">সব পণ্য</h2>
        <p className="text-gray-500 text-sm mb-4">
          বাজারের সব পণ্যের আজকের দাম
        </p>
        {loading ? (
          <GridSkeleton count={12} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}