

"use client";

import { useEffect, useState } from "react";
import { onAuthChange } from "@/lib/client/clientAuthService";
  
import { db } from "@/lib/client/firebaseClient";              
import { doc, getDoc } from "firebase/firestore";



export function useUserStatus() {
  const [user, setUser] = useState(null);            
  const [isAdmin, setIsAdmin] = useState(false);     
  const [status, setStatus] = useState("checking");  

 useEffect(() => {
    const unsubscribe = onAuthChange(async (currentUser) => {
      setStatus("checking");
  
      
      if (!currentUser) {
        setUser(null);
        setIsAdmin(false);
        setStatus("signedOut");
        return;
      }

     
      let adminFlag = false;
      try {
        const token = await currentUser.getIdTokenResult(true);
        adminFlag = !!token?.claims?.admin;
      } catch {
        adminFlag = false;
      }
      setIsAdmin(adminFlag);

      
      const baseUser = {
        uid: currentUser.uid,
        email: currentUser.email || "",
        displayName: currentUser.displayName || "",
      };

      
      try {
        const snap = await getDoc(doc(db, "users", currentUser.uid));
        const profile = snap.exists() ? snap.data() : {};
        setUser({ ...baseUser, ...profile });
      } catch {
       
        setUser(baseUser);
      } finally {
        setStatus("signedIn");
      }
    });

    return unsubscribe;
  }, []);

  return { user, isAdmin, status, loading: status === "checking" };
}
