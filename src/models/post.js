const { resolve } = require('path');
const db = require('../config/conectDB');
const { rejects } = require('assert');
const { error } = require('console');

class Post {
    constructor(idPost, content, timePost, idAccPost) {
        this.idPost = idPost;
        this.content=content;
        this.timePost = timePost;
        this.idAccPost = idAccPost;
    }

    async getPostByIDAccPost(idAccPost) {
        return new Promise((resolve, reject) => {
            const query = `select * from post where idAccPost = ${idAccPost} and isDelete = 0 order by timePost DESC`;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else return resolve(results);
            });
        })
    }
    async getPostByID(idAccPost,idPost){
        console.log("idAccPost " + idAccPost + "idPost " + idPost);
        return new Promise((resolve,reject)=>{
            const query = `select * from post where idAccPost = ${idAccPost} and idPost = ${idPost} and isDelete = 0`;
            db.query(query, (err,results)=>{
                if (err) return reject({
                    errCode: 2,
                    errMessage: "Xuat hien loi",
                });
                else if (results.length == 1) return resolve(results[0]);
                else return reject({
                    errCode: 1,
                    errMessage: "Post không tồn tại",
                });
            })
        })
    }
    async createPostByUser(idAccPost, content, timePost){
        return new Promise((resolve,reject)=>{
            const query = `insert into post (content, timePost, idAccPost, isDelete, updatedAt) values ('${content}','${timePost}',${idAccPost},0,'${timePost}')`;
            db.query(query, (err)=>{
                if(err){
                    return reject({
                        errCode: 1,
                        message: "Loi",
                    });
                }
                return resolve({
                    errCode: 0,
                    message: "OK",
                });
            })
        })
    }
    async DeletePostByID(idPost){
        return new Promise( async (resolve,reject)=>{
            const query = `update post set isDelete = 1 where idPost = ${idPost}`;
            db.query(query, (err)=>{
                if(err){
                    return reject({
                        errCode: 3,
                        message: "Loi",
                    });
                }
                return resolve({
                    errCode: 0,
                    message: "OK",
                });
            })
        })
    }
    async updatePostById(idPost, content, timeUpdate){
        return new Promise( async (resolve,reject)=>{
            const query = `update post set content = '${content}', updatedAt = '${timeUpdate}' where idPost = ${idPost}`;
            db.query(query, (err)=>{
                if(err){
                    return reject({
                        errCode: 3,
                        message: "Loi",
                    });
                }
                return resolve({
                    errCode: 0,
                    message: "OK",
                });
            })
        });
    }

}

module.exports = Post;