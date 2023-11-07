import deleteService from '../services/deleteService';

const postDeleteInfo = async (req, res) => {
    if (req.body.idDelete && req.body.idDeleted && req.body.idConversation) {
        const deleteDataInfo = await deleteService.handleAddInfoDelete(req.body.idDelete,req.body.idDeleted, req.body.idConversation );
        return res.status(200).json({ deleteDataInfo });
    } else {
        return res.status(400).json({ error: 'Error' });
    }
}


const getDeleteInfo = async (req, res) => {
    if (req.query.idConversation) {
        const blockDataInfo = await blockService.handleGetInfoBlock(req.query.idConversation );
        console.log(blockDataInfo);
        return res.status(200).json({ blockDataInfo });
    } else {
        return res.status(400).json({ error: 'Error' });
    }
}

module.exports = {
    postDeleteInfo,
    getDeleteInfo,
}