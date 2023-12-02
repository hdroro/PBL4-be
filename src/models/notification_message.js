const db = require("../config/conectDB");

class NotificationMessages {
  constructor(idConversation, senderId, receiverId, notificationCount) {
    this.idConversation = idConversation;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.notificationCount = notificationCount;
  }

  async checkExist(senderId, idConversation) {
    return new Promise((resolve, reject) => {
      const query = `select * from notification_message where senderId=${senderId} and idConversation = ${idConversation}`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results.length);
      });
    });
  }

  async addInfoNotificationMessage(
    idConversation,
    senderId,
    receiverId,
    notificationCount
  ) {
    if ((await this.checkExist(senderId, idConversation)) > 0) {
      await this.updateNotificationCount(
        senderId,
        receiverId,
        notificationCount
      );
    } else
      return new Promise((resolve, reject) => {
        const query = `INSERT INTO notification_message (idConversation, senderId, receiverId, notificationCount) VALUES (${idConversation}, ${senderId}, ${receiverId}, 1)`;
        db.query(query, (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        });
      });
  }

  async getAllInfoNotification() {
    return new Promise((resolve, reject) => {
      const query = `select * from notification_message`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  async getNotificationByReceiverId(receiverId) {
    return new Promise((resolve, reject) => {
      const query = `select * from notification_message where receiverId = ${receiverId}`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results.length);
      });
    });
  }

  async getInfoNotificationMessage(senderId, receiverId) {
    return new Promise((resolve, reject) => {
      const query = `select notificationCount from notification_message where senderId = ${senderId} and receiverId = ${receiverId}`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0].notificationCount);
      });
    });
  }

  async updateNotificationCount(senderId, receiverId, notificationCount) {
    const countNotificationCurrent = await this.getInfoNotificationMessage(
      senderId,
      receiverId
    );
    return new Promise((resolve, reject) => {
      const query = `UPDATE notification_message SET notificationCount = ${
        countNotificationCurrent + 1
      } where senderId = ${senderId} and receiverId = ${receiverId}`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  //   async getsenderIdInDeleted() {
  //     return new Promise((resolve, reject) => {
  //       const query = `select senderId from deleted`;
  //       db.query(query, (err, results) => {
  //         if (err) {
  //           return reject(err);
  //         }
  //         return resolve(results);
  //       });
  //     });
  //   }

  async deleteInfoNotificationMessage(idConversation, senderId) {
    const existCount = await this.checkExist(senderId, idConversation);

    if (existCount > 0) {
      return new Promise((resolve, reject) => {
        const query =
          "DELETE FROM notification_message WHERE senderId = ? AND idConversation = ?";
        db.query(query, [senderId, idConversation], (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        });
      });
    } else {
      return null;
    }
  }
}

module.exports = NotificationMessages;
