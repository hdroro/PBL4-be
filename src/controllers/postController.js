import postService from '../services/postService';

const getPostByIDAccPost = async (req, res) => {
    try{
        if (req.query.idAccPost) {
            const idUser = req.query.idAccPost;
            const postData = await postService.GetPostByIdUser(idUser);
            console.log(postData);
            return res.status(200).json({ postData });
        } else {
            return res.status(400).json({ error: 'Không tồn tại ID này' });
        }
    }
    catch(err){

    }
}
const createPostByUser = async(req,res) =>{
    try{
        if (req.body.idAccPost) {
            const idUser = req.body.idAccPost;
            const message = await postService.createPostByUser(idUser,req.body.content);
            console.log(message);
            return res.status(200).json({ message });
        } else {
            return res.status(400).json({ error: 'Không tồn tại ID này' });
        }
    }
    catch(err){    
    }
}

const updatePost = async(req,res) =>{
    try{
        if (req.body.idAccPost) {
            const idUser = req.body.idAccPost;
            const message = await postService.updatePostById(idUser,req.body.idPost,req.body.content);
            console.log(message);
            return res.status(200).json({ message });
        } else {
            return res.status(400).json({ error: 'Không tồn tại ID này' });
        }
    }
    catch(err){}
}
const deletePostById = async(req,res) =>{
    try{
        if (req.body.idAccPost) {
            const idUser = req.body.idAccPost;
            const message = await postService.deletePostId(idUser,req.body.idPost);
            console.log(message);
            return res.status(200).json({ message });
        } else {
            return res.status(400).json({ error: 'Không tồn tại ID này' });
        }
    }
    catch(err){    
    }
}

module.exports = {
    getPostByIDAccPost,
    createPostByUser,
    updatePost,
    deletePostById,
}