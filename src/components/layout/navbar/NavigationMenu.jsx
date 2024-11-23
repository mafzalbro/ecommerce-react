import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ProductCategories from "./ProductCategories";
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
          <div className="flex items-center hover:text-gray-300">
            <Button variant="outline" className="flex items-center">
              <Link
                to={`${
                  role === "admin"
                    ? "/admin"
                    : role === "seller"
                    ? "/seller"
                    : "/"
                }`}
              >
                Home
              </Link>
            </Button>
          </div>
        </NavigationMenuItem>

        {/* Product Categories */}
        <ProductCategories className={className} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuWrapper;
