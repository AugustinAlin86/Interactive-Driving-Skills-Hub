// src/hooks/useUserStatus.js
// Tracks the signed-in user and whether they are admin.
// - Admin flag: from Firebase Auth custom claims (server-set, safest)
// - User profile: combines Auth basics + Firestore /users/{uid}

"use client";

import { useEffect, useState } from "react";
import { onAuthChange } from "@/lib/client/clientAuthService";
   // was "@/lib/client/clientAuthService"
import { db } from "@/lib/client/firebaseClient";               // was "@/firebase/client"
import { doc, getDoc } from "firebase/firestore";


// Returns: { user, isAdmin, status, loading }
export function useUserStatus() {
  const [user, setUser] = useState(null);            // null or merged { uid, email, displayName, ...profileFields }
  const [isAdmin, setIsAdmin] = useState(false);     // from Auth custom claims
  const [status, setStatus] = useState("checking");  // "checking" | "signedOut" | "signedIn"

 useEffect(() => {
    const unsubscribe = onAuthChange(async (currentUser) => {
      setStatus("checking");
  
      // Signed out
      if (!currentUser) {
        setUser(null);
        setIsAdmin(false);
        setStatus("signedOut");
        return;
      }

      // 1) Admin from Auth custom claims (no DB)
      let adminFlag = false;
      try {
        const token = await currentUser.getIdTokenResult(true);
        adminFlag = !!token?.claims?.admin;
      } catch {
        adminFlag = false;
      }
      setIsAdmin(adminFlag);

      // 2) Build base user from Auth
      const baseUser = {
        uid: currentUser.uid,
        email: currentUser.email || "",
        displayName: currentUser.displayName || "",
      };

      // 3) Merge Firestore profile (users/{uid}) for extra fields
      try {
        const snap = await getDoc(doc(db, "users", currentUser.uid));
        const profile = snap.exists() ? snap.data() : {};
        setUser({ ...baseUser, ...profile });
      } catch {
        // If profile read fails, still return base Auth info
        setUser(baseUser);
      } finally {
        setStatus("signedIn");
      }
    });

    return unsubscribe;
  }, []);

  return { user, isAdmin, status, loading: status === "checking" };
}
