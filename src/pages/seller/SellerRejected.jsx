import React from "react";
import useAuth from "../../hooks/AuthProvider";

const SellerRejected = () => {
  const { logout } = useAuth();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <div className="mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/594/594864.png"
            alt="Request Rejected"
            className="w-20 h-20 mx-auto"
          />
        </div>
        <h1 className="text-2xl font-semibold text-red-600 mb-4">
          Request Rejected
        </h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your seller registration request has been rejected by
          the admin. Please review the rejection email for more details or reach
          out to our support team if you have questions.
        </p>
        <div className="text-gray-500 mb-4">
          <p>We apologize for any inconvenience caused.</p>
        </div>
        <button
          className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition-all"
          onClick={() => logout()}
        >
          Retry Registration
        </button>
      </div>
    </div>
  );
};

export default SellerRejected;
