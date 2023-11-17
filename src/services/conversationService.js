const Conversation = require('../models/conversation');
const Account = require('../models/account'); 
const Zodiac = require('../models/zodiac'); 
const Delete = require('../models/delete'); 

async function handleFindUser(idAcc1) {
    try {
        console.log("idAcc1 " + idAcc1);
        const userChat = {};
        const conversationModel = new Conversation("", idAcc1);
        const userCheck = await conversationModel.findConversation(idAcc1);
        console.log("userCheck " + userCheck);
        if (!userCheck) {
            userChat.errCode = 1;
            userChat.errMessage = 'No one is connected!';
            // return userChat;
        } else {
            userChat.errCode = 0;
            userChat.chat = userCheck;

            const accountModel = new Account();
            const deletetModel = new Delete();

            const infoUserPromises = userCheck.map(async (conversation) => {
                const idAcc = idAcc1 === conversation.idAcc1 ? conversation.idAcc2 : conversation.idAcc1;
                return await accountModel.getCusByID(idAcc);
            });

            userChat.infoUser2 = await Promise.all(infoUserPromises);

            const infODeletePromises = userCheck.map(async (conversation) => {
                return await deletetModel.getInfoDelete(conversation.idConversation);
            });

            userChat.infoUserDelete = await Promise.all(infODeletePromises);

            const zodiacModel = new Zodiac();
            const avatarPromises = userChat.infoUser2?.map(async(chat, index) =>{
                const userInfo = userChat.infoUser2[index][0];
                return await zodiacModel.getAvatarByID(userInfo.idZodiac)
            });
            
            userChat.avatarData = await Promise.all(avatarPromises);
            
        }

        
        const chatsWithUserInfo = userChat.chat?.map((chat, index) => {
          const userInfo = userChat.infoUser2[index][0];
          const infoUserDelete = userChat.infoUserDelete[index];
          const avatar = userChat.avatarData[index]; // Get the corresponding avatar data
          
          const idSession = idAcc1;
        
          return {
            ...chat,
            idSession,
            avatar,
            userInfo,
            infoUserDelete,
          };
        });
        
        return chatsWithUserInfo;
    } catch (e) {
        throw e;
    }
}

async function handleCreateConversation(idAcc1, idAcc2, idConversation) {
    try {
        const conversationData = {};
        const conversationModel = new Conversation(idAcc1, idAcc2, idConversation);
        const conversationCheck = await conversationModel.findConversation();
        
        if (!conversationCheck) {
            const chat = await conversationModel.saveConversation();
            conversationData.errCode = 0;
            conversationData.errMessage = 'OK';
            conversationData.chat = chat;
        } else {
            conversationData.errCode = 1;
            conversationData.chat = conversationCheck;
        }
        return conversationData;
    } catch (e) {
        throw e;
    }
}

async function getConversationByID(idConversation) {
    try {
        const conversationData = {};
        const conversationModel = new Conversation();
        const conversationCheck = await conversationModel.getConversationByID(idConversation);
        
        conversationData.errCode = 0;
        conversationData.errMessage = 'OK';
        conversationData.newConversation = conversationCheck;
        return conversationData;
    } catch (e) {
        throw e;
    }
}

async function blockConversation(idConversation) {
    try {
        const conversationData = {};
        const conversationModel = new Conversation();
        const conversationCheck = await conversationModel.blockConversation(idConversation);
        
        conversationData.errCode = 0;
        conversationData.errMessage = 'OK';
        conversationData.newConversation = conversationCheck;
        return conversationData;
    } catch (e) {
        throw e;
    }
}

async function deleteConversation(idConversation) {
    try {
        const conversationData = {};
        const conversationModel = new Conversation();
        
        const deleteModel = new Delete();
        const countDelete = await deleteModel.getInfoDelete(idConversation);
        console.log("countDelete.length ", countDelete.length);
        if(countDelete.length == 2){
            await conversationModel.deleteConversation(idConversation);
            conversationData.errCode = 0;
            conversationData.errMessage = 'OK';
            conversationData.newConversation = "Xóa thành công";
            return conversationData;
        }
        else{
            conversationData.errCode = 0;
            conversationData.errMessage = 'OK';
            conversationData.newConversation = "Xóa 1 phía thành công";
        }
    } catch (e) {
        throw e;
    }
}

async function updateBlockStatusConversation(idConversation) {
    try {
        const conversationData = {};
        const conversationModel = new Conversation();
        await conversationModel.updateBlockStatusConversation(idConversation);
        
        conversationData.errCode = 0;
        conversationData.errMessage = 'OK';
        conversationData.newConversation = "Cập nhật thành công";
        return conversationData;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    handleCreateConversation,
    handleFindUser,
    blockConversation,
    deleteConversation,
    updateBlockStatusConversation,
    getConversationByID
};
