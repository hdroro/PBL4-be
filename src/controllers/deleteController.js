import deleteService from "../services/deleteService";

const postDeleteInfo = async (req, res) => {
  if (req.body.idDelete && req.body.idDeleted && req.body.idConversation) {
    const deleteDataInfo = await deleteService.handleAddInfoDelete(
      req.body.idDelete,
      req.body.idDeleted,
      req.body.idConversation,
      req.body.deleteAtId
    );
    return res.status(200).json({ deleteDataInfo });
  } else {
    return res.status(400).json({ error: "Error" });
  }
};

const putDeleteInfo = async (req, res) => {
  if (req.body.idDelete && req.body.idDeleted) {
    const deleteDataInfo = await deleteService.handleUpdateInfoDelete(
      req.body.idDelete,
      req.body.idDeleted,
      req.body.deleteAtId
    );
    console.log(deleteDataInfo);
    return res.status(200).json({ deleteDataInfo });
  } else {
    return res.status(400).json({ error: "Error" });
  }
};

const getDeleteInfo = async (req, res) => {
  if (req.query.idConversation) {
    const deleteDataInfo = await deleteService.handleGetInfoDelete(
      req.query.idConversation
    );
    console.log(deleteDataInfo);
    return res.status(200).json({ deleteDataInfo });
  } else {
    return res.status(400).json({ error: "Error" });
  }
};

const getIdConversationInDeleted = async (req, res) => {
  const deleteDataInfo = await deleteService.handleGetIdConversationInDeleted();
  return res.status(200).json({ deleteDataInfo });
};

const deleteInfoDelete = async (req, res) => {
  if (req.query.idDelete && req.query.idDeleted) {
    const deleteDataInfo = await deleteService.handleDeleteInfoDeleted(
      req.query.idDelete,
      req.query.idDeleted
    );
    return res.status(200).json({ deleteDataInfo });
  } else {
    return res.status(400).json({ error: "Error" });
  }
};

module.exports = {
  postDeleteInfo,
  putDeleteInfo,
  getDeleteInfo,
  getIdConversationInDeleted,
  deleteInfoDelete,
};
