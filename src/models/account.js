const db = require("../config/conectDB");
const bcrypt = require("bcrypt");

class Account {
  constructor(
    username,
    password,
    idRole,
    fullName,
    birth,
    gender,
    bio,
    idZodiac
  ) {
    this.username = username;
    this.password = password;
    this.idRole = idRole;
    this.isDelete = 0;
    this.fullName = fullName;
    this.birth = birth;
    this.gender = gender;
    this.bio = bio;
    this.idZodiac = idZodiac;
  }

  async checkUsername() {
    return await new Promise((resolve, reject) => {
      console.log(this.username);
      var query = `SELECT * FROM user WHERE userName = ? and isDelete = 0`;
      try {
        db.query(query, [this.username], (err, results) => {
          if (err) {
            return reject(err);
          } else if (results.length === 0) {
            return resolve(false);
          }
          return resolve(results);
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  async authenticate() {
    try {
      const selectQuery = "SELECT * FROM user WHERE userName = ?";
      const selectResults = await new Promise((resolve, reject) => {
        db.query(selectQuery, [this.username], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });

      if (selectResults.length === 0) {
        throw new Error("Tên đăng nhập hoặc mật khẩu không đúng");
      }

      const hashedPassword = selectResults[0].passWord;
      const passwordMatched = await bcrypt.compare(
        this.password,
        hashedPassword
      );
      if (passwordMatched) {
        return selectResults[0].idRole;
      } else {
        throw new Error("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    } catch (error) {
      throw error;
    }
  }

  async getIdAccount() {
    return new Promise((resolve, reject) => {
      var query = `SELECT * FROM user WHERE userName = ?`;
      db.query(query, [this.username], (err, results) => {
        console.log("ahahah query", query);
        if (err) {
          return reject(err);
        }
        if (results.length === 0) {
          return reject(err);
        }
        return resolve(results[0].idUser);
      });
    });
  }

  async checkPassword(password) {
    try {
      const selectQuery = "SELECT * FROM user WHERE userName = ?";
      const selectResults = await new Promise((resolve, reject) => {
        db.query(selectQuery, [this.username], (err, results) => {
          if (err) {
            return reject(err);
          }
          console.log(results);
          resolve(results);
        });
      });

      if (selectResults.length === 0) {
        throw new Error("kkkTên đăng nhập hoặc mật khẩu không đúng");
      }

      const hashedPassword = selectResults[0].password;
      const passwordMatched = await bcrypt.compare(password, hashedPassword);

      console.log(passwordMatched);
      if (passwordMatched) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(newPassword) {
    // try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateQuery = "UPDATE user SET passWord = ? WHERE userName = ?";
    return new Promise((resolve, reject) => {
      db.query(updateQuery, [hashedPassword, this.username], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      });
    });
    // } catch (error) {
    //     throw error;
    // }
  }

  async addAccount(
    username,
    password,
    fullName,
    date,
    gender,
    idZodiac,
    timeRegister
  ) {
    return new Promise(async (resolve, reject) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `insert into user(idRole, username, password, fullName, birth, gender, idZodiac, numberWarning, isDelete, timeRegister) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      db.query(
        query,
        [
          0,
          username,
          hashedPassword,
          fullName,
          date,
          gender,
          idZodiac,
          0,
          0,
          timeRegister,
        ],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        }
      );
    });
  }

  async editAccount(id, username, name, bio, birthday, gender, idZodiac) {
    return new Promise(async (resolve, reject) => {
      const query = `update user set fullName = ?, bio = ?, birth =?, gender = ?, idZodiac = ? where idUser = ? and idRole = 0`;
      db.query(
        query,
        [name, bio, birthday, gender, idZodiac, id],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        }
      );
    });
  }

  async editAccountBrief(username, name, bio) {
    return new Promise(async (resolve, reject) => {
      const query = `update user set fullName = ?, bio = ? where username = ? and idRole = 0`;
      db.query(query, [name, bio, username], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      });
    });
  }

  async deleteAccount(username) {
    return new Promise((resolve, reject) => {
      var query = `UPDATE user SET isDelete = 1 WHERE userName = ?`;
      db.query(query, [username], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  async deleteAccountByAdmin(idUser) {
    return new Promise((resolve, reject) => {
      var query = `UPDATE user SET isDelete = 1 WHERE idUser = ?`;
      db.query(query, [idUser], (err, results) => {
        if (err)
          return reject({
            errCode: 2,
            errMessage: "Xuat hien loi",
          });
        else return resolve();
      });
    });
  }

  async getCusAcc(username) {
    return new Promise((resolve, reject) => {
      var query = `select * from user where userName = ? and idRole = 0`;
      db.query(query, [username], (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length === 0) return reject(err);
        return resolve(results);
      });
    });
  }

  async getCusByID(id) {
    console.log("id " + id);
    return new Promise((resolve, reject) => {
      var query = `select * from user where idUser = ? and idRole = 0`;
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length === 0) return reject(err);
        return resolve(results);
      });
    });
  }

  async getAdminAcc(username) {
    return new Promise((resolve, reject) => {
      var query = `select * from user where userName = ? and idRole = 1`;
      db.query(query, [username], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results.length);
      });
    });
  }

  async getUserBySearch(idAcc, userSearch) {
    return new Promise((resolve, reject) => {
      const query = `
            select * from user where idUser in
            (select idAcc2 from conversation as cv 
            join user as us on cv.idAcc1 = us.idUser where cv.idAcc1 = ${idAcc} and us.idRole=0 and us.isDelete = 0 and cv.idAcc2 in
            (select idUser from user where userName like '%${userSearch}%' and idRole=0 and isDelete=0) and cv.idConversation not in
            (select idConversation from conversation where isBlocked = 1)
            union
            select idAcc1 from conversation as cv 
            join user as us on cv.idAcc2 = us.idUser where cv.idAcc2 = ${idAcc} and us.idRole=0 and us.isDelete=0 and cv.idAcc1 in
            (select idUser from user where userName like '%${userSearch}%' and idRole=0 and isDelete=0) and cv.idConversation not in
            (select idConversation from conversation where isBlocked = 1))`;
      console.log(query);
      db.query(query, (err, results) => {
        if (err)
          return reject({
            errCode: 2,
            errMessage: "Xuất hiện lỗi",
          });
        else if (results.length == 0) {
          return reject({
            errCode: 1,
            errMessage: "Không tìm thấy người phù hợp",
          });
        } else return resolve(results);
      });
    });
  }

  async getListUser() {
    return new Promise((resolve, reject) => {
      var query = `select * from user where idRole = 0 and isDelete = 0`;
      db.query(query, (err, results) => {
        if (err) {
          return reject({
            errCode: 2,
            errMessage: "Xuất hiện lỗi truy vấn",
          });
        } else return resolve(results);
      });
    });
  }

  async AddWarningPost(idPost) {
    return new Promise((resolve, reject) => {
      var query = `update user as us join post as p on p.idAccPost = us.idUser set us.numberWarning = us.numberWarning+1 where p.idPost = ${idPost}`;
      db.query(query, (err) => {
        if (err) {
          return reject({
            errCode: 2,
            errMessage: "Xuất hiện lỗi truy vấn AddWarningPost",
          });
        } else return resolve();
      });
    });
  }

  async getListAccReported() {
    return new Promise((resolve, reject) => {
      var query = `select * from user where numberWarning >= 3`;
      db.query(query, (err, results) => {
        if (err) {
          return reject({
            errCode: 2,
            errMessage: "Xuất hiện lỗi truy vấn getListAccReported",
          });
        } else return resolve(results);
      });
    });
  }

  async getListUserByIdZodiac(idZodiac) {
    return new Promise((resolve, reject) => {
      var query = `select idUser from user where idZodiac = ${idZodiac}`;
      db.query(query, (err, results) => {
        if (err) {
          return reject({
            errCode: 2,
            errMessage: "Xuất hiện lỗi truy vấn getListUserByIdZodiac",
          });
        } else return resolve(results);
      });
    });
  }

  async getListIdZodiacByIdUser(idUser) {
    return new Promise((resolve, reject) => {
      var query = `select idZodiac from user where idUser = ${idUser}`;
      db.query(query, (err, results) => {
        if (err) {
          return reject({
            errCode: 2,
            errMessage: "Xuất hiện lỗi truy vấn getListZodiacByIdUser",
          });
        } else return resolve(results[0]);
      });
    });
  }
}
module.exports = Account;
