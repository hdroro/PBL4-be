const Conversation = require('../models/message');
const Message = require('../models/message');


async function handleLoadMessage(idConversation, idUser){
    const messageLoading = {};
    console.log("idUser " + idUser);
    const messageModel = new Message("", "", "", "", idConversation);
    const message = await messageModel.loadMessages(idUser);

    if(!message){
        messageLoading.errCode = 1;
        messageLoading.errMessage = 'Nhắn nàoooo!';
    }
    else{
        messageLoading.errCode = 0;
        messageLoading.errMessage = 'OK';
        messageLoading.chat = message;
    }
    
    return messageLoading;

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