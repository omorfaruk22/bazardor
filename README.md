# বাজার দর / BazarDor

প্রয়োজনীয় পণ্যের দাম এক নজরে দেখার জন্য একটি রেসপন্সিভ Next.js অ্যাপ্লিকেশন।

## 🛠 Technologies Used
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- BetterAuth (Email/Password + Google + GitHub)
- MongoDB Atlas
- react-hot-toast

## ✨ Key Features
1. **লাইভ প্রাইস টিকার (মার্কি)** — নেভবারের নিচে ইনফিনিট স্ক্রলিং প্রাইস স্ট্রিপ।
2. **ডাইনামিক হোম সেকশন** — "আজ দাম বেড়েছে" + "আজ দাম কমেছে" + "সব পণ্য"।
3. **প্রোটেক্টেড প্রোডাক্ট ডিটেইল পেজ** — `/product/[slug]` শুধু লগইন করা ইউজারের জন্য।
4. **ক্যাটাগরি ফিল্টার + সর্টিং** — দাম কম→বেশি / বেশি→কম, বাংলা সংখ্যা হ্যান্ডেল করে।
5. **BetterAuth দিয়ে সাইন ইন / সাইন আপ + প্রোফাইল আপডেট** — Google/GitHub সোশ্যাল লগইন সহ।
6. **Skeleton loader + Toast notification + 404 পেজ** — পুরো অ্যাপ রেসপন্সিভ।

## 🚀 Setup

```bash
npm install
cp .env.local.example .env.local   # env ভ্যালু দিন
npm run dev