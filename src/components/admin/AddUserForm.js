"use client";

import { useState } from "react";
import { getIdToken } from "@/lib/client/clientAuthService";
import "../admin/style/AddUserForm.css"; 

export default function AddUserForm({ onUserCreated }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    licenceNo: "",
    phone: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Creating user...");

    try {
      const token = await getIdToken();
      if (!token) {
        setStatus("⚠️ Not logged in as admin");
        return;
      }

      const res = await fetch("/api/admin/users/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create user");

      setStatus(`✅ User ${form.email} created!`);
      setForm({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dob: "",
        licenceNo: "",
        phone: "",
      });

      if (onUserCreated) {
        setTimeout(() => onUserCreated(), 1500);
      }
    } catch (err) {
      setStatus(`⚠️ ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-grid">
        <div>
          <label className="form-label">Email *</label>
          <input
            name="email"
            type="email"
            placeholder="user@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Password *</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
      </div>

      <div className="form-grid">
        <div>
          <label className="form-label">First Name</label>
          <input
            name="firstName"
            placeholder="John"
            value={form.firstName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Last Name</label>
          <input
            name="lastName"
            placeholder="Doe"
            value={form.lastName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label className="form-label">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-grid">
        <div>
          <label className="form-label">Licence Number</label>
          <input
            name="licenceNo"
            placeholder="ABC123456"
            value={form.licenceNo}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Phone Number</label>
          <input
            name="phone"
            placeholder="+44 1234 567890"
            value={form.phone}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={() => onUserCreated && onUserCreated()}
          className="form-btn form-btn-cancel"
        >
          Cancel
        </button>
        <button type="submit" className="form-btn form-btn-primary">
          Add User
        </button>
      </div>

      {status && (
        <div className={status.includes("✅") ? "status-success" : "status-error"}>
          {status}
        </div>
      )}
    </form>
  );
}
