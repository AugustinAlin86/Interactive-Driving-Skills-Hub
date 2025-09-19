// src/lib/client/buildUserData.js
import { serverTimestamp } from "firebase/firestore";

/**
 * Build a consistent Firestore user profile.
 * Accepts optional overrides from signup form.
 */
export function buildUserData(user, overrides = {}) {
  return {
    uid: user?.uid || "",
    email: user?.email || "",
    firstName: "",
    lastName: "",
    dob: "",
    licenceNo: "",
     telephone: "",
  
    createdAt: serverTimestamp(),
    ...overrides, // apply signup form values
  };
}