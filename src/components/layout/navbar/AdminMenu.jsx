import { Link } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineAppstore } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

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

// eslint-disable-next-line react/prop-types
const AdminMenu = ({ className }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="text-lg font-medium">
      Admin Panel
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-[200px] p-2">
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

export default AdminMenu;
