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


module.exports = {
    getUserChat: getUserChat
}