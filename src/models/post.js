const db = require('../config/conectDB');

class Post {
    constructor(idPost, content, timePost, idAccPost) {
        this.idPost = idPost;
        this.content=content;
        this.timePost = timePost;
        this.idAccPost = idAccPost;
    }

    async getPostByID(idAccPost) {
        return new Promise((resolve, reject) => {
            const query = `select * from post where idAccPost = ${idAccPost}`;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }
}

module.exports = Post;