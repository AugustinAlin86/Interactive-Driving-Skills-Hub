"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStatus } from "@/hooks/useUserStatus";

export default function DashboardRedirectButton() {
  const router = useRouter();
  const { user, isAdmin, status, loading } = useUserStatus();

  useEffect(() => {
    if (loading) return; // wait for hook to finish checking

    if (!user) {
      router.replace("/"); // 🚪 guest → back to login/home
      return;
    }

    if (isAdmin) {
      router.replace("/adminDashboard"); // 👑 admin → admin dashboard
    } else {
      router.replace("/"); // 👤 normal user → user dashboard
    }
  }, [user, isAdmin, loading, router]);

  return null; // invisible helper
}
