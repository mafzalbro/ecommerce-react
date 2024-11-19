import { Link } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
import { Button } from "../../ui/button";

// const productCategories = [
//   { label: "Products", link: "/products", icon: <AiOutlineAppstore /> },
//   { label: "Categories", link: "/categories", icon: <AiOutlineAppstore /> },
//   {
//     label: "Subcategories",
//     link: "/subcategories",
//     icon: <AiOutlineAppstore />,
//   },
// ];

// eslint-disable-next-line react/prop-types
const ProductCategories = () => {
  return (
    <Link to={"/products"}>
      <Button variant="outline" className="flex items-center">
        <AiOutlineProduct /> Products
      </Button>
    </Link>
  );
};
// <DropdownMenu>
{
  /* <DropdownMenuTrigger asChild> */
}
//   </DropdownMenuTrigger>
//   <DropdownMenuContent className="w-56">
//     <DropdownMenuLabel>Product Categories</DropdownMenuLabel>
//     <DropdownMenuSeparator />
//     {productCategories.map((item, index) => (
//       <DropdownMenuItem key={index}>
//         <Link
//           to={item.link}
//           className="flex items-center hover:text-gray-300 w-full"
//         >
//           {item.icon}
//           <span className="ml-2">{item.label}</span>
//         </Link>
//       </DropdownMenuItem>
//     ))}
//   </DropdownMenuContent>
// </DropdownMenu>
//   );
// };

export default ProductCategories;
