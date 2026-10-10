"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import AuthField from "@/components/auth-field";

export default function ProfileUpdateForm({
  currentName,
}: {
  currentName: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    setPending(true);
    const { error } = await authClient.updateUser({ name });
    setPending(false);
    if (error) {
      toast.error("কিছু ভুল হয়েছে");
      return;
    }
    toast.success("নাম আপডেট হয়েছে");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <AuthField id="name" label="নাম" type="text" value={name} onChange={setName} />
      <button
        type="submit"
        className="btn btn-primary w-full text-base font-bold"
        disabled={pending}
      >
        {pending && <span className="loading loading-spinner"></span>}
        হালনাগাদ করুন
      </button>
    </form>
  );
}
