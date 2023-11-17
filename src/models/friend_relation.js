const db = require('../config/conectDB');

class Friend_Relation {
    constructor(idRelation, idAcc1, idAcc2, isBlocked) {
        this.idRelation = idRelation;
        this.idAcc1 = idAcc1;
        this.idAcc2 = idAcc2;
        this.isBlocked = isBlocked;
    }

    async checkFriendRelation(idAcc1, idAcc2) {
        return new Promise((resolve, reject) => {
            const query = `select * from friend_relation where (idAcc1 = ? and idAcc2 = ?) or (idAcc1 = ? and idAcc2 = ?)`;
            db.query(query, [idAcc1, idAcc2, idAcc2, idAcc1], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if(results.length === 0) return resolve(false);
                return resolve(true);
            });
        })
    }

    async save(idAcc1, idAcc2){
        return new Promise((resolve, reject) => {
            var query = `INSERT INTO friend_relation ( idAcc1, idAcc2, isBlocked) VALUES (?, ?, ?)`;
            db.query(query, [idAcc1, idAcc2, 0], (insertErr, insertResults) => {
                if (insertErr) {
                    return reject(insertErr);
                }
                return resolve(insertResults.insertId);
            });
        })
    }
}

module.exports = Friend_Relation;