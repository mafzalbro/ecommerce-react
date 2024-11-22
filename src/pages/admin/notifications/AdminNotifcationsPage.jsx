import { useEffect, useState } from "react";
import {
  getAllNotifications,
  markNotificationAsRead,
  sendNotificationWithEmail,
} from "@/utils/notifications";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import useAuth from "../../../hooks/AuthProvider";

const AdminNotificationsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    recipientId: user._id,
    recipientEmail: "",
    subject: "",
    message: "",
  });

  const { toast } = useToast();

  // Fetch all notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await getAllNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast({
          title: "Error",
          description: "Failed to fetch notifications",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
      );
      toast({ title: "Success", description: "Notification marked as read" });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive",
      });
    }
  };

  // Send notification
  const handleSendNotification = async () => {
    try {
      setSending(true);
      await sendNotificationWithEmail(form);
      toast({
        title: "Success",
        description: "Notification sent successfully",
      });
      setForm({ recipientEmail: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending notification:", error);
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Admin Notifications</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Send Notification</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Send Notification</DialogTitle>
              <DialogDescription>
                Fill out the form to send a new notification. Click send when
                you're ready.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={form.recipientEmail}
                  onChange={(e) =>
                    setForm({ ...form, recipientEmail: e.target.value })
                  }
                  placeholder="Recipient's Email"
                  className=""
                />
              </div>
              <div className="items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  placeholder="Subject"
                  className=""
                />
              </div>
              <div className="items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Message
                </Label>
                <Input
                  id="message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Message"
                  className=""
                />
              </div>
            </div>
            <DialogFooter>
              <Button disabled={sending} onClick={handleSendNotification}>
                {sending ? "Sending..." : "Send Notification"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Recipient</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow key={notification._id}>
              <TableCell>{notification.recipient}</TableCell>
              <TableCell>{notification.message}</TableCell>
              <TableCell>{notification.type}</TableCell>
              <TableCell>
                {notification.read ? (
                  <span className="text-green-500">Read</span>
                ) : (
                  <span className="text-red-500">Unread</span>
                )}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  onClick={() => handleMarkAsRead(notification._id)}
                  disabled={notification.read}
                >
                  Mark as Read
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminNotificationsPage;
