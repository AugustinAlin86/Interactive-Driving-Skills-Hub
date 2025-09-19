"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { sendResetEmail, resetErrorMessage } from "@/lib/client/clientAuthService";

export default function ForgotPasswordForm() {
  const [emailInput, setEmailInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  async function handleReset(e) {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    if (!emailInput) return setErrorMessage("Please enter your email.");

    try {
      setIsSending(true);
      await sendResetEmail(emailInput.trim().toLowerCase());
      setSuccessMessage("✅ Password reset email sent! Redirecting to home…");

      // ⏳ wait 2 sec then go home
      setTimeout(() => {
        router.push("/");
      }, 2000);

    } catch (err) {
      setErrorMessage(resetErrorMessage(err));
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form onSubmit={handleReset} noValidate>
      <h2>Forgot Password</h2>

      <label>
        Email
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={emailInput}
          onChange={(e) => { 
            setEmailInput(e.target.value); 
            setErrorMessage(""); 
            setSuccessMessage(""); 
          }}
          required
        />
      </label>

      <button type="submit" disabled={isSending}>
        {isSending ? "Sending…" : "Send Reset Link"}
      </button>

      {successMessage && (
        <p aria-live="polite" style={{ color: "green", marginTop: 8 }}>
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p role="alert" aria-live="assertive" style={{ color: "red", marginTop: 8 }}>
          {errorMessage}
        </p>
      )}
    </form>
  );
}
