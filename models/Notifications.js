// got rid of the mongoDB stuff since we don't need it for this assignment
class Notification {
    constructor(id, userId, message, type, isRead) {
      this.id = id;
      this.userId = userId;
      this.message = message;
      this.type = type;  // 'event', 'reminder', 'update'
      this.isRead = isRead || false;  // default to unread
    }
  }
  
  module.exports = Notification;
  