// components/LoginForm.js

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // If there are no validation errors, further actions happen
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Prepare the data to send to the backend
        const postData = {
          email: formData.email,
          password: formData.password,
        };

        // Make an API call to your backend for login
        const response = await fetch("http://localhost:3000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        // Handle the response from the backend
        const responseData = await response.json();

        if (responseData.status === "success") {
          console.log("Login successful:", responseData.data);
          alert("Login successful");
          // Use router to navigate to the desired page
          router.push("/dashboard"); // Change the route as needed
        } else {
          console.error("Login failed:", responseData.data);
          alert("Login failed");
          // Handle failure, e.g., display an error message to the user
        }
      } catch (error) {
        console.error("Error:", error.message);
        // Handle other errors, e.g., display a generic error message to the user
      }
    }
  };

  // The form data validation
  const validateForm = (data) => {
    let errors = {};

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is not valid";
    }

    if (!data.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
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
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
