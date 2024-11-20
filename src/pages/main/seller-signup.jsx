import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import useAuth from "../../hooks/AuthProvider";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import GeneratePasswordInput from "../../components/ui/generate-password-input";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../../components/ui/toast";
import { Navigate, useNavigate } from "react-router-dom";

const SellerRegisterPage = () => {
  const { signup, logout, loading, error } = useLogin();
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
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleRegister = async () => {
    const response = await signup(userData);
    if (response) {
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
    return (
      <div className="my-40 flex justify-center items-center">
        <Button onClick={() => logout()}>Please Logout From Old Account to create</Button>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="flex items-center justify-center my-20">
        <div className="border p-6 rounded-lg shadow-lg w-full md:max-w-screen-md">
          <h2 className="text-2xl font-semibold mb-4">
            Register To Become a Seller...
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Basic Info Fields */}
            <h3 className="my-4 mt-10 font-semibold">General Details</h3>
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

            <h3 className="my-4 mt-10 font-semibold">Business Details</h3>
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
                <Label htmlFor="bankAccountNumber">Bank Account Number</Label>
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

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountHolderName">Account Holder Name</Label>
                <Input
                  id="accountHolderName"
                  name="accountHolderName"
                  value={userData.accountHolderName}
                  onChange={handleInputChange}
                  placeholder="Account Holder Name"
                />
              </div>
              <div>
                <Label htmlFor="branchCode">Branch Code</Label>
                <Input
                  id="branchCode"
                  name="branchCode"
                  value={userData.branchCode}
                  onChange={handleInputChange}
                  placeholder="Branch Code"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="idCardNumber">ID Card Number</Label>
                <Input
                  id="idCardNumber"
                  name="idCardNumber"
                  value={userData.idCardNumber}
                  onChange={handleInputChange}
                  placeholder="ID Card Number"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleRegister}
              disabled={
                loading || Object.values(userData).some((value) => value === "")
              }
            >
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

export default SellerRegisterPage;
