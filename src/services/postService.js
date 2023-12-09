const { Model } = require('sequelize');
const MyDate = require('../models/mydate');
const Post = require('../models/post'); 


async function GetPostByIdUser(idAccPost) {
    try {
        const postData = {};
        const postModel = new Post();
        const postCheck = await postModel.getPostByIDAccPost(idAccPost);
        postData.errCode = 0;
        postData.errMessage = 'OK';
        postData.posts = postCheck;
        return postData;
    } catch (e) {
        throw e;
    }
}
async function createPostByUser(idAccPost, content){
    try {
        if (!content) return {errCode:4, errMessage: "Các tham số truyền vào thiếu"};
        const postModel = new Post();
        let timePost = new MyDate();
        let timePost_change = timePost.toDate() + " " + timePost.toLocaleTimeString();
        const message = await postModel.createPostByUser(idAccPost,content,timePost_change);
        return message;
    } catch (err) {
        return err;
    }
}

async function deletePostId(idAccPost, idPost){
    try{
        if (!idPost) return {errCode:4, errMessage: "Các tham số truyền vào thiếu"};
        const postModel = new Post();
        await postModel.getPostByID(idAccPost,idPost);
        const message = await postModel.DeletePostByID(idPost);
        return message;
    }
    catch(err){
        return err;
    }
}

async function getInfoPost(idAccPost, idPost){
    try{
        if (!idPost) return {errCode:4, errMessage: "Các tham số truyền vào thiếu"};
        const postModel = new Post();
        const postInfo = await postModel.getPostByID(idAccPost,idPost);
        return postInfo;
    }
    catch(err){
        return err;
    }
}


async function updatePostById(idAccPost, idPost, content){
    try{
        if (!idPost || !content) return {errCode:4, errMessage: "Các tham số truyền vào thiếu"};
        const postModel = new Post();
        let timeUpdate = new MyDate();
        let timeUpdate_change = timeUpdate.toDate() + " " + timeUpdate.toLocaleTimeString();
        await postModel.getPostByID(idAccPost,idPost);
        const message = await postModel.updatePostById(idPost,content,timeUpdate_change);
        return message;
    }
    catch(err){
        return err;
    }
}

async function getDetailPostReported(idPost){
    try{
        if (!idPost) return {errCode:3, errMessage: "Các tham số truyền vào thiếu"};
        const postModel = new Post();
        const postInfo = await postModel.getDetailPostReported(idPost);
        return {
            errCode: 0,
            errMessage: 'OK',
            post: postInfo
        }
    }
    catch(err){
        throw err;
    }
}


module.exports = {
    GetPostByIdUser,
    createPostByUser,
    deletePostId,
    getInfoPost,
    updatePostById,
    getDetailPostReported
};
