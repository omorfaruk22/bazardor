"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Protected from "@/components/Protected";
import { useSession, updateUser } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, refetch } = useSession();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res: any = await updateUser({ name });
      if (res?.error) throw new Error(res.error.message || "আপডেট ব্যর্থ");
      await refetch?.();
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.push("/profile");
    } catch (err: any) {
      toast.error(err.message || "আপডেট ব্যর্থ");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Protected>
      <div className="max-w-md mx-auto px-4 py-12">
        <form
          onSubmit={onSubmit}
          className="bg-white rounded-2xl border border-gray-100 p-8 space-y-4"
        >
          <h1 className="text-xl font-bold text-center">তথ্য আপডেট</h1>
          <div>
            <label className="text-sm text-gray-700">নাম</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 rounded-md bg-brand-600 hover:bg-brand-700 text-white font-semibold disabled:opacity-60"
          >
            {saving ? "সংরক্ষণ..." : "Update Information"}
          </button>
        </form>
      </div>
    </Protected>
  );
}