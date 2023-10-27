const db = require('../config/conectDB');
const bcrypt = require('bcrypt');


class Account {
    constructor(username, password, fullName, birth, gender, idZodiac) {
        this.username = username;
        this.password = password;
        this.isDelete = 0;
        this.idRole = 1;
        this.fullName = fullName;
        this.birth = birth;
        this.gender = gender;
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
                    }
                    else if (results.length === 0) {
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
            const selectQuery = 'SELECT * FROM user WHERE userName = ?';
            const selectResults = await new Promise((resolve, reject) => {
                db.query(selectQuery, [this.username], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });

            if (selectResults.length === 0) {
                throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
            }

            const hashedPassword = selectResults[0].passWord;
            const passwordMatched = await bcrypt.compare(this.password, hashedPassword);
            if (passwordMatched) {
                return selectResults[0].idRole;
            } else {
                throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
            }
        } catch (error) {
            throw error;
        }
    }


    async getIdAccount() {
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM user WHERE userName = ?`;
            db.query(query, [this.username], (err, results) => {
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

    async save() {
        return new Promise((resolve, reject) => {
            const checkQuery = `SELECT * FROM user WHERE userName = ?`;
            db.query(checkQuery, [this.username], async (checkErr, checkResults) => {
                if (checkErr) {
                    return reject(checkErr);
                }
                if (checkResults.length > 0) {
                    return reject(new Error('Tên tài khoản đã tồn tại'));
                } else {
                    const saltRounds = 10;
                    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
                    var query = `INSERT INTO accounts (userName, passWord, isDelete, idRole) VALUES (?, ?, ?, ?)`;
                    db.query(query, [this.username, hashedPassword, this.isDelete, this.idRole], (insertErr, insertResults) => {
                        if (insertErr) {
                            return reject(insertErr);
                        }
                        return resolve(insertResults.insertId);
                    });
                }
            });
        });
    }



    async match() {
        return new Promise((resolve, reject) => {
            const checkQuery = `SELECT name FROM user INNER JOIN inforcustomer ON idUser = idCustomer WHERE userName = ?`;
            db.query(checkQuery, [this.username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0].name);
            });
        });
    }


    async checkPassword(password) {
        try {
            const selectQuery = 'SELECT * FROM user WHERE userName = ?';
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
                throw new Error('kkkTên đăng nhập hoặc mật khẩu không đúng');
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
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updateQuery = 'UPDATE user SET passWord = ? WHERE userName = ?';
            await new Promise((resolve, reject) => {
                db.query(updateQuery, [hashedPassword, this.username], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async getAllAccount() {
        return new Promise((resolve, reject) => {
            const fetchQuery = `select * FROM user INNER JOIN inforcustomer ON idUser = idCustomer where isDelete = 0`;
            db.query(fetchQuery, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }


    async addAccount(username, password, fullName, date, gender, idZodiac) {
        return new Promise(async (resolve, reject) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const query = `insert into user(idRole, username, password, fullName, birth, gender, idZodiac, numberWarning, isDelete) values(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            db.query(query, [0, username, hashedPassword, fullName, date, gender, idZodiac, 0, 0], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        })
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
        })
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
        })
    }

    async getAdminAcc(username) {
        return new Promise((resolve, reject) => {
            var query = `select * from user where userName = ? and idRole = 1`;
            db.query(query, [username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) return reject(err);
                return resolve(results);
            });
        })
    }

    
}
module.exports = Account;