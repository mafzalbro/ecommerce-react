import { Route } from "react-router-dom";
import UserProfile from "../../pages/user/UserProfile";

const userRoutes = (
  <>
    <Route path="/seller" element={<UserProfile />} />
  </>
);

export default userRoutes;
