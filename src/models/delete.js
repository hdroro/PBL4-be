const db = require("../config/conectDB");

class Delete {
  constructor(idDelete, idDeleted, idConversation) {
    this.idDelete = idDelete;
    this.idDeleted = idDeleted;
    this.idConversation = idConversation;
  }

  async checkExist(idDelete, idDeleted) {
    console.log("checkkkk");
    return new Promise((resolve, reject) => {
      const query = `select * from deleted where idDelete=${idDelete} and idDeleted = ${idDeleted}`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results.length);
      });
    });
  }

  async addInfoDelete(idDelete, idDeleted, idConversation, deleteAtId) {
    if ((await this.checkExist(idDelete, idDeleted)) > 0) {
      console.log("hahaha");
      await this.updateIdDeleteAt(idDelete, idDeleted, deleteAtId);
    } else
      return new Promise((resolve, reject) => {
        const query = `INSERT INTO deleted (idDelete, idDeleted, idConversation, deleteAtId) VALUES (${idDelete}, ${idDeleted}, ${idConversation}, ${deleteAtId})`;
        db.query(query, (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        });
      });
  }

  async updateIdDeleteAt(idDelete, idDeleted, deleteAtId) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE deleted SET deleteAtId = ${deleteAtId} where idDelete = ${idDelete} and idDeleted = ${idDeleted}`;
      console.log(query);
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  async getInfoDelete(idConversation) {
    return new Promise((resolve, reject) => {
      const query = `select idDelete, idDeleted, deleteAtId from deleted where idConversation = ${idConversation}`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  async getIdConversationInDeleted() {
    return new Promise((resolve, reject) => {
      const query = `select idConversation from deleted`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  async deleteInfoDelete(idDelete, idDeleted) {
    return new Promise((resolve, reject) => {
      const query = `delete from deleted where idDelete = ${idDelete} and idDeleted = ${idDeleted}`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }
}

module.exports = Delete;
