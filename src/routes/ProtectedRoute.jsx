import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

// Dialog for User role
const UserDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => {
        setIsModalOpen(false);
        window.history.back(); // Redirect to the previous page on modal close
      }}
    >
      <DialogContent className="p-4 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Access Required</DialogTitle>
          <DialogDescription>
            You must be logged in as a user to access this page.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4 flex">
          <Button
            onClick={() => {
              setIsModalOpen(false);
              navigate("/signin"); // Navigate to sign-in page for user login
            }}
            className="mr-2"
          >
            Login as User
          </Button>
          <Button
            onClick={() => {
              setIsModalOpen(false);
              window.history.back(); // Navigate back when Cancel is clicked
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Dialog for Seller role
const SellerDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => {
        setIsModalOpen(false);
        window.history.back(); // Redirect to the previous page on modal close
      }}
    >
      <DialogContent className="p-4 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Seller Access Required</DialogTitle>
          <DialogDescription>
            You must be logged in as a seller to access this page.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4 flex">
          <Button
            onClick={() => {
              setIsModalOpen(false);
              navigate("/signin"); // Navigate to sign-in page for seller login
            }}
            className="mr-2"
          >
            Login as Seller
          </Button>
          <Button
            onClick={() => {
              setIsModalOpen(false);
              window.history.back(); // Navigate back when Cancel is clicked
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Dialog for Admin role
const AdminDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => {
        setIsModalOpen(false);
        window.history.back(); // Redirect to the previous page on modal close
      }}
    >
      <DialogContent className="p-4 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Admin Access Required</DialogTitle>
          <DialogDescription>
            You must be logged in as an admin to access this page.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4 flex">
          <Button
            onClick={() => {
              setIsModalOpen(false);
              navigate("/signin"); // Navigate to sign-in page for admin login
            }}
            className="mr-2"
          >
            Login as Admin
          </Button>
          <Button
            onClick={() => {
              setIsModalOpen(false);
              window.history.back(); // Navigate back when Cancel is clicked
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ProtectedRoute Component which renders the correct dialog based on the user's role
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ role }) => {
  // Check user role and show the corresponding dialog
  if (role === "user") {
    return <UserDialog />;
  } else if (role === "seller") {
    return <SellerDialog />;
  } else if (role === "admin") {
    return <AdminDialog />;
  }
};

export default ProtectedRoute;
