import messageService from '../services/messageService';

const getMessage = async (req, res) => {
    const idConversation = req.query.idConversation;
    const idUser = req.query.idUser;
    console.log("idConversation " + idConversation);
    const loadMessage = await messageService.handleLoadMessage(idConversation, idUser);
    return res.status(200).json({ loadMessage });
}

const getAccByidConversation =async(req, res) => {
    const idConversation = req.query.idConversation;
    console.log("idConversation " + idConversation);
    const accountList = await messageService.handleGetAcc(idConversation);
    return res.status(200).json({ accountList });
}

const postMessage = async (req, res ) => {
    const direct = req.body.direct;
    const messageText = req.body.messageText;
    const timeSend = req.body.timeSend;
    const idConversation = req.body.idConversation;
    console.log(direct + ' ' + messageText + ' ' + timeSend+ ' ' + idConversation);
    if( messageText && timeSend && idConversation){
        const saveMessage = await messageService.handleCreateConversation(direct, messageText,timeSend, idConversation);
        return res.status(200).json({saveMessage});
    }
    else console.log("Nope");
}


module.exports = {
    getMessage: getMessage,
    getAccByidConversation: getAccByidConversation,
    postMessage: postMessage
}