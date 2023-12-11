const db = require('../config/conectDB');

class Notification_Matching {
    constructor(idNotificationMatching, idAcc1, idAcc2, timeCreated) {
        this.idNotificationMatching = idNotificationMatching;
        this.idAcc1 = idAcc1;
        this.idAcc2 = idAcc2;
        this.timeCreated = timeCreated;
    }

    async getListNotificationMatching(idAcc1) {
        return new Promise((resolve, reject) => {
            const query = `select * from notification_matching where idAcc1 = ? order by timeCreated desc`;
            db.query(query, [idAcc1], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }

    async save(idAcc1, idAcc2) {
        return new Promise((resolve, reject) => {
            var query = `INSERT INTO notification_matching ( idAcc1, idAcc2, timeCreated, isDeny, isRead) VALUES (?, ?, NOW(), 0, 0)`;
            db.query(query, [idAcc1, idAcc2], (insertErr, insertResults) => {
                if (insertErr) {
                    return reject(insertErr);
                }
                return resolve(insertResults.insertId);
            });
    })
    }

    async setDeny(idNotificationMatching) {
        return new Promise((resolve, reject) => {
            var query = `update notification_matching set isDeny = 1 where idNotificationMatching = ?`;
            db.query(query, [idNotificationMatching], (insertErr, insertResults) => {
                if (insertErr) {
                    return reject(insertErr);
                }
                return resolve(true);
            });
    })
    }

    async setRead(idNotificationMatching) {
        return new Promise((resolve, reject) => {
            var query = `update notification_matching set isRead = 1 where idNotificationMatching = ?`;
            db.query(query, [idNotificationMatching], (insertErr, insertResults) => {
                if (insertErr) {
                    return reject(insertErr);
                }
                return resolve(true);
            });
    })
    }

    async getCountNotRead(idAcc1) {
        return new Promise((resolve, reject) => {
            var query = `select count(*) as count from notification_matching where idAcc1 = ? and isRead = 0`;
            db.query(query, [idAcc1], (insertErr, insertResults) => {
                if (insertErr) {
                    return reject(insertErr);
                }
                return resolve(insertResults);
            });
        })
    }

    async getDetailNotificationMatching(idNotificationMatching, idAcc1, idAcc2) {
        return new Promise((resolve, reject) => {
            var query = `select * from notification_matching where idNotificationMatching = ? and idAcc1 = ? and idAcc2 = ?`;
            db.query(query, [idNotificationMatching, idAcc1, idAcc2], (insertErr, insertResults) => {
                if (insertErr) {
                    return reject(insertErr);
                }
                return resolve(insertResults);
            });
        })
    }
}

module.exports = Notification_Matching;