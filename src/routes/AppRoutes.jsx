import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "../components/layout/navbar/Navbar";
import SellerNotApproved from "@/pages/seller/SellerNotApproved.jsx";
import Footer from "../components/layout/footer";
import useAuth from "../hooks/AuthProvider";
import mainRoutes from "./sub-routes/mainRoutes";
import userRoutes from "./sub-routes/userRoutes";
import adminRoutes from "./sub-routes/adminRoutes";
import sellerRoutes from "./sub-routes/sellerRoutes";
import ProtectedRoute from "./ProtectedRoute";
import Spinner from "../components/ui/spinner";
import { Toaster } from "../components/ui/toaster";
import SellerRejected from "../pages/seller/SellerRejected";
import CancelPage from "../pages/user/CancelPage";
import SuccessPage from "../pages/user/SuccessPage";

// Lazy load pages
const NotFound = React.lazy(() => import("../pages/main/NotFound"));

const AppRoutes = () => {
  const { isAuthenticated, role, approved, sellerStatus, userLoading } =
    useAuth();
    
  if (userLoading) {
    return <Spinner />;
  }

  return (
    <Router>
      <Navbar />
      <CancelPage />
      <SuccessPage />
        <Routes>
          {/* Main routes */}
          {mainRoutes}
          {/* Protected routes for general users */}
          {!isAuthenticated && role === null && (
            <Route
              path="/user/*"
              element={<ProtectedRoute role="user"></ProtectedRoute>}
            />
          )}
          {isAuthenticated && !!role ? userRoutes : null}
          {/* Protected routes for sellers */}
          {isAuthenticated && role !== "seller" && (
            <Route
              path="/seller/*"
              element={<ProtectedRoute role="seller"></ProtectedRoute>}
            />
          )}
          {isAuthenticated &&
            role === "seller" &&
            !approved &&
            sellerStatus === "pending" && (
              <Route path="/seller/*" element={<SellerNotApproved />} />
            )}
          {isAuthenticated &&
            role === "seller" &&
            !approved &&
            sellerStatus === "rejected" && (
              <Route path="/seller/*" element={<SellerRejected />} />
            )}
          {isAuthenticated &&
          role === "seller" &&
          approved &&
          sellerStatus === "approved"
            ? sellerRoutes
            : null}
          {/* Protected routes for admins */}
          {isAuthenticated && role !== "admin" && (
            <Route
              path="/admin/*"
              element={<ProtectedRoute role="admin"></ProtectedRoute>}
            />
          )}
          {isAuthenticated && role === "admin" ? adminRoutes : null}
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Toaster />
      <Footer />
    </Router>
  );
};

export default AppRoutes;
