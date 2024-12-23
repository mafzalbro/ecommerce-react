import { Route } from "react-router-dom";
import DashboardPage from "../../pages/seller/dashboard/DashboardPage";
import UserProfile from "../../pages/user/UserProfile";
import ProductPageWrapper from "../../pages/seller/products/ProductPageWrapper";
import UpdateProductPage from "../../pages/seller/products/UpdateProductPage";
import AddProductPage from "../../pages/seller/products/AddProductPage";
import SellerRequestsPage from "../../pages/seller/requests/SellerRequestsPage";
import OrderPageWrapper from "../../pages/seller/orders/OrderPageWrapper";
import CustomerPageWrapper from "../../pages/seller/customers/CustomersPageWrapper";

const sellerRoutes = (
  <>
    <Route path="/seller" element={<DashboardPage />} />
    <Route path="/seller/profile" element={<UserProfile />} />
    <Route path="/seller/products" element={<ProductPageWrapper />} />
    <Route path="/seller/request" element={<SellerRequestsPage />} />
    <Route path="/seller/customers" element={<CustomerPageWrapper />} />
    <Route path="/seller/orders" element={<OrderPageWrapper />} />
    <Route path="/seller/products/:id" element={<UpdateProductPage />} />
    <Route path="/seller/products/new" element={<AddProductPage />} />
  </>
);

export default sellerRoutes;
