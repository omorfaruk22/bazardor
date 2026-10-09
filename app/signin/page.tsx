"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn.email({ email, password });
      if (error) throw new Error(error.message || "সাইন ইন ব্যর্থ হয়েছে");
      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "সাইন ইন ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const social = async (provider: "google" | "github") => {
    try {
      await signIn.social({ provider, callbackURL: "/" });
    } catch {
      toast.error("সোশ্যাল সাইন ইন ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-center">সাইন ইন</h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          আপনার অ্যাকাউন্টে প্রবেশ করুন
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-700">ইমেইল</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md bg-brand-600 hover:bg-brand-700 text-white font-semibold disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
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
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-brand-700 font-medium">
            রেজিস্টার করুন
          </Link>
        </p>
      </div>
    </div>
  );
}