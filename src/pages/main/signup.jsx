import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import useAuth from "../../hooks/AuthProvider";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import GeneratePasswordInput from "../../components/ui/generate-password-input";
import { useToast } from "@/hooks/use-toast"; // Import useToast
import { Navigate, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { signup, loading } = useLogin();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast(); // Destructure the toast function from useToast

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    address1: "",
    phone: "",
  });

  const handleRegister = async () => {
    try {
      const response = await signup(userData);
      if (response) {
        // Display a success toast
        toast({
          title: "Success",
          description: "Registration successful!",
          status: "success",
        });

        // Navigate to the signin page after a short delay
        setTimeout(() => navigate("/"), 1500);
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    } catch (error) {
      // Display an error toast
      toast({
        title: "Error",
        description: error.message || "An error occurred during registration.",
        status: "error",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="border p-6 rounded-lg shadow-lg w-full md:w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Basic Info Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>
          </div>

          {/* Password */}
          <GeneratePasswordInput
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
          />

          {/* City and Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={userData.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            </div>
            <div>
              <Label htmlFor="address1">Address</Label>
              <Input
                id="address1"
                name="address1"
                value={userData.address1}
                onChange={handleInputChange}
                placeholder="Address"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
          </div>

          {/* Submit Button */}
          <Button onClick={handleRegister} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
