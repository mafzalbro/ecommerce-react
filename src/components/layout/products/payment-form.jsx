// src/components/PaymentForm.js
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Modal, Button } from "antd";
import { base_url_candor, getToken } from "../../utils/constants";

const PaymentForm = ({ plan, setIsModalOpen, isModalOpen, fetchPlans, getHistory }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setPaymentError("Stripe has not loaded properly.");
      return;
    }

    // Create token using CardElement
    const { token, error } = await stripe.createToken(elements.getElement(CardElement));
    
    if (error) {
      // Set the payment error message if there is an error
      setPaymentError(error.message);
    } else {
      // Call backend to process payment
      try {
        const response = await fetch(`${base_url_candor}stripe/checkout-plan-payment`, {
          method: "POST",
          body: JSON.stringify({
            source: token.id,
            amount: plan.amount,
            currency: "usd",
            planId: plan._id,
          }),
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          // Handle successful response, for example:
          fetchPlans();
          getHistory();
          setIsModalOpen(false); // Close the modal after successful payment
        } else {
          // If response is not OK, show the error message
          setPaymentError(data.message || "An error occurred while processing the payment.");
        }
      } catch (err) {
        setPaymentError("Error connecting to the payment server. Please try again later.");
        console.error(err);
      }
    }
  };

  return (
    <div>
      {paymentError && <div className="error text-red-500">{paymentError}</div>}

      <Modal
        title="Payment Details"
        visible={isModalOpen} // 'visible' instead of 'open' for Ant Design version compatibility
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                  },
                },
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#94A2F2] text-white py-2 px-4 rounded-md"
              disabled={!stripe} // Disable if Stripe is not ready
            >
              Checkout
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PaymentForm;
