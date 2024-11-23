import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
const navigate = useNavigate()
  return (
    <Button variant="secondary" onClick={()=> {logout()
      navigate("/signin")
    }}>
      Logout
    </Button>
  );
};

export default LogoutButton;
