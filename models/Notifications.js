// got rid of the mongoDB stuff since we don't need it for this assignment
/*
class Notification {
    constructor(id, userId, message, type, isRead) {
      this.id = id;
      this.userId = userId;
      this.message = message;
      this.type = type;  // 'event', 'reminder', 'update'
      this.isRead = isRead || false;  // default to unread
    }
  }
*/  
// Hard code data for now
const notifications = [
    { id: 1, userId: 1, message: 'You have been assigned to the Hackathon.', type: 'event', isRead: true, createdAt: new Date('2024-09-01') },
    { id: 2, userId: 1, message: 'The Hackathon has been rescheduled.', type: 'update', isRead: false, createdAt: new Date('2024-09-10') },
    { id: 3, userId: 2, message: 'Reminder: Hackathon is tomorrow.', type: 'reminder', isRead: false, createdAt: new Date('2024-09-20') }
  ];


  module.exports = notifications;
  