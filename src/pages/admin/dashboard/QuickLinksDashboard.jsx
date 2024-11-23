import React from "react";
import {
  AiOutlineDashboard,
  AiOutlineProfile,
  AiOutlineUser,
  AiOutlineBell,
  AiOutlineTags,
  AiOutlineFolderOpen,
  AiOutlineShoppingCart,
  AiOutlineQuestionCircle,
  AiOutlineFileText,
} from "react-icons/ai";
import { Link } from "react-router-dom";

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
  // {
  //   label: "Queries",
  //   link: "/admin/queries",
  //   icon: <AiOutlineQuestionCircle />,
  // },
  {
    label: "Requests",
    link: "/admin/requests",
    icon: <AiOutlineFileText />,
  },
];

export const QuickLinksDashboard = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Title and Description */}
      <div className="text-center my-4">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Quick access to key functionalities of the admin panel.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {adminMenuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="group relative flex flex-col items-center p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-white hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-500 ease-in-out transform hover:scale-105"
          >
            <div className="text-3xl text-blue-500 dark:text-blue-400 group-hover:text-blue-600 group-hover:scale-110 transition duration-300 ease-in-out">
              {item.icon}
            </div>
            <span className="mt-3 text-sm font-medium group-hover:text-gray-800 dark:group-hover:text-gray-200 transition duration-300 ease-in-out">
              {item.label}
            </span>

            {/* Hover effect tooltip */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-lg transition-opacity duration-300 ease-in-out"></div>
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 text-sm text-white transition-opacity duration-300 ease-in-out">
              {item.label} Details
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
