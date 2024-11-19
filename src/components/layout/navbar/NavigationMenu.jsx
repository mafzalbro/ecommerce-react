import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ProductCategories from "./ProductCategories";
import AdminMenu from "./AdminMenu";
import SellerMenu from "./SellerMenu";
import UserMenu from "./UserMenu";
import useAuth from "@/hooks/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

// eslint-disable-next-line react/prop-types
const NavigationMenuWrapper = ({ className }) => {
  const { role } = useAuth();

  return (
    <NavigationMenu>
      <NavigationMenuList className={className + " flex gap-4"}>
        {/* Home Link */}
        <NavigationMenuItem>
          <NavigationMenuLink className="flex items-center hover:text-gray-300">
            <Button variant="outline" className="flex items-center">
              <Link to={"/"}>Home</Link>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Product Categories */}
        <ProductCategories className={className} />

        {/* Role-Specific Menus */}
        {role === "admin" && <AdminMenu className={className} />}
        {role === "seller" && <SellerMenu className={className} />}
        {role === "user" && <UserMenu className={className} />}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuWrapper;
