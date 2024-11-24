import { ModeToggle } from "@/components/theme/mode-toggle";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <footer className="border-t py-3 text-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Navigation Links */}
        <ul className="flex space-x-4 text-gray-600 dark:text-gray-400">
          {footerLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.link}
                className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Dark Mode Toggle */}
        {/* <ModeToggle /> */}

        {/* Copyright */}
        <p className="mt-2 md:mt-0 text-gray-500 dark:text-gray-400">
          <span className="font-medium">Rstorex</span>
          &copy; {new Date().getFullYear()}{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
