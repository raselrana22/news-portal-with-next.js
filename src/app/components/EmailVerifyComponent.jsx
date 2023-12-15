// components/EmailVerify.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EmailVerifyComponent = ({ onSubmit }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform email verification logic
    try {
      // Make a GET request to your backend with the email as a query parameter
      const response = await fetch(
        `/api/user/recover/verifyEmail?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response from the backend
      const data = await response.json();

      // Update the state with the verification result
      setVerificationResult(data.status);
      setResponseData(data);

      if (data.status === "success") {
        console.log("Email verification successful:", data.data);

        onSubmit(verificationResult);
      } else {
        console.error("Email verification failed:", data.data);
      }
    } catch (error) {
      console.error("Error during email verification:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Verify Email
        </button>

        {/* Display verification result */}
        {verificationResult && (
          <p
            className={
              verificationResult === "success"
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {verificationResult === "success"
              ? `Email verified successfully: ${responseData.data}`
              : `Email verification failed: ${responseData.data}`}
          </p>
        )}
      </form>
    </div>
  );
};

export default EmailVerifyComponent;
