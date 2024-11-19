import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/AuthProvider";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button variant="outline" onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
