import { Link } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineAppstore } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

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
const SellerMenu = ({ className }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="text-lg font-medium">
      Seller Dashboard
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-[200px] p-2">
      <DropdownMenuLabel>Menu</DropdownMenuLabel>
      <div className={`space-y-2 ${className}`}>
        {sellerMenuItems.map((item, index) => (
          <DropdownMenuItem key={index}>
            <Link
              to={item.link}
              className="flex items-center"
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default SellerMenu;
