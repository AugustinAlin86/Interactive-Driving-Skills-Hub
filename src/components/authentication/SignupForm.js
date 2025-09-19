// src/components/authentication/SignupForm.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/client/firebaseClient";
import CreateUserIfNotExists from "./CreateUserIfNotExists";
import GoogleLoginButton from "./GoogleLoginButton";

export default function SignupForm() {
const router =useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [dob, setDob]             = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [licenceNo, setLicenceNo] = useState("");
  const [telephone, setTelephone] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // ✅ More flexible regex for names
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

  function clearMessages() {
    setError("");
    setSuccess("");
  }

  async function handleSignup(e) {
    e.preventDefault();
    clearMessages();

    // ✅ Field checks
    if (!firstName || !lastName || !dob || !email || !password || !confirmPassword || !licenceNo) {
      setError("All fields are required.");
      return;
    }
    if (!nameRegex.test(firstName)) {
      setError("First name can only contain letters, spaces, hyphens, or apostrophes.");
      return;
    }
    if (!nameRegex.test(lastName)) {
      setError("Last name can only contain letters, spaces, hyphens, or apostrophes.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!acceptedTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    // ✅ Date of Birth validation
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
      setError("Invalid date of birth.");
      return;
    }

    const today = new Date();

    // Minimum age (16)
    const minAgeDate = new Date(today);
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 16);
    if (dobDate > minAgeDate) {
      setError("You must be at least 16 years old.");
      return;
    }

    // Maximum age (120)
    const maxAgeDate = new Date(today);
    maxAgeDate.setFullYear(maxAgeDate.getFullYear() - 120);
    if (dobDate < maxAgeDate) {
      setError("Invalid date of birth (too old).");
      return;
    }

    try {
      setIsCreating(true);

      // ✅ Create Firebase Auth user
      await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      setSuccess("Account created successfully! Redirecting");
        // ✅ Redirect to home after short delay
      setTimeout(() => {
        router.push("/");   // go to homepage
      }, 1500);


    } catch (err) {
      setError("Signup failed: " + (err?.message || "Try again."));
    } finally {
      setIsCreating(false);
    }
  }

  // ✅ Profile overrides sent to Firestore after signup
  const profileOverrides = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    dob,
    licenceNo: licenceNo.trim().toUpperCase(),
    telephone: telephone.trim(),
  };

  // ✅ Pre-calculate min/max dates for input
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0];
  const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0];

  return (
    <>
      <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
        <form onSubmit={handleSignup} noValidate className="space-y-6">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); clearMessages(); }}
                  required 
                  disabled={isCreating}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); clearMessages(); }}
                  required 
                  disabled={isCreating}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearMessages(); }}
                  autoComplete="email"
                  required 
                  disabled={isCreating}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  id="telephone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={telephone}
                  onChange={(e) => { setTelephone(e.target.value); clearMessages(); }}
                  required 
                  disabled={isCreating}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Driving Information Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Driving Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => { setDob(e.target.value); clearMessages(); }}
                  min={minDate}
                  max={maxDate}
                  required 
                  disabled={isCreating}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="licenceNo" className="block text-sm font-medium text-gray-700 mb-2">
                  Driver Licence Number *
                </label>
                <input
                  id="licenceNo"
                  type="text"
                  placeholder="Enter your licence number"
                  value={licenceNo}
                  onChange={(e) => { setLicenceNo(e.target.value); clearMessages(); }}
                  required 
                  disabled={isCreating}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearMessages(); }}
                  autoComplete="new-password"
                  required 
                  disabled={isCreating}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); clearMessages(); }}
                  required 
                  disabled={isCreating}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              required
              disabled={isCreating}
              className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
              I agree to the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 font-medium">
                Terms & Conditions
              </a>
              {" "}and{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 font-medium">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {success}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isCreating}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isCreating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Signup */}
          <div className="flex justify-center">
            <GoogleLoginButton />
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-red-600 hover:text-red-700 font-medium">
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* ✅ Firestore profile creation runs only after success */}
      {success && <CreateUserIfNotExists overrides={profileOverrides} />}
    </>
  );
}
