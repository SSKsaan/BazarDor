import EmptyState from "@/components/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "পাতাটি খুঁজে পাওয়া যায়নি",
};

export default function NotFound() {
  return (
    <EmptyState
      icon="🧺"
      title="পাতাটি খুঁজে পাওয়া যায়নি"
      message="আপনি যে পণ্য বা পাতাটি খুঁজছেন সেটি সরানো হয়েছে বা কখনো ছিল না।"
      buttonLabel="হোম পেজে যান"
    />
  );
}
