const Notification = require('../models/Notification');

// Get notifications for a specific user (based on their userId)
exports.getNotifications = async (req, res) => {
    try {
        // Assuming user ID is available from the request (JWT token, for example)
        const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications' });
    }
};

// (Optional) Create a notification (for example, when a task is assigned to the user)
exports.createNotification = async (req, res) => {
    const { userId, message, type } = req.body;
    try {
        const notification = new Notification({ userId, message, type });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error creating notification' });
    }
};

// (Optional) Mark a notification as read
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error marking notification as read' });
    }
};
