import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { FaStar, FaRegStar } from "react-icons/fa";

function AddReview({ productId, addReview }) {
  const [review, setReview] = useState({
    comment: "",
    rating: 5, // Default rating
  });
  const [loading, setLoading] = useState(false); // Track loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleStarClick = (star) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating: star,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.comment.trim()) {
      toast({
        title: "Error",
        description: "Review comment cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setLoading(true); // Set loading state to true when submitting
    try {
      await addReview(productId, review);
      setReview({ comment: "", rating: 5 }); // Clear form after submission
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while submitting the review.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Reset loading state after the submission
    }
  };

  return (
    <div className="space-y-4 mx-auto w-full max-w-screen-md">
      <h3 className="text-2xl font-semibold">Add a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <Textarea
            name="comment"
            value={review.comment}
            onChange={handleChange}
            rows={4}
            className="p-2 border rounded-md"
            placeholder="Write your review here..."
          />
          <div className="flex space-x-2 items-center">
            <Label className="text-lg">Rating:</Label>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => handleStarClick(star)}
                className="focus:outline-none"
              >
                {review.rating >= star ? (
                  <FaStar className="text-yellow-500" size={24} />
                ) : (
                  <FaRegStar className="text-yellow-500" size={24} />
                )}
              </button>
            ))}
          </div>
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={loading || !review.comment.trim()} // Disable button if loading or no comment
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddReview;
