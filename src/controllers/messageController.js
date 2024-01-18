import { error } from "console";
import messageService from "../services/messageService";
const path = require("path");
const multer = require("multer");
require("dotenv").config(); // giup chay dc dong process.env

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/img");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 },
}).single("file");

const getMessage = async (req, res) => {
  const idConversation = req.query.idConversation;
  const idUser = req.query.idUser;
  console.log("idConversation " + idConversation);
  const loadMessage = await messageService.handleLoadMessage(
    idConversation,
    idUser
  );
  return res.status(200).json({ loadMessage });
};

const getAccByidConversation = async (req, res) => {
  const idConversation = req.query.idConversation;
  console.log("idConversation " + idConversation);
  const accountList = await messageService.handleGetAcc(idConversation);
  return res.status(200).json({ accountList });
};

const postMessage = async (req, res) => {
  const direct = req.body.direct;
  const messageText = req.body.messageText;
  const timeSend = req.body.timeSend;
  const idConversation = req.body.idConversation;
  const isFile = req.body.isFile;
  const fileName = req.body.fileName;
  if (messageText && timeSend && idConversation) {
    const saveMessage = await messageService.handleCreateConversation(
      direct,
      messageText,
      timeSend,
      idConversation,
      isFile,
      fileName
    );
    return res.status(200).json({ saveMessage });
  } else console.log("Nope");
};

const postFile = async (req, res) => {
  upload(req, res, async function (err) {
    console.log("POST FILE");
    const direct = req.body.direct;
    const timeSend = req.body.timeSend;
    const idConversation = req.body.idConversation;
    const fileName = req.file.filename;
    const fileName_ = req.body.fileName;
    console.log("fileName_", fileName_);
    if (fileName && timeSend && idConversation) {
      const saveMessage = await messageService.handleCreateConversationOfFile(
        direct,
        fileName,
        timeSend,
        idConversation,
        fileName_
      );
      return res.status(200).json({ saveMessage });
    } else console.log(err);
  });
};

const getFile = async (req, res) => {
  try {
    if (req.query.filename) {
      const fileUrl =
        `${process.env.REACT_APP_BACKEND_URL}/public/img/` + req.query.filename;
      console.log(fileUrl);
      res.json({ fileUrl });
    } else {
      res.status(400).json({ error: "Filename not provided" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMessageById = async (req, res) => {
  try {
    if (req.query.idMessage) {
      const messageDetail = await messageService.handleGetInforMessageById(
        req.query.idMessage
      );
      return res.status(200).json({ messageDetail });
    } else console.log(error);
  } catch (error) {}
};

const getMaxMessageId = async (req, res) => {
  try {
    const idMessageMax = await messageService.handleGetMaxMessageId();
    return res.status(200).json({ idMessageMax });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMessage: getMessage,
  getAccByidConversation: getAccByidConversation,
  postMessage: postMessage,
  postFile: postFile,
  getFile: getFile,
  getMessageById: getMessageById,
  getMaxMessageId: getMaxMessageId,
};
