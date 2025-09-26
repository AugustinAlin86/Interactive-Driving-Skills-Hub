"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStatus } from "@/hooks/useUserStatus";

export default function DashboardRedirectButton() {
  const router = useRouter();
  const { user, isAdmin, status, loading } = useUserStatus();

  useEffect(() => {
    if (loading) return; 

    if (!user) {
      router.replace("/"); 
      return;
    }

    if (isAdmin) {
      router.replace("/adminDashboard"); 
    } else {
      router.replace("/"); 
    }
  }, [user, isAdmin, loading, router]);

  return null; 
}
