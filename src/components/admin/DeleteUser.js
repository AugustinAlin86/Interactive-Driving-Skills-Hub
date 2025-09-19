"use client";

import { getAuth } from "firebase/auth";

export default function DeleteUser({ uid, onDeleted }) {
  const handleDelete = async () => {
    if (!confirm("⚠️ Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("You must be logged in as admin.");
        return;
      }

      // 🔑 Get admin ID token
      const token = await user.getIdToken();

      const res = await fetch("/api/admin/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete user");
      }

      alert("✅ User deleted successfully");

      // Callback to refresh list after deletion
      if (onDeleted) onDeleted(uid);
    } catch (err) {
      console.error("❌ Error deleting user:", err);
      alert("Failed to delete user: " + err.message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
    >
      🗑 Delete
    </button>
  );
}
