
"use client";

import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "@/lib/client/firebaseClient";


function resolvePersistence(mode = "local") {
  switch (mode) {
    case "local":
      return browserLocalPersistence;   
    case "memory":
      return inMemoryPersistence;       
    case "session":
      return browserSessionPersistence;
    default:
      return browserLocalPersistence;
  }
}

/* -------------------------------------------------------------------------- */
/* 🔑 ERROR HELPERS                                                           */
/* -------------------------------------------------------------------------- */

export function resetErrorMessage(error) {
  switch (error?.code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-not-found":
      return "No account found with that email.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    default:
      return `Could not send reset email. (${error?.code || "unknown"})`;
  }
}

export function authErrorMessage(error) {
  switch (error?.code) {
    case "auth/invalid-email":
      return "Please enter a valid email.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email or password is incorrect.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    case "auth/operation-not-allowed":
      return "Email/password sign-in is disabled.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/unsupported-persistence-type":
      return "Your browser blocked session storage.";
    default:
      return `Login failed. (${error?.code || "unknown"})`;
  }
}

/* -------------------------------------------------------------------------- */
/* 🔑 AUTH FUNCTIONS                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Email/password login with persistence.
 */
export async function signInEmail(email, password, { persistence = "local" } = {}) {
  try {
    await setPersistence(auth, resolvePersistence(persistence));
  } catch (e) {
    // Safari private mode fallback → in-memory only
    if (e?.code === "auth/unsupported-persistence-type") {
      await setPersistence(auth, inMemoryPersistence);
    } else {
      throw e;
    }
  }
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

/**
 * Log out.
 */
export async function signOut() {
  await firebaseSignOut(auth);
}

/**
 * Listen for auth changes (login/logout).
 * Returns unsubscribe() function.
 */
export function onAuthChange(cb) {
  return onAuthStateChanged(auth, cb);
}

/**
 * Get the current user's ID token.
 * Fix: waits for Firebase to rehydrate the user after refresh.
 */
export async function getIdToken(forceRefresh = false) {
  if (auth.currentUser) {
    return auth.currentUser.getIdToken(forceRefresh);
  }

  // 🔑 Wait until onAuthStateChanged resolves a user
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        const token = await user.getIdToken(forceRefresh);
        resolve(token);
      } else {
        resolve(null);
      }
    });
  });
}

/**
 * Send a password reset email.
 */
export async function sendResetEmail(email) {
  return sendPasswordResetEmail(auth, email);
}
