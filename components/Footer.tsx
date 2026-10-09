export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 grid sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-semibold text-brand-700">বাজার দর</p>
          <p className="text-gray-600 mt-1">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>
        <div className="sm:text-right text-gray-500 italic">
          "সকল দাম সম্বাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।"
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 pb-4">
        © {new Date().getFullYear()} বাজার দর · All rights reserved
      </div>
    </footer>
  );
}