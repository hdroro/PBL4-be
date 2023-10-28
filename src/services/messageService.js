const Conversation = require('../models/message');
const Message = require('../models/message');
const Account = require('../models/account');
const Zodiac = require('../models/zodiac');


async function handleLoadMessage(idConversation, idUser) {
    try {
        const messageLoading = {};
        console.log("idUser " + idUser);
        const messageModel = new Message("", "", "", "", idConversation);
        const messages = await messageModel.loadMessages(idUser);

        if (!messages || messages.length === 0) {
            messageLoading.errCode = 1;
            messageLoading.errMessage = 'Nhắn nàoooo!';
            return messageLoading;
        }

        messageLoading.errCode = 0;
        messageLoading.errMessage = 'OK';
        messageLoading.chat = messages;

        const MessageWithInfo = await Promise.all(messageLoading.chat.map(async (chat, index) => {
            const user1 = await new Account().getCusByID(chat.idAcc1);
            const user2 = await new Account().getCusByID(chat.idAcc2);
            
            const avatar1 = await new Zodiac().getAvatarByID(user1[0].idZodiac);
            const avatar2 = await new Zodiac().getAvatarByID(user2[0].idZodiac);

            let avatar;
            console.log("idUser " + idUser);
            if (chat.idAcc1 == idUser) {
                avatar = avatar1;
            }
            else if(chat.idAcc2 == idUser ){
                avatar = avatar2;
            }
            return {
                ...chat,
                avatar,
            };
        }));

        messageLoading.chat = MessageWithInfo; // Update the 'chat' property

        return messageLoading;
    } catch (error) {
        console.error('Error in handleLoadMessage:', error);
        throw error;
    }
}




async function handleGetAcc(idConversation){
    try {
        const accountList = {};
        const messageModel = new Message();
        const accounts = await messageModel.getAccByidConversation(idConversation);
        accountList.errCode = 0;
        accountList.errMessage = 'OK';
        accountList.chat = accounts;
        
        return accountList;
    } catch (error) {
        console.log(error);
    }
}


async function handleCreateConversation( direct, messageText, timeSend, idConversation) {
    try {
        const messageData = {};
        const messageModel = new Message("", direct, messageText, timeSend, idConversation);
        const message = await messageModel.saveMessage();
        messageData.errCode = 0;
        messageData.errMessage = 'OK';
        messageData.chat = message;
        
        return messageData;
    } catch (e) {
        throw e;
    }
}


module.exports = {
    handleCreateConversation: handleCreateConversation,
    handleLoadMessage: handleLoadMessage,
    handleGetAcc: handleGetAcc
}