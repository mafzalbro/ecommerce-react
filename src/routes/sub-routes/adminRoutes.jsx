import { Route } from "react-router-dom";
import AdminDashboard from "../../pages/user/UserProfile";

const userRoutes = (
  <>
    <Route path="/admin" element={<AdminDashboard />} />
  </>
);

export default userRoutes;
