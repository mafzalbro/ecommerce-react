import { Link } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineAppstore,
  AiOutlineDownCircle,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineTags,
  AiOutlineFolderOpen,
  AiOutlineShoppingCart,
  AiOutlineQuestionCircle,
  AiOutlineFileText,
  AiOutlineProfile,
} from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../../ui/button";
import useAuth from "@/hooks/AuthProvider";

// Updated admin menu items with new categories and icons
const adminMenuItems = [
  {
    label: "Dashboard",
    link: "/admin",
    icon: <AiOutlineDashboard />,
  },
  {
    label: "Profile",
    link: "/admin/profile",
    icon: <AiOutlineProfile />,
  },
  { label: "Orders", link: "/user/orders", icon: <AiOutlineShoppingCart /> },
  {
    label: "User Management",
    link: "/admin/users",
    icon: <AiOutlineUser />,
  },
  {
    label: "Notifications",
    link: "/admin/notifications",
    icon: <AiOutlineBell />,
  },
  {
    label: "Categories",
    link: "/admin/categories",
    icon: <AiOutlineTags />,
  },
  {
    label: "Sub Categories",
    link: "/admin/subcategories",
    icon: <AiOutlineFolderOpen />,
  },
  {
    label: "Products",
    link: "/admin/products",
    icon: <AiOutlineShoppingCart />,
  },
  {
    label: "Queries",
    link: "/admin/queries",
    icon: <AiOutlineQuestionCircle />,
  },
  {
    label: "Requests",
    link: "/admin/requests",
    icon: <AiOutlineFileText />,
  },
];

const AdminMenu = ({ className }) => {
  const { user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-lg font-medium">
        <div variant="ghost" className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}`}
              alt={user?.name}
            />
            <AvatarFallback>
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <small className="text-xs">Hey, Admin</small>
          <AiOutlineDownCircle className="ml-1 w-4 h-4 text-gray-500" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] p-2">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <div className={`space-y-2 ${className}`}>
          {adminMenuItems.map((item, index) => (
            <DropdownMenuItem key={index}>
              <Link to={item.link} className="flex items-center">
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminMenu;
