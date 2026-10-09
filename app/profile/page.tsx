"use client";

import Link from "next/link";
import Protected from "@/components/Protected";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <Protected>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-brand-50 mx-auto flex items-center justify-center text-3xl">
            👤
          </div>
          <h1 className="text-xl font-bold mt-4">{session?.user?.name}</h1>
          <p className="text-gray-500 text-sm">{session?.user?.email}</p>

          <Link
            href="/profile/update"
            className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-brand-600 text-white font-medium"
          >
            Update Information
          </Link>
        </div>
      </div>
    </Protected>
  );
}