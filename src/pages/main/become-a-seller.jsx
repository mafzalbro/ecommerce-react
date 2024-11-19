import { Link } from "react-router-dom";

function Seller() {
  return (
    <div className="max-w-screen-md mx-auto">
      {/* Carousel */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={""}
              srcSet="/placeholder.png"
              className="d-block w-full object-cover rounded-md"
              alt="Sell here"
            />
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="sellers-heading mt-8 text-center">
        <h2 className="text-2xl font-semibold">Welcome to Restorex – Your Ultimate Selling Partner!</h2>
        <p className="mt-4 text-lg">
          Want to Sell with Restorex?{" "}
          <Link
            className="text-blue-700 underline"
            to="/seller-signup"
          >
            Sign Up Here!
          </Link>
        </p>
        <SellerDetail />
      </div>
    </div>
  );
}

export default Seller;

import React from "react";

export function SellerDetail() {
  return (
    <div className="max-w-screen-md mx-auto mt-8 px-4">
      <div className="selling-page">
        <p className="join-sellers text-lg mb-4">
          Join our thriving community of successful sellers and take your
          business to the next level with Restorex. Here's why selling on
          Restorex is the best decision for your business:
        </p>

        <div className="howsell">
          <h3 className="text-xl font-semibold">How to Sell</h3>
          <p className="sellpara text-md mt-2">
            Welcome to Restorex, your trusted e-commerce platform. Selling on
            Restorex offers numerous benefits, including access to a vast
            customer base, advanced selling tools, and dedicated support to help
            you succeed.
          </p>
        </div>

        <div className="restorexselling mt-8">
          <h3 className="text-xl font-semibold">What to Know</h3>
          <ul className="sellpara mt-4">
            <li>
              <h6 className="font-semibold">Enhanced Visibility</h6>
              <p className="sellparagraph text-md">
                Boost Your Reach: Our platform provides high visibility for your
                products, ensuring they reach a wide audience of potential buyers.
              </p>
            </li>
            <li>
              <h6 className="font-semibold">Advanced Tools</h6>
              <p className="sellparagraph text-md">
                Grow Your Sales: Utilize our state-of-the-art selling tools, from
                advanced analytics to promotional features, to maximize your sales
                and business growth. No Selling Fees.
              </p>
            </li>
            <li>
              <h6 className="font-semibold">No Selling Fees</h6>
              <p className="sellparagraph text-md">
                Keep All Your Profits: Enjoy the benefit of selling your products
                on Restorex with no transaction fees. Every penny you earn is yours
                to keep.
              </p>
            </li>
            <li>
              <h6 className="font-semibold">Priority Support</h6>
              <p className="sellparagraph text-md">
                We’re Here for You: Access our dedicated priority support team to
                quickly resolve any issues and get back to selling without delays.
              </p>
            </li>
            <li>
              <h6 className="font-semibold">Community and Training</h6>
              <p className="sellparagraph text-md">
                Learn and Connect: Join exclusive training sessions and webinars,
                and connect with other sellers to share tips and strategies for
                success.
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Selling Steps */}
      <h3 className="text-xl font-semibold mt-8 mb-4">Way to Easy Selling</h3>
      <div className="stepselling row d-flex">
        <div className="stepsell col-md-4">
          <ul>
            <li>
              <h6 className="font-semibold">Create Your Account</h6>
              <p className="sellparagraph text-md">Sign up quickly and easily on Restorex.</p>
            </li>
            <li>
              <h6 className="font-semibold">Choose Premium Membership</h6>
              <p className="sellparagraph text-md">Unlock exclusive features with our Premium Membership.</p>
            </li>
            <li>
              <h6 className="font-semibold">List Your Products</h6>
              <p className="sellparagraph text-md">Add your products with high-quality images and detailed descriptions.</p>
            </li>
            <li>
              <h6 className="font-semibold">Start Selling</h6>
              <p className="sellparagraph text-md">Reach thousands of customers and grow your business!</p>
            </li>
          </ul>
        </div>
        <div className="col-md-8 w-50">
          <img
            src={""}
            srcSet="/placeholder.png"
            alt="Sell here"
            className="sell-img w-full rounded-md my-10 object-cover"
          />
        </div>
      </div>

      {/* Ready to Sell Section */}
      <h6 className="sellheading text-xl font-semibold mt-8">Ready to Sell?</h6>
      <p className="sellparagraph1 mt-4 text-md">
        Take advantage of all the benefits Restorex has to offer. Join our
        community of successful sellers today and watch your business flourish!
      </p>
    </div>
  );
}
