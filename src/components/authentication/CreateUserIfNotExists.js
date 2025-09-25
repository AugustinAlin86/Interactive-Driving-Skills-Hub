"use client";

import { useEffect } from "react";
import { auth } from "@/lib/client/firebaseClient";

export default function CreateUserIfNotExists({ overrides = {} }) {
  useEffect(() => {
    async function ensureProfile() {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();

      await fetch("/api/createIfNotExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(overrides),
      });
    }

    ensureProfile();
  }, [overrides]);

  return null;
}
