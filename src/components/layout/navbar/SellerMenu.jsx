import { Link } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineAppstore,
  AiOutlineDownCircle,
} from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import the avatar components
import useAuth from "../../../hooks/AuthProvider";

const sellerMenuItems = [
  {
    label: "Seller Dashboard",
    link: "/seller",
    icon: <AiOutlineDashboard />,
  },
  {
    label: "Product Management",
    link: "/seller/products",
    icon: <AiOutlineAppstore />,
  },
];

// eslint-disable-next-line react/prop-types
const SellerMenu = ({ className }) => {
  const { user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-lg font-medium flex items-center space-x-2">
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
        <small className="text-xs hidden sm:block">
          Hey, Seller
        </small>
        <AiOutlineDownCircle className="ml-1 w-4 h-4 text-gray-500" />{" "}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] p-2">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <div className={`space-y-2 ${className}`}>
          {sellerMenuItems.map((item, index) => (
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

export default SellerMenu;
