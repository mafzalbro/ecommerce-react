import { Route } from "react-router-dom";
import UserProfile from "../../pages/user/UserProfile";
import CartPage from "../../pages/user/cartPage";
import CheckoutPage from "../../pages/user/checkoutPage";
import UserSettings from "../../pages/user/UserSettings";
import OrdersPage from "../../pages/user/ordersPage";

const userRoutes = (
  <>
    <Route path="/user/cart" element={<CartPage />} />
    <Route path="/user/checkout" element={<CheckoutPage />} />
    <Route path="/user/profile" element={<UserProfile />} />
    <Route path="/user/settings" element={<UserSettings />} />
  </>
);

export default userRoutes;
