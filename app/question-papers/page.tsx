"use client";

import { redirect } from "next/navigation";

export default function LegacyQuestionPapersIndex() {
  redirect("/resources");
  return null;
}
