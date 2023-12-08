import blockService from "../services/blockService";

const postBlockInfo = async (req, res) => {
  if (req.body.idBlock && req.body.idBlocked && req.body.idConversation) {
    const blockDataInfo = await blockService.handleAddInfoBlock(
      req.body.idBlock,
      req.body.idBlocked,
      req.body.idConversation
    );
    console.log(blockDataInfo);
    return res.status(200).json({ blockDataInfo });
  } else {
    return res.status(400).json({ error: "Error" });
  }
};

const deleteBlockInfo = async (req, res) => {
  if (req.query.idSession && req.query.idConversation) {
    await blockService.handleDeleteInfoBlock(
      req.query.idSession,
      req.query.idConversation
    );
    return res.status(200).json({ success: "Thành công" });
  } else {
    return res.status(400).json({ error: "Error" });
  }
};

const getBlockInfo = async (req, res) => {
  if (req.query.idConversation) {
    const blockDataInfo = await blockService.handleGetInfoBlock(
      req.query.idConversation
    );
    console.log(blockDataInfo);
    return res.status(200).json({ blockDataInfo });
  } else {
    return res.status(400).json({ error: "Error" });
  }
};

module.exports = {
  postBlockInfo,
  deleteBlockInfo,
  getBlockInfo,
};
