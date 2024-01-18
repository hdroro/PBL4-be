const getImageInfo = async (req, res) => {
  if (req.query.imageName) {
    const imagePath = "/public/img/" + req.query.imageName;
    console.log(imagePath);
    return res.status(200).json({ imagePath });
  } else {
    return res.status(400).json({ error: "Error" });
  }
};

module.exports = { getImageInfo };
