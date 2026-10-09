import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <p className="text-brand-600 font-semibold text-sm mb-2">
          আজকের বাজার · লাইভ দাম
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          প্রয়োজনীয় পণ্যের দাম <br />
          <span className="text-brand-700">এক নজরে।</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-md">
          প্রতিদিনের বাজার দর, কোনটা বেড়েছে, কোনটা কমেছে — সব তথ্য এক
          জায়গায়। সঠিক সিদ্ধান্ত নিন বাজারে যাওয়ার আগেই।
        </p>
        <a
          href="#সব-পণ্য"
          className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow"
        >
          সব পণ্য দেখুন ↓
        </a>
      </div>

      <div className="relative">
        <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center text-[120px] sm:text-[160px] select-none">
          🧺
        </div>
      </div>
    </section>
  );
}