import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentForm = ({ totalPrice, setIsProcessing }) => {
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setIsProcessing(true);

    const { clientSecret } = await fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: totalPrice * 100 }), // Convert price to cents
    }).then((res) => res.json());

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      setError(error.message);
      setLoading(false);
      setIsProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      setSucceeded(true);
      setLoading(false);
      setIsProcessing(false);
      alert("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div>{error}</div>}
      {succeeded ? (
        <div>Payment Successful!</div>
      ) : (
        <button type="submit" disabled={loading || !stripe}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      )}
    </form>
  );
};

export default PaymentForm;
