"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <button className="btn btn-outline btn-error font-light" onClick={handleSignOut}>
      ↩ সাইন আউট
    </button>
  );
}
