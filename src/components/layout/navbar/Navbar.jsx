import { Link } from "react-router-dom";
import useAuth from "@/hooks/AuthProvider";
import { Button } from "@/components/ui/button";
import { getMeta } from "@/utils/data";
import NavigationMenu from "@/components/layout/navbar/NavigationMenu";
import LogoutButton from "@/components/layout/navbar/LogoutButton";
import MobileNav from "@/components/layout/navbar/MobileNav";
import CartIcon from "../../../pages/user/cartIcon";
const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="px-4">
      <div className="flex justify-between items-center">
        <Link to={"/"}>
          {/* <h1 className="text-2xl font-bold">{getMeta().title}</h1> */}
          <img src="/logo.png" alt={getMeta().title} className="w-20" style={{textShadow: "1px 2px 20px white"}}/>
        </Link>

        {/* Desktop View */}
        <div className="hidden md:block">
          <NavigationMenu />
        </div>

        {/* Show Sign In/Sign Up links if the user is not logged in (Desktop) */}
        <div className="flex gap-2">
          {!isAuthenticated ? (
            <div className="hidden md:flex space-x-4">
              <Link to="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <LogoutButton onClick={logout} />
          )}
          <CartIcon />
        </div>
        {/* Mobile Nav */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
