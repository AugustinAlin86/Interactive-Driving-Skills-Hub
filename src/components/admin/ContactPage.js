"use client";

import { useEffect, useState } from "react";
import { getIdToken, onAuthChange } from "@/lib/client/clientAuthService";
import { formatFirestoreDateTime } from "@/lib/utils/dateUtils";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (!user) {
        setError("⚠️ You must be logged in as admin to view messages.");
        setLoading(false);
        return;
      }

      try {
        const token = await getIdToken();
        const res = await fetch("/api/admin/contact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch messages: ${res.status}`);
        }

        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error("❌ Error fetching messages:", err);
        setError("Could not load messages. Check admin permissions.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="loading">Loading messages...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <style>{`
        .container { padding: 20px; font-family: Arial, sans-serif; }
        .title { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; }
        .table { width: 100%; border-collapse: collapse; border: 1px solid #ccc; }
        .table th, .table td { padding: 8px; border: 1px solid #ccc; text-align: left; }
        .table thead { background: #f4f4f4; }
        .table tr:hover { background: #fafafa; }
        .noData { text-align: center; color: #666; padding: 12px; }
        .loading { color: #555; }
        .error { color: red; font-weight: bold; }
      `}</style>

      <h1 className="title">📩 Contact Messages</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan="5" className="noData">
                No messages yet.
              </td>
            </tr>
          ) : (
            messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.phone}</td>
                <td>{msg.message}</td>
                <td>
                  {formatFirestoreDateTime(msg.createdAt)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
