"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/client/clientAuthService";

export default function LogoutButton({ style }) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await signOut();
      router.replace("/"); // Redirect after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        marginTop: 12,
        background: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "6px 12px",
        cursor: "pointer",
        ...style, // allow custom styles from parent
      }}
    >
      Log Out
    </button>
  );
}
