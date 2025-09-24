export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "@/lib/admin/firebaseAdmin";
import { authenticateAdmin } from "@/lib/admin/authenticateAdmin";

const firestore = admin.firestore();


// 🔹 GET all contact messages
export async function GET(request) {
    
  const requester = await authenticateAdmin(request);
  if (!requester) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const snapshot = await firestore
      .collection("contact")
      .orderBy("createdAt", "desc")
      .get();

    const messages = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? {
          seconds: data.createdAt.seconds || data.createdAt._seconds,
          nanoseconds: data.createdAt.nanoseconds || data.createdAt._nanoseconds
        } : null
      };
    });

    return NextResponse.json({ success: true, messages });
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// 🔹 POST new message (admin could also insert one manually)
export async function POST(request) {
  const requester = await authenticateAdmin(request);
  if (!requester) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const newDoc = await firestore.collection("contact").add({
      name,
      email,
      phone: phone || "",
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "new",
    });

    return NextResponse.json({
      success: true,
      message: "Contact message saved successfully",
      id: newDoc.id,
    });
  } catch (err) {
    console.error("Error saving contact message:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// 🔹 PATCH to update status (e.g., mark as "resolved")
export async function PATCH(request) {
  const requester = await authenticateAdmin(request);
  if (!requester) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: "ID and status required" }, { status: 400 });
    }

    await firestore.collection("contact").doc(id).update({ status });

    return NextResponse.json({
      success: true,
      message: `Contact ${id} updated to status: ${status}`,
    });
  } catch (err) {
    console.error("Error updating contact:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// 🔹 DELETE a message
export async function DELETE(request) {
  const requester = await authenticateAdmin(request);
  if (!requester) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await firestore.collection("contact").doc(id).delete();

    return NextResponse.json({ success: true, message: `Contact ${id} deleted` });
  } catch (err) {
    console.error("Error deleting contact:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
