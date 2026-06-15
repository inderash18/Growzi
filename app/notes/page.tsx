"use client";

import { redirect } from "next/navigation";

export default function LegacyNotesIndex() {
  redirect("/resources");
  return null;
}
