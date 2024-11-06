const Notification = require('../models/Notifications');

// Function to get all notifications for a specific user
const getNotifications = async (req, res) => {
  const userId = req.user.userId; 

  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

// Function to mark a notification as read
const markAsRead = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification' });
  }
};

// Function to create a new notification
const createNotification = async (userId, message) => {
  try {
    const notification = new Notification({ userId, message });
    await notification.save();
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

// Exporting the functions to be used in routes
module.exports = {
  getNotifications,
  markAsRead,
  createNotification
};