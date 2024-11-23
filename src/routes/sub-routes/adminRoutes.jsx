import { Route } from "react-router-dom";
import Profile from "../../pages/user/UserProfile";
import CategoryPageWrapper from "../../pages/admin/categories/CategoryPageWrapper";
import QueriesPage from "../../pages/admin/QueriesPage";
import RequestsPage from "../../pages/admin/RequestsPage";
import ProductPageWrapper from "../../pages/admin/products/ProductPageWrapper";
import UpdateProductPage from "../../pages/admin/UpdateProductPage";
import AddProductPage from "../../pages/admin/AddProductPage";
import AddCategoryPage from "../../pages/admin/categories/AddCategoryPage";
import UpdateCategoryPage from "../../pages/admin/categories/UpdateCategoryPage";
import AddSubCategoryPage from "../../pages/admin/subcategories/AddSubCategoryPage";
import UpdateSubCategoryPage from "../../pages/admin/subcategories/UpdateSubCategoryPage";
import SubCategoryPageWrapper from "../../pages/admin/subcategories/SubCategoryPageWrapper";
import AdminNotificationsPage from "../../pages/admin/notifications/AdminNotifcationsPage";
import UsersPageWrapper from "../../pages/admin/users/UsersPageWrapper";
import AddUserPage from "../../pages/admin/users/AddUserPage";
import UpdateUserPage from "../../pages/admin/users/UpdateUserPage";
import DashboardPage from "../../pages/admin/dashboard/DashboardPage";
import OrdersPage from "../../pages/user/ordersPage";
import RequestsPageWrapper from "../../pages/admin/requests/RequestsPageWrapper";
import RequestsAllPageWrapper from "../../pages/admin/requests/RequestsAllPageWrapper";

const userRoutes = (
  <>
    <Route path="/admin" element={<DashboardPage />} />
    <Route path="/admin/profile" element={<Profile />} />
    <Route path="/user/orders" element={<OrdersPage />} />
    <Route path="/admin/users" element={<UsersPageWrapper />} />
    <Route path="/admin/users/new" element={<AddUserPage />} />
    <Route path="/admin/users/:id" element={<UpdateUserPage />} />
    <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
    <Route path="/admin/categories" element={<CategoryPageWrapper />} />
    <Route path="/admin/categories/new" element={<AddCategoryPage />} />
    <Route path="/admin/categories/:categoryId" element={<UpdateCategoryPage />} />
    <Route path="/admin/subcategories" element={<SubCategoryPageWrapper />} />
    <Route path="/admin/subcategories/new" element={<AddSubCategoryPage />} />
    <Route path="/admin/subcategories/:id" element={<UpdateSubCategoryPage />} />
    <Route path="/admin/products" element={<ProductPageWrapper />} />
    <Route path="/admin/products/:id" element={<UpdateProductPage />} />
    <Route path="/admin/products/new" element={<AddProductPage />} />
    <Route path="/admin/queries" element={<QueriesPage />} />
    <Route path="/admin/requests/all" element={<RequestsAllPageWrapper />} />
    <Route path="/admin/requests" element={<RequestsPageWrapper />} />
  </>
);

export default userRoutes;
