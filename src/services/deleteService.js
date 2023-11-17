const delete_ = require('../models/delete');

let handleAddInfoDelete = (idDelete, idDeleted, idConversation) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteData = {};
            const deleter = new delete_();
            const dataDeleteInfo = await deleter.addInfoDelete(idDelete, idDeleted, idConversation);
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
            const deleter = new delete_();
            const dataDeleteInfo = await deleter.getInfoDelete(idConversation);
            deleteData.errCode = 0;
            deleteData.errMessage = 'OK';
            deleteData.infoDelete = dataDeleteInfo;
            resolve(deleteData)
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetIdConversationInDeleted = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteData = {};
            const deleter = new delete_();
            const dataDeleteInfo = await deleter.getIdConversationInDeleted();
            deleteData.errCode = 0;
            deleteData.errMessage = 'OK';
            deleteData.infoDelete = dataDeleteInfo;
            resolve(deleteData)
        } catch (e) {
            reject(e);
        }
    })
}

let handleDeleteInfoDeleted = (idDelete, idDeleted) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteData = {};
            const deleter = new delete_();
            await deleter.deleteInfoDelete(idDelete, idDeleted);
            deleteData.errCode = 0;
            deleteData.errMessage = 'OK';
            deleteData.infoDelete = "Xóa thành công";
            resolve(deleteData)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleAddInfoDelete,
    handleGetInfoDelete,
    handleGetIdConversationInDeleted,
    handleDeleteInfoDeleted
};
