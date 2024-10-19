const notifications = require('../models/Notifications');

// Fetch notifications for a specific user
exports.getNotifications = (req, res) => {
  const userId = req.user.userId;  
  const userNotifications = notifications.filter(n => n.userId === userId);
  console.log("User ID: " + userId);
  res.json(userNotifications);
};

// Allows notifications to be left at read to let user know if they have seen it already
exports.markAsRead = (req, res) => {
  const notificationId = req.params.id;
  const notification = notifications.find(n => n.id == notificationId);
  
  if (notification) {
    notification.isRead = true;
    res.json(notification);
  } else {
    res.status(404).json({ message: 'Notification not found' });
  }
};
