"use client";
import { useState } from "react";
import { db } from "@/lib/client/firebaseClient"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contact"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "new",
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("❌ Error saving message:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return <p className="text-green-600 font-medium">✅ Thank you! Your message has been sent.</p>;
  }

  return (
    <div className="bg-white">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        SUBMIT YOUR REQUEST
      </h2>
      
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Describe your inquiry</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            placeholder="Tell us about your driving needs, preferred lesson times, or any questions you have..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
