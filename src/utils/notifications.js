import fetcher from "@/utils/fetcher";
// Function to send notification with email
export const sendNotificationWithEmail = async (notificationData) => {
  try {
    const response = await fetcher.post('/restorex/notification/sendNotificationWithEmail', notificationData);
    return response.data; // Return the response data as needed
  } catch (error) {
    console.error('Error sending notification with email:', error);
    throw error; // Throw error so the caller can handle it
  }
};

// Function to get unread notifications
export const getUnreadNotifications = async (userId) => {
  try {
    const response = await fetcher.get(`/restorex/notification/getUnreadNotification/${userId}`);
    return response.data; // Return the notifications
  } catch (error) {
    console.error('Error fetching unread notifications:', error);
    throw error;
  }
};

// Function to mark a notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await fetcher.put(`/restorex/notification/markNotificationAsRead/${notificationId}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Function to get all notifications (admin only)
export const getAllNotifications = async () => {
  try {
    const response = await fetcher.get('/restorex/notification/getAllNotifications');
    return response.data; // Return the notifications
  } catch (error) {
    console.error('Error fetching all notifications:', error);
    throw error;
  }
};

// Function to delete a notification
export const deleteNotification = async (notificationId) => {
  try {
    const response = await fetcher.delete(`/restorex/notification/deleteNotification/${notificationId}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};
