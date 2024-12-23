import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineDownCircle,
  AiOutlineOrderedList,
} from "react-icons/ai";
import useAuth from "@/hooks/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import the avatar components

const userMenuItems = [
  { label: "Profile", link: "/user/profile", icon: <AiOutlineUser /> },
  { label: "Orders", link: "/user/orders", icon: <AiOutlineOrderedList /> },
  // { label: "Settings", link: "/user/settings", icon: <AiOutlineSetting /> },
];

const UserMenu = () => {
  const { user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2">
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
        <small className="text-xs hidden sm:block">Hey, {user?.name?.split(" ")[0]}</small>
        <AiOutlineDownCircle className="ml-1 w-4 h-4 text-gray-500" />{" "}
        {/* Add icon */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] p-2">
        <DropdownMenuLabel>User Menu</DropdownMenuLabel>
        <div className="space-y-2">
          {userMenuItems.map((item, index) => (
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

export default UserMenu;
