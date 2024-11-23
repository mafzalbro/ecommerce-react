import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import useAuth from "../../hooks/AuthProvider";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../../components/ui/toast";
import { Link } from "@/components/ui/link";
import { Navigate, useNavigate } from "react-router-dom";

const SignIn = () => {
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // 'success' or 'error'

  const validateForm = () => {
    let valid = true;
    let errors = { email: "", password: "" };

    if (!email) {
      errors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(email, password);
      setToastMessage("Successfully logged in!");
      setToastType("success");
      navigate("/");
    } catch {
      setToastMessage(error || "An error occurred. Please try again.");
      setToastType("error");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <ToastProvider>
      <div className="flex items-center justify-center my-20">
        <div className="border p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. johndoe@example.com"
              required
              className={errors.email ? "border-red-500" : "border-gray-300"}
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className={errors.password ? "border-red-500" : "border-gray-300"}
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Logging in..." : "Sign In"}
            </Button>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </form>
          <div className="mt-4 text-center">
            <span>Don&apos;t have an account? </span>
            <Link href="/signup">Sign Up</Link>
          </div>
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

export default SignIn;
