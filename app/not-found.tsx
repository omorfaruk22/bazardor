import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-7xl">🧭</div>
      <h1 className="text-3xl font-bold mt-4">৪০৪ — পেজ পাওয়া যায়নি</h1>
      <p className="text-gray-500 mt-2">
        আপনি যে পেজটি খুঁজছেন সেটি এখানে নেই।
      </p>
      <Link
        href="/"
        className="inline-block mt-8 px-5 py-2.5 rounded-lg bg-brand-600 text-white font-medium"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}