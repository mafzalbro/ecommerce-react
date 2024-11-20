import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Save, X, CheckCircle } from "lucide-react";

// eslint-disable-next-line react/prop-types
const UserProfileCard = ({ initialUserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const { changePassword, updateProfile, loading } = useLogin();
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    if (isEditing) {
      // Save profile changes
      await updateProfile(userData._id, userData);

      localStorage.setItem("user", JSON.stringify({ user: userData }));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUserData(initialUserData);
    setIsEditing(false);
  };

  const handleChangePassword = async () => {
    const result = await changePassword(userData._id, {
      password: newPassword,
    });

    if (result && result?.message == "success") {
      setPasswordChangeSuccess(true);
    }
  };

  return (
    <div className="flex my-10 flex-wrap sm:flex-row">
      {/* Profile Card */}
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="relative">
          <div className="absolute right-4 top-4">
            {isEditing ? (
              <div className="space-x-2">
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} disabled={loading}>
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${userData.name}`}
              />
              <AvatarFallback>
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-2xl font-bold">
              {userData.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full mt-10 max-w-md mx-auto">
        <CardHeader className="relative">
          <div className="flex flex-col items-center">
            <CardTitle className="mt-4 text-2xl font-bold">
              Change Your Password
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Password change section */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button onClick={handleChangePassword} disabled={loading}>
            Change Password
          </Button>
        </CardContent>
        <CardFooter className="text-sm text-gray-500">
          <div>
            <p>Created: {new Date(userData.createdAt).toLocaleDateString()}</p>
            <p>
              Last Updated: {new Date(userData.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </CardFooter>
      </Card>

      {/* Password Change Success Card */}
      {passwordChangeSuccess && (
        <Card className="mt-4 max-w-md mx-auto bg-green-100 dark:bg-green-950">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-green-700">
              <CheckCircle className="w-5 h-5 mr-2 inline-block" />
              Password Changed Successfully
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your password has been updated successfully.</p>
          </CardContent>
          <CardFooter>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPasswordChangeSuccess(false)}
            >
              Close
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Loading State Card */}
      {loading && !passwordChangeSuccess && (
        <Card className="mt-4 max-w-md mx-auto bg-yellow-100 dark:bg-yellow-950">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-yellow-700">
              Loading...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>We are processing your request. Please wait.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserProfileCard;
