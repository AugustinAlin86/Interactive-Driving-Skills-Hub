"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/client/clientAuthService";
import { useUserStatus } from "@/hooks/useUserStatus";
import { auth } from "@/lib/client/firebaseClient";
import LogoutButton from "./LogoutButton";

export default function StatusBadge() {
  const router = useRouter();
  const { user, isAdmin, loading } = useUserStatus();
  const [verifiedRole, setVerifiedRole] = useState(null);

  
  useEffect(() => {
    const verifyWithServer = async () => {
      if (!user) {
        setVerifiedRole(null);
        return;
      }

      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) return;

        const res = await fetch("/api/admin/checklogin", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (data.success) {
          setVerifiedRole(data.role);
        } else {
          setVerifiedRole(null);
        }
      } catch (err) {
        console.error("❌ Error verifying role with server:", err);
        setVerifiedRole(null);
      }
    };

    verifyWithServer();
  }, [user]); 

  const handleDashboardRedirect = () => {
    if (verifiedRole === "admin") {
      router.push("/adminDashboard");
    } else if (verifiedRole === "user") {
      router.push("/userDashboard");
    } else {
      router.push("/");
    }
  };

  if (loading) return null; 

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        background: "#ecf0f1",
        padding: "10px 15px",
        borderRadius: "10px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
        zIndex: 9999,
      }}
    >
      {!user ? (
        <strong style={{ color: "black" }}>❌ Not logged in</strong>
      ) : (
        <>
          ✅ Logged in as{" "}
          <strong style={{ color: "black" }}>
            {user.email} {verifiedRole === "admin" && " (Admin)"}
          </strong>
        </>
      )}

      <button
        onClick={handleDashboardRedirect}
        style={{
          padding: "3px 10px",
          borderRadius: "6px",
          border: "none",
          background: "#3498db",
          color: "#fff",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Go to Dashboard
      </button>

      {user && <LogoutButton style={{ marginTop: 0 }} />} 
    </div>
  );
}