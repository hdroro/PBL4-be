import postService from '../services/postService';

const getPostByID = async (req, res) => {
    if (req.query.idAccPost) {
        const idUser = req.query.idAccPost;
        const postData = await postService.GetPostByIdUser(idUser);
        console.log(postData);
        return res.status(200).json({ postData });
    } else {
        return res.status(400).json({ error: 'Không tồn tại ID này' });
    }
}

module.exports = {
    getPostByID
}