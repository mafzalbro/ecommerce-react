import useAuth from "../../hooks/AuthProvider";
import UserProfileCard from "./UserProfileCard";

const UserProfile = () => {
  const { user } = useAuth();
  return <UserProfileCard initialUserData={user} />;
};

export default UserProfile;
