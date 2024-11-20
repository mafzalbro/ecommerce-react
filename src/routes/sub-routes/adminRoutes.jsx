import { Route } from "react-router-dom";
import Profile from "../../pages/user/UserProfile";
import DashboardPage from "../../pages/admin/DashboardPage";
import UserManagementPage from "../../pages/admin/UserMangementPage";
import NotificationsPage from "../../pages/admin/NotificationsPage";
import CategoriesPage from "../../pages/admin/CategoriesPage";
import SubCategoriesPage from "../../pages/admin/SubCategoriesPage";
import ProductsPage from "../../pages/admin/ProductsPage";
import QueriesPage from "../../pages/admin/QueriesPage";
import RequestsPage from "../../pages/admin/RequestsPage";

const userRoutes = (
  <>
    <Route path="/admin" element={<DashboardPage />} />
    <Route path="/admin/profile" element={<Profile />} />
    <Route path="/admin/users" element={<UserManagementPage />} />
    <Route path="/admin/notifications" element={<NotificationsPage />} />
    <Route path="/admin/categories" element={<CategoriesPage />} />
    <Route path="/admin/subcategories" element={<SubCategoriesPage />} />
    <Route path="/admin/products" element={<ProductsPage />} />
    <Route path="/admin/queries" element={<QueriesPage />} />
    <Route path="/admin/requests" element={<RequestsPage />} />
  </>
);

export default userRoutes;
