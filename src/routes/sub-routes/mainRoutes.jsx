// src/routes/sub-routes/mainRoutes.js
import { Route } from "react-router-dom";
import Home from "../../pages/main/home/home";
import Pricing from "../../pages/main/pricing";
import About from "../../pages/main/about";
import SignIn from "../../pages/main/signin";
import SignUp from "../../pages/main/signup";
import SellerRegisterPage from "../../pages/main/seller-signup";
import ProductDetailsPage from "../../pages/main/products-details";
import ProductsWrapper from "../../pages/main/products-wrapper";
import ContactPage from "../../pages/main/contact-page";
import BecomeSeller from "../../pages/main/become-a-seller";

const mainRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<ProductsWrapper />} />
    <Route path="/products/:productId" element={<ProductDetailsPage />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/seller-signup" element={<SellerRegisterPage />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/become-a-seller" element={<BecomeSeller />} />
  </>
);

export default mainRoutes;
