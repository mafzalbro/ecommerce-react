import React from "react";
import useAuth from "../../hooks/AuthProvider";

const SellerNotApproved = () => {
  const { sellerStatus } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <div className="mb-6">
          {/* Pending icon */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/189/189792.png"
            alt="Pending Icon"
            className="w-20 h-20 mx-auto"
          />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          You're Almost There!
        </h1>
        <p className="text-gray-600 mb-6">
          Your seller registration is currently under review. Please wait for an
          admin to approve or reject your request. You'll be notified via email
          once a decision is made.
        </p>
        <div className="flex justify-center items-center space-x-4 mb-6">
          {/* Pending status with an icon */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/3455/3455263.png"
            alt="Clock Icon"
            className="w-6 h-6"
          />
          <span className="text-blue-600 font-medium text-lg">
            Status: {sellerStatus}
          </span>
        </div>
        <div className="text-gray-500 mb-4">
          <p>Thank you for your patience!</p>
        </div>
      </div>
    </div>
  );
};

export default SellerNotApproved;
