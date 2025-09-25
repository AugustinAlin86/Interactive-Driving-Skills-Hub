import admin from "@/lib/admin/firebaseAdmin";

/**
 * Authenticate a request as an admin.
 * Returns decoded token if admin, otherwise null.
 *
 * @param {Request} request - Incoming Next.js or Node request object
 * @returns {Promise<object|null>} - Decoded token if admin, else null
 */
export async function authenticateAdmin(request) {
  try {
    // 1. Extract Authorization header
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      console.warn("❌ No token found in Authorization header");
      return null;
    }

    
    const decoded = await admin.auth().verifyIdToken(token);

    
    if (decoded.admin === true) {
      return decoded; 
    }

  
    return null;
  } catch (err) {
    console.error("❌ Admin authentication failed:", err);
    return null;
  }
}
