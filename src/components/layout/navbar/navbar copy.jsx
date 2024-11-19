import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  AiOutlineHome,
  AiOutlineDashboard,
  AiOutlineAppstore,
} from "react-icons/ai";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const { user, role, logout } = useAuth();

  // Menu items based on roles
  const adminMenuItems = [
    {
      label: "Dashboard",
      link: "/admin/dashboard",
      icon: <AiOutlineDashboard />,
    },
    {
      label: "User Management",
      link: "/admin/users",
      icon: <AiOutlineAppstore />,
    },
    { label: "Settings", link: "/admin/settings", icon: <AiOutlineAppstore /> },
  ];

  const sellerMenuItems = [
    {
      label: "Seller Dashboard",
      link: "/seller/dashboard",
      icon: <AiOutlineDashboard />,
    },
    {
      label: "Product Management",
      link: "/seller/products",
      icon: <AiOutlineAppstore />,
    },
  ];

  const userMenuItems = [
    { label: "Profile", link: "/user/profile", icon: <AiOutlineAppstore /> },
    { label: "Orders", link: "/user/orders", icon: <AiOutlineAppstore /> },
    { label: "Settings", link: "/user/settings", icon: <AiOutlineAppstore /> },
  ];

  const productCategories = [
    { label: "Products", link: "/products", icon: <AiOutlineAppstore /> },
    { label: "Categories", link: "/categories", icon: <AiOutlineAppstore /> },
    {
      label: "Subcategories",
      link: "/subcategories",
      icon: <AiOutlineAppstore />,
    },
  ];

  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Product</h1>
        <NavigationMenu>
          <NavigationMenuList>
            {/* Home Link */}
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className="flex items-center hover:text-gray-300">
                  <AiOutlineHome className="mr-2" /> Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Show Product Categories for All Roles */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="p-4 w-[20vw] text-center">
                  {productCategories.map((item, index) => (
                    <li key={index} className="py-1">
                      <Link to={item.link}>
                        <NavigationMenuLink className="flex items-center hover:text-gray-300 w-full block">
                          {item.icon} <span className="ml-2">{item.label}</span>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Role-Specific Menus */}
            {role === "admin" && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>Admin Panel</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-4 w-[20vw] text-center">
                    {adminMenuItems.map((item, index) => (
                      <li key={index} className="py-1">
                        <Link to={item.link}>
                          <NavigationMenuLink className="flex items-center hover:text-gray-300 w-full block">
                            {item.icon}{" "}
                            <span className="ml-2">{item.label}</span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}

            {role === "seller" && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>Seller Dashboard</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-4 w-[20vw] text-center">
                    {sellerMenuItems.map((item, index) => (
                      <li key={index} className="py-1">
                        <Link to={item.link}>
                          <NavigationMenuLink className="flex items-center hover:text-gray-300 w-fullk">
                            {item.icon}{" "}
                            <span className="ml-2">{item.label}</span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}

            {role === "user" && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>User Menu</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-4 w-[20vw] text-center">
                    {userMenuItems.map((item, index) => (
                      <li key={index} className="py-1">
                        <Link to={item.link}>
                          <NavigationMenuLink className="flex items-center hover:text-gray-300 w-full block">
                            {item.icon}{" "}
                            <span className="ml-2">{item.label}</span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
          <NavigationMenuIndicator />
          <NavigationMenuViewport />
        </NavigationMenu>

        {/* Logout Button */}
        {user && (
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
