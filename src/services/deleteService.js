const block = require('../models/delete');

let handleAddInfoDelete = (idDelete, idDeleted, idConversation) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteData = {};
            const blocker = new block();
            const dataDeleteInfo = await blocker.addInfoDelete(idDelete, idDeleted, idConversation);
            deleteData.errCode = 0;
            deleteData.errMessage = 'OK';
            deleteData.statusDelete = dataDeleteInfo;
            resolve(deleteData)
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetInfoDelete = (idConversation) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteData = {};
            const blocker = new block();
            const dataDeleteInfo = await blocker.getInfoDelete(idConversation);
            deleteData.errCode = 0;
            deleteData.errMessage = 'OK';
            deleteData.infoBlock = dataDeleteInfo;
            resolve(deleteData)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleAddInfoDelete,
    handleGetInfoDelete 

};
