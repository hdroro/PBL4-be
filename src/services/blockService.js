const block = require('../models/block');

let handleAddInfoBlock = (idBlock, idBlocked, idConversation) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blockData = {};
            const blocker = new block();
            const dataBlockInfo = await blocker.addInfoBlock(idBlock, idBlocked, idConversation);
            blockData.errCode = 0;
            blockData.errMessage = 'OK';
            blockData.newConversation = dataBlockInfo;
            resolve(blockData)
        } catch (e) {
            reject(e);
        }
    })
}

let handleDeleteInfoBlock = (idBlock, idConversation) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blockData = {};
            const blocker = new block();
            const dataBlockInfo = await blocker.deleteBlock(idBlock, idConversation);
            blockData.errCode = 0;
            blockData.errMessage = 'OK';
            blockData.newConversation = dataBlockInfo;
            resolve(blockData)
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetInfoBlock = (idConversation) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blockData = {};
            const blocker = new block();
            const dataBlockInfo = await blocker.getInfoBlock(idConversation);
            blockData.errCode = 0;
            blockData.errMessage = 'OK';
            blockData.infoBlock = dataBlockInfo;
            resolve(blockData)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleAddInfoBlock,
    handleDeleteInfoBlock,
    handleGetInfoBlock
};
