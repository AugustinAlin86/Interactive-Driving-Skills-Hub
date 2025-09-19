// src/components/authentication/GoogleLoginButton.js
"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/client/firebaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleGoogleLogin() {
    setError("");
    setSuccess("");
    try {
      setIsLoading(true);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // ✅ Success message
      setSuccess("✅ Google login successful! Redirecting to home…");

      // ⏳ Redirect after 2s
      setTimeout(() => {
        router.push("/");
      }, 2000);

      console.log("✅ Google login successful:", user.email);
    } catch (err) {
      console.error("Google login failed:", err);

      // 🔑 Friendly error messages
      if (
        err.code === "auth/account-exists-with-different-credential" ||
        err.code === "auth/user-not-found"
      ) {
        setError("⚠️ This Google account is not registered. Please sign up first.");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("⚠️ Google sign-in is not enabled in Firebase Console.");
      } else {
        setError("Google login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#db4437",
          color: "white",
          fontWeight: "bold",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Connecting…" : "Login with Google"}
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
    </div>
  );
}
