// src/components/authentication/CreateUserIfNotExists.js
"use client";

import { useEffect } from "react";
import { auth } from "@/lib/client/firebaseClient"; // ✅ client SDK

export default function CreateUserIfNotExists({ overrides = {} }) {
  useEffect(() => {
    let cancelled = false;

    async function ensureProfile() {
      console.groupCollapsed("%c[CreateUserIfNotExists] start", "color:#0aa");
      try {
        console.time("[CreateUserIfNotExists] total");
        console.log("Overrides provided:", overrides);

        const user = auth.currentUser;
        if (!user) {
          console.warn(
            "[CreateUserIfNotExists] No auth.currentUser yet. " +
              "This often happens on first render; component will exit without calling the API."
          );
          console.groupEnd();
          return;
        }

        console.log("User detected:", { uid: user.uid, email: user.email });

        let token;
        try {
          token = await user.getIdToken();
          console.log(
            "ID token acquired:",
            token ? token.slice(0, 12) + "…" : "(none)"
          );
        } catch (e) {
          console.error("[CreateUserIfNotExists] Failed to get ID token:", e);
          console.groupEnd();
          return;
        }

        const payload = overrides || {};
        console.log("➡️  POST /api/createIfNotExist with payload:", payload);

        const res = await fetch("/api/createIfNotExist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        console.log("⬅️  Response status:", res.status, res.statusText);

        const raw = await res.text();
        let data;
        try {
          data = JSON.parse(raw);
        } catch {
          data = raw;
        }
        console.log("Response body:", data);

        if (!res.ok) {
          console.error(
            "[CreateUserIfNotExists] Server returned error status:",
            res.status,
            data
          );
        } else {
          console.log("[CreateUserIfNotExists] Success ✅", data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("[CreateUserIfNotExists] Uncaught error:", err);
        }
      } finally {
        console.timeEnd("[CreateUserIfNotExists] total");
        console.groupEnd();
      }
    }

    ensureProfile();
    return () => {
      cancelled = true;
    };
  }, [overrides]);

  return null; // no UI
}
