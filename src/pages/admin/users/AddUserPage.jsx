import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import GeneratePasswordInput from "../../../components/ui/generate-password-input";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../../../components/ui/toast";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../utils/users";
import GoBack from "@/components/layout/admin/GoBack";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddUserPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
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
    isActive: true,
    verified: false,
    blocked: false,
  });

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await addUser(userData);
      console.log(response);

      if (response) {
        setToastMessage("User added successfully!");
        setToastType("success");
        navigate("/admin/users"); // Navigate to the user list page
      } else {
        setToastMessage("An error occurred during registration.");
        setToastType("error");
      }
    } catch (error) {
      setToastMessage(error.message || "Error occurred");
      setToastType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToastProvider>
      <div className="mx-10">
        <GoBack to="/admin/users" />
      </div>
      <div className="flex items-center justify-center my-20">
        <div className="border p-6 rounded-lg shadow-lg w-full md:max-w-screen-md">
          <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
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

            {/* Role */}
            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                value={userData.role}
                onValueChange={(value) =>
                  setUserData((prevData) => ({ ...prevData, role: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="seller">Seller</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Conditional Business Info */}
            {userData.role === "seller" && (
              <>
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

                {/* Account Holder Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accountHolderName">
                      Account Holder Name
                    </Label>
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
              </>
            )}

            {/* Admin-specific Fields */}
            <h3 className="my-4 mt-10 font-semibold">Admin Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="isActive">Is Active</Label>
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={userData.isActive}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <Label htmlFor="verified">Verified</Label>
                <input
                  type="checkbox"
                  id="verified"
                  name="verified"
                  checked={userData.verified}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <Label htmlFor="blocked">Blocked</Label>
                <input
                  type="checkbox"
                  id="blocked"
                  name="blocked"
                  checked={userData.blocked}
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button onClick={handleRegister} disabled={loading}>
              {loading ? "Adding..." : "Add User"}
            </Button>
          </form>

          {/* Toast Notifications */}
          {toastMessage && (
            <Toast>
              <ToastTitle>
                {toastType === "success" ? "Success" : "Error"}
              </ToastTitle>
              <ToastDescription>{toastMessage}</ToastDescription>
              <ToastClose />
            </Toast>
          )}
          <ToastViewport />
        </div>
      </div>
    </ToastProvider>
  );
};

export default AddUserPage;
