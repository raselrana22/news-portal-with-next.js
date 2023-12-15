"use client";

import EmailVerifyComponent from "@/app/components/EmailVerifyComponent";
import { useRouter } from "next/navigation";

export default function EmailVerify() {
  const router = useRouter();

  const handleEmailVerify = (verificationResult) => {
    if (verificationResult === "success") {
      router.push("/user/otpVerify");
    } else {
    }
  };

  return (
    <div>
      <EmailVerifyComponent onSubmit={handleEmailVerify} />
    </div>
  );
}
