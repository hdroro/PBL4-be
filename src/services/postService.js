const Post = require('../models/post'); 


async function GetPostByIdUser(idAccPost) {
    try {
        const postData = {};
        const postModel = new Post();
        const postCheck = await postModel.getPostByID(idAccPost);
        
        postData.errCode = 0;
        postData.errMessage = 'OK';
        postData.posts = postCheck;
        return postData;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    GetPostByIdUser
};
