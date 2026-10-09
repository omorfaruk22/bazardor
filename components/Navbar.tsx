"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";
import { fetchCategories, Category } from "@/lib/api";
import { toBn } from "@/lib/bn";
import PriceTicker from "./PriceTicker";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [cats, setCats] = useState<Category[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchCategories().then(setCats);
  }, []);

  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const handleLogout = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* Top row */}
      <div className="max-w-6xl mx-auto px-3 py-2 flex items-center justify-between gap-3">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xl sm:text-2xl font-bold text-brand-700">
            🛒 বাজার দর
          </span>
          <span className="text-[11px] sm:text-xs text-gray-500">{today}</span>
        </Link>

        {/* Auth buttons */}
        <div className="hidden sm:flex items-center gap-2">
          {session?.user ? (
            <>
              <Link
                href="/profile"
                className="btn-sm px-3 py-1.5 rounded-md text-sm bg-brand-50 text-brand-700 font-medium"
              >
                👤 {session.user.name || "প্রোফাইল"}
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md text-sm bg-red-50 text-red-600 font-medium"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="px-3 py-1.5 rounded-md text-sm border border-brand-600 text-brand-700 font-medium"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1.5 rounded-md text-sm bg-brand-600 text-white font-medium"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>

        <button
          className="sm:hidden text-2xl px-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="menu"
        >
          ☰
        </button>
      </div>

      {/* Category row */}
      <nav className="hidden md:block border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-3 py-2 flex items-center gap-2 overflow-x-auto">
          <Link
            href="/"
            className={`px-3 py-1 rounded-full text-sm ${
              pathname === "/"
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            হোম
          </Link>
          {cats.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  active
                    ? "bg-brand-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c.icon ? `${c.icon} ` : ""}{c.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 px-3 py-3 space-y-2 bg-white">
          <div className="flex flex-wrap gap-2">
            <Link href="/" className="px-3 py-1 rounded-full text-sm bg-gray-100">
              হোম
            </Link>
            {cats.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="px-3 py-1 rounded-full text-sm bg-gray-100"
              >
                {c.icon ? `${c.icon} ` : ""}{c.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-2 pt-2">
            {session?.user ? (
              <>
                <Link href="/profile" className="flex-1 text-center px-3 py-2 rounded-md bg-brand-50 text-brand-700">
                  👤 প্রোফাইল
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-3 py-2 rounded-md bg-red-50 text-red-600"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="flex-1 text-center px-3 py-2 rounded-md border border-brand-600 text-brand-700">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="flex-1 text-center px-3 py-2 rounded-md bg-brand-600 text-white">
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Price ticker */}
      <PriceTicker />
    </header>
  );
}