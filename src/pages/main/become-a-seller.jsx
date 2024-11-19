import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import useAuth from "../../hooks/AuthProvider";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import GeneratePasswordInput from "../../components/ui/generate-password-input";
import {
  Toast,
  //   ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../../components/ui/toast";
import { Navigate, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { signup, loading, error } = useLogin();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    address1: "",
    phone: "",
    businessName: "",
    businessAddress: "",
    businessType: "",
    taxIdNumber: "",
    bankAccountNumber: "",
    bankName: "",
    accountHolderName: "",
    branchCode: "",
    idCardNumber: "",
    idImage1: null,
    idImage2: null,
  });

  const [role, setRole] = useState("user"); // Setting default role
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // 'success' or 'error'

  const handleRegister = async () => {
    const response = await signup(userData);
    if (response) {
      // Handle successful registration, e.g., navigate to login page
      navigate("/signin");
    } else {
      setToastMessage(error || "An error occurred during registration.");
      setToastType("error");
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
    <ToastProvider>
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

            {/* City and Address in row for larger screens */}
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

            {/* Role Selection */}
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="seller">Seller</SelectItem>
              </SelectContent>
            </Select>

            {/* Seller Specific Fields */}
            {role === "seller" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={userData.businessName}
                      onChange={handleInputChange}
                      placeholder="Business Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessAddress">Business Address</Label>
                    <Input
                      id="businessAddress"
                      name="businessAddress"
                      value={userData.businessAddress}
                      onChange={handleInputChange}
                      placeholder="Business Address"
                    />
                  </div>
                </div>

                {/* More seller-specific fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Input
                      id="businessType"
                      name="businessType"
                      value={userData.businessType}
                      onChange={handleInputChange}
                      placeholder="Business Type"
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxIdNumber">Tax ID Number</Label>
                    <Input
                      id="taxIdNumber"
                      name="taxIdNumber"
                      value={userData.taxIdNumber}
                      onChange={handleInputChange}
                      placeholder="Tax ID Number"
                    />
                  </div>
                </div>

                {/* Other seller-specific fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bankAccountNumber">
                      Bank Account Number
                    </Label>
                    <Input
                      id="bankAccountNumber"
                      name="bankAccountNumber"
                      value={userData.bankAccountNumber}
                      onChange={handleInputChange}
                      placeholder="Bank Account Number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      name="bankName"
                      value={userData.bankName}
                      onChange={handleInputChange}
                      placeholder="Bank Name"
                    />
                  </div>
                </div>
                {/* More fields can be similarly arranged */}
              </>
            )}

            {/* Submit Button */}
            <Button onClick={handleRegister} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toast open={toastMessage.length > 0} onClose={() => setToastMessage("")}>
        <ToastTitle>{toastType === "success" ? "Success" : "Error"}</ToastTitle>
        <ToastDescription>{toastMessage}</ToastDescription>
        <ToastClose as={Button} variant="destructive">
          Close
        </ToastClose>
        <ToastViewport />
      </Toast>
    </ToastProvider>
  );
};

export default RegisterPage;
