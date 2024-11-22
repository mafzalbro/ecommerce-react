// src/components/StripeProvider.js
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51Nh77sCGqAnoy5JSBGRi3GfW9T4oWBJpB13ZmCorOxXLATN3fIAvritRTSiSbCBzYI51YTrj0ukYg9oZMNw0SoHW00ztrIRGRh"
);

const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
