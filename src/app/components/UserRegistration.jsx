// components/RegistrationForm.js

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  // Initialize the useRouter hook
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
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
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
          // Add other non-sensitive data as needed
        };

        // Make an API call to your backend
        const response = await fetch(
          "http://localhost:3000/api/user/registration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        );

        // Handle the response from the backend
        const responseData = await response.json();

        if (responseData.status === "success") {
          console.log("Registration successful:", postData);
          alert("Registration successful");
          // Use router to navigate to the desired page
          router.push("/user/login");
        } else {
          console.error("Registration failed:", responseData.data);
          alert("Registration failed");
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

    if (!data.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is not valid";
    }

    if (!data.mobile.trim()) {
      errors.mobile = "Mobile is required";
    } else if (!/^\d{11}$/.test(data.mobile)) {
      errors.mobile = "Mobile must be a 11-digit number";
    }

    if (!data.password.trim()) {
      errors.password = "Password is required";
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
        </div>

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
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.mobile ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
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

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
