const Notification = require('../models/Notifications');

// Hardcoded notifications (for now)
const notifications = [
  { id: 1, userId: 1, message: 'You have been assigned to the Hackathon.', type: 'event', isRead: false, createdAt: new Date('2024-09-01') },
  { id: 2, userId: 1, message: 'The Hackathon has been rescheduled.', type: 'update', isRead: false, createdAt: new Date('2024-09-10') },
  { id: 3, userId: 2, message: 'Reminder: Hackathon is tomorrow.', type: 'reminder', isRead: false, createdAt: new Date('2024-09-20') }
];


// Fetch notifications for a specific user
exports.getNotifications = (req, res) => {
  const userId = 1;  // Hardcoded for now
  const userNotifications = notifications.filter(n => n.userId === userId);
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
