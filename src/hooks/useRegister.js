import { useState } from "react";
import fetcher from "../utils/fetcher";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (data) => {
    setLoading(true);
    setError(null);

    // Prepare the user data
    const userData = {
      name: data.name, // Combine first and last name into 'name'
      email: data.email,
      password: data.password,
      role: data.role || "user", // Default to 'user' if no role is provided
      isActive: true, // Set to true, assuming active status on registration
      addresses: [
        {
          city: data.city,
          street: data.address1, // Use address1 as street
          phone: data.phone,
        },
      ],
      // Only include sellerInfo if the role is 'seller'
      ...(data.role === "seller" && {
        sellerInfo: {
          businessName: data.businessName,
          businessAddress: data.businessAddress,
          businessType: data.businessType,
          taxIdNumber: data.taxIdNumber,
          bankAccountNumber: data.bankAccountNumber,
          bankName: data.bankName,
          accountHolderName: data.accountHolderName,
          branchCode: data.branchCode,
          documents: {
            idCardNumber: data.idCardNumber,
            idImage1: data.idImage1,
            idImage2: data.idImage2,
          },
        },
      }),
    };

    try {
      // Make API call using fetcher utility
      const response = await fetcher.post("/api/v1/users/addUser", userData);
      console.log(response.data);

      // Store the response data in localStorage for the user session
      localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
