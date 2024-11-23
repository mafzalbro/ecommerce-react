import { Route } from "react-router-dom";
import UserProfile from "../../pages/user/UserProfile";
import ProductPageWrapper from "../../pages/seller/products/ProductPageWrapper";
import UpdateProductPage from "../../pages/seller/products/UpdateProductPage";
import AddProductPage from "../../pages/seller/products/AddProductPage";

const sellerRoutes = (
  <>
    <Route path="/seller" element={<UserProfile />} />
    <Route path="/admin/products" element={<ProductPageWrapper />} />
    <Route path="/admin/products/:id" element={<UpdateProductPage />} />
    <Route path="/admin/products/new" element={<AddProductPage />} />
  </>
);

export default sellerRoutes;
