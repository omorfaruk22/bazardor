"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("অনুগ্রহ করে সাইন ইন করুন");
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-500">
        লোড হচ্ছে...
      </div>
    );
  }
  return <>{children}</>;
}