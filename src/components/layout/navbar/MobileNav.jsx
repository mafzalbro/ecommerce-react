import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/AuthProvider";
import NavigationMenu from "@/components/layout/navbar/NavigationMenu";
import LogoutButton from "@/components/layout/navbar/LogoutButton";
import { BiMenuAltRight } from "react-icons/bi";

const MobileNav = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Toggle drawer menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
      {/* Hamburger Icon for Small Screens */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <button onClick={toggleMenu} className="p-2">
              <BiMenuAltRight size={24} />
            </button>
          </SheetTrigger>

          {/* Mobile Drawer Menu */}
          <SheetContent
            side="left"
            className="w-3/4 p-4 flex flex-col md:hidden"
          >
            <NavigationMenu className="flex flex-col" />
            {/* Show Sign In/Sign Up links for mobile */}
            {!user ? (
              <div className="mt-4 space-y-2">
                <Link to="/signin">
                  <Button variant="outline" fullWidth>
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" fullWidth>
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <LogoutButton onClick={logout} />
            )}
            {/* Close Button */}
            <SheetClose className="absolute top-4 right-4 text-xl"></SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MobileNav;
