import conversationService from '../services/conversationService';

const getUserChat = async (req, res) => {
    if (req.session.idUser) {
        const idUser = req.session.idUser; 
        const userChatData = await conversationService.handleFindUser(idUser);
        console.log(userChatData);
        return res.status(200).json({ userChatData });
    } else {
        return res.status(400).json({ error: 'Chưa kết nối ai' });
    }
}

const putBlockConversation = async(req, res) => {
    if(req.body.idConversation){
        const conversationData = await conversationService.blockConversation(req.body.idConversation);
        return res.status(200).json({ conversationData });
    } else {
        return res.status(400).json({ error: 'Không tồn tại idConversation' });
    }
}

const deleteConversation = async(req, res) => {
    if(req.body.idConversation){
        const conversationData = await conversationService.deleteConversation(req.body.idConversation);
        return res.status(200).json({ conversationData });
    } else {
        return res.status(400).json({ error: 'Không tồn tại idConversation' });
    }
}

const getConversationByID = async(req, res) => {
    console.log("req.body.idConversation "  + req.query.idConversation);
    if(req.query.idConversation){
        const conversationData = await conversationService.getConversationByID(req.query.idConversation);
        return res.status(200).json({ conversationData });
    } else {
        return res.status(400).json({ error: 'Không tồn tại idConversation' });
    }
}

const createConversation = async(req, res) => {
    if(req.body.idAcc1 && req.body.idAcc2) {
        const conversationData = await conversationService.handleCreateConversation(req.body.idAcc1, req.body.idAcc2);
        return res.status(200).json({
            errCode: conversationData.errCode,
            errMessage: conversationData.errMessage,
            idConversation: conversationData.idConversation,
        });
    } else {
        return res.status(400).json({
            errCode: 2,
            errorMessage: 'Missing input params!',
        });
    }
}

module.exports = {
    getUserChat: getUserChat,
    putBlockConversation: putBlockConversation,
    deleteConversation: deleteConversation,
    getConversationByID: getConversationByID,
    createConversation: createConversation,
}