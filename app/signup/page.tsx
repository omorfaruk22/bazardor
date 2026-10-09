"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signUp.email({ name, email, password });
      if (error) throw new Error(error.message || "রেজিস্ট্রেশন ব্যর্থ");
      toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে");
      router.push("/signin");
    } catch (err: any) {
      toast.error(err.message || "রেজিস্ট্রেশন ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  const social = async (provider: "google" | "github") => {
    try {
      await signIn.social({ provider, callbackURL: "/" });
    } catch {
      toast.error("সোশ্যাল সাইন ইন ব্যর্থ");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-center">রেজিস্ট্রেশন</h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          নতুন অ্যাকাউন্ট তৈরি করুন
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-700">নাম</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2"
              placeholder="আপনার নাম"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">ইমেইল</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2"
              placeholder="কমপক্ষে ৬ অক্ষর"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md bg-brand-600 hover:bg-brand-700 text-white font-semibold disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "রেজিস্টার"}
          </button>
        </form>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => social("google")}
            className="border border-gray-200 rounded-md py-2 text-sm hover:bg-gray-50"
          >
            Google
          </button>
          <button
            onClick={() => social("github")}
            className="border border-gray-200 rounded-md py-2 text-sm hover:bg-gray-50"
          >
            GitHub
          </button>
        </div>

        <p className="text-sm text-center mt-6 text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-brand-700 font-medium">
            সাইন ইন
          </Link>
        </p>
      </div>
    </div>
  );
}