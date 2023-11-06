import messageService from '../services/messageService';
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage }).single('file');

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

const postFile = async(req,res)=>{
    upload(req,res, async function(err){
        console.log("POST FILE");
        const direct = req.body.direct;
        const timeSend = req.body.timeSend;
        const idConversation = req.body.idConversation;
        const fileName = req.file.filename;
        console.log(direct + ' ' + fileName + ' ' + timeSend+ ' ' + idConversation);
        if( fileName && timeSend && idConversation){
            const saveMessage = await messageService.handleCreateConversationOfFile(direct, fileName,timeSend, idConversation);
            return res.status(200).json({saveMessage});
        }
        else console.log("Nope");
    })
}

const getFile = async(req,res)=>{
    console.log(req.body.filename);
}


module.exports = {
    getMessage: getMessage,
    getAccByidConversation: getAccByidConversation,
    postMessage: postMessage,
    postFile: postFile,
    getFile: getFile,
}