"use client";

import StatusBadge from "./StatusBadge";

/**
 * GlobalBadge
 * Renders the StatusBadge everywhere in the app.
 * Place it in your RootLayout so it appears on all pages.
 */
export default function GlobalBadge() {
  return <StatusBadge />;
}
