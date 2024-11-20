import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";

export function NetworkErrorDialog() {
  const [isOpen, setIsOpen] = useState(!navigator.onLine);
  const [notification, setNotification] = useState(""); // Controls notification strip

  useEffect(() => {
    const handleOnline = () => {
      setIsOpen(false);
      setNotification("online"); // Show "Back online" notification
      setTimeout(() => setNotification(""), 3000); // Hide after 3 seconds
    };

    const handleOffline = () => {
      setIsOpen(true);
      setNotification("offline"); // Show "You are offline" notification
      setTimeout(() => setNotification(""), 3000); // Hide after 3 seconds
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {/* Notification Strip */}
      {notification === "offline" && (
        <div className="fixed bottom-0 left-0 w-full bg-red-500 text-white text-center z-50">
          You are offline.
        </div>
      )}
      {notification === "online" && (
        <div className="fixed bottom-0 left-0 w-full bg-green-500 text-white text-center z-50">
          Back online.
        </div>
      )}

      {/* Dialog for Detailed Network Error */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen} className="rounded-sm">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Network Error</AlertDialogTitle>
            <AlertDialogDescription>
              You are offline. Please check your connection and try again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsOpen(false)}>
              Retry
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
