import { ModeToggle } from "@/components/theme/mode-toggle";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <footer className="flex bg-gray-900 p-4 mt-8">
      <div className="container text-secondary dark:text-secondary-foreground mx-auto text-center">
        <ul className="flex justify-center space-x-4">
          {footerLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.link} className="hover:text-gray-300">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4">&copy; 2024 My Product. All rights reserved.</p>
      </div>
      <ModeToggle />
    </footer>
  );
};

export default Footer;
