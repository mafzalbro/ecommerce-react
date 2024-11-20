import useAuth from "../../hooks/AuthProvider";
import UserProfileCard from "./UserProfileCard";

const UserProfile = () => {
  const { user } = useAuth();
  const { password, ...others } = user;

  return <UserProfileCard initialUserData={others} />;
};

export default UserProfile;
