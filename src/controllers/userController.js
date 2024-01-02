import userService from "../services/userService";

const handleLoging = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    console.log("username", username);
    req.session.user_session = { username: username };
    req.session.isAuth = true;
    req.session.save();
    console.log("kkk " + req.session.user_session);

    if (!username || !password) {
      return res.status(200).json({
        errCode: 1,
        message: "Missing inputs parameter!.",
      });
    }

    const userData = await userService.handleUserLogin(username, password);
    req.session.idUser = userData.idUser;

    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user ? userData.user : {},
      user_session: req.session.user_session,
    });
  } catch (error) {
    console.log("hihihi" + error);
  }
};

const handleLogout = async (req, res) => {
  console.log("req.session " + req.session);
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Error logging out");
    } else {
      res.status(200).send("Logout successful");
    }
  });
};

const getMatching = async (req, res) => {
  if (req.session.user_session) {
    const user = req.session.user_session;
    const userData = await userService.handleGetInfo(user.username);

    return res.status(200).json({ userData });
  } else {
    return res.status(400).json({ error: "Người dùng không tồn tại" });
  }
};

const getUserByUsername = async (req, res) => {
  if (req.query.nickname) {
    const user = req.query.nickname;
    const userData = await userService.handleGetInfo(user);

    return res.status(200).json({ userData });
  } else {
    return res.status(400).json({ error: "Người dùng không tồn tại" });
  }
};

const getUserBySearch = async (req, res) => {
  try {
    if (req.query.nickname) {
      const nickname = req.query.nickname;
      // const idAcc = req.session.idUser;
      const idAcc = req.query.idUser;
      const listUser = await userService.handleGetUserBySearch(idAcc, nickname);
      return res.status(200).json({ listUser });
    } else {
      return res.status(400).json({ error: "Không có trường tìm kiếm" });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getInfoByID = async (req, res) => {
  try {
    if (req.query.idUser) {
      const userData = await userService.handleGetInfoByID(req.query.idUser);
      return res.status(200).json({ userData });
    } else {
      return res.status(400).json({ error: "Người dùng không tồn tại" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSignup = async (req, res) => {
  const { username, password, repeatpassword, fullname, date, gender, timeRegister} = req.body;
  if (!username || !password || !repeatpassword || !fullname || !date || !timeRegister) {
    return res.status(200).json({
      errCode: 4,
      message: "Missing inputs parameter!.",
    });
  }
  if(repeatpassword != password) {
    return res.status(200).json({
      errCode: 5,
      message: "Retype password wrong!.",
    });
  }
  const userData = await userService.handleUserSignUp(
    username,
    password,
    fullname,
    date,
    gender,
    timeRegister
  );
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

const handleEditProfile = async (req, res) => {
  const { username, fullname, bio, birth, gender } = req.body;
  console.log("post");
  console.log(req.body);
  if (!username || !fullname || !birth) {
    return res.status(200).json({
      errCode: 4,
      message: "Missing inputs parameter!.",
    });
  }
  const userData = await userService.handleEditProfile(
    req.session.idUser,
    username,
    fullname,
    bio,
    birth,
    gender
  );
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

const getProfileSetting = async (req, res) => {
  if (req.session.idUser) {
    const idUser = req.session.idUser;
    const userData = await userService.handleGetInfoByID(idUser);
    console.log("get");
    console.log(userData);
    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user ? userData.user : {},
    });
  } else {
    return res.status(200).json({
      errCode: 1,
      message: "Need login to get profile!",
    });
  }
};

const handleChangePassword = async (req, res) => {
  const { currentpassword, newpassword, retypepassword } = req.body;
  if (!currentpassword || !newpassword || !retypepassword) {
    return res.status(200).json({
      errCode: 4,
      message: "Missing inputs parameter!.",
    });
  }
  if (newpassword != retypepassword) {
    return res.status(200).json({
      errCode: 3,
      message: "Retype password wrong!",
    });
  }

  if (req.session.user_session.username) {
    const userData = await userService.handleChangePassword(
      req.session.user_session.username,
      currentpassword,
      newpassword
    );
    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
    });
  }
};

const handleCheckFriendRelation = async (req, res) => {
  if (!req.query.idAcc1 || !req.query.idAcc2) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing params input!",
    });
  }
  const relation = await userService.handleCheckFriendRelation(
    req.query.idAcc1,
    req.query.idAcc2
  );
  return res.status(200).json({
    errCode: relation.errCode,
    errMessage: relation.errMessage,
  });
};

const handleAddFriendRelation = async (req, res) => {
  if (!req.body.idAcc1 || !req.body.idAcc2) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing params input!",
    });
  }
  const relation = await userService.handleAddFriendRelation(
    req.body.idAcc1,
    req.body.idAcc2
  );
  return res.status(200).json({
    errCode: relation.errCode,
    errMessage: relation.errMessage,
  });
};

//Admin
const getListUser = async (req, res) => {
  try {
    const page = req.query.page;
    const listUser = await userService.handleGetListUser(page);
    return res.status(200).json(listUser);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const getIdZodiacByIdUser = async (req, res) => {
  try {
    const idUser = req.query.idUser;
    const idZodiac = await userService.handleGetListIdZodiacByIdUser(idUser);
    return res.status(200).json(idZodiac);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const getListAccReported = async (req, res) => {
  try {
    const page = req.query.page;
    const listAccReport = await userService.handleGetListAccReported(page);
    return res.status(200).json(listAccReport);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteUserByAdmin = async (req, res) => {
  try {
    const idUser = req.body.idUser;
    const result = await userService.handleDeleteUserByAdmin(idUser);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getUserByAdmin = async (req, res) => {
  try {
    const idUser = req.query.idUser;
    if (!idUser)
      return res.status(400).json({
        errCode: 2,
        errMessage: "Thieu tham so",
      });
    const result = await userService.handleGetUserByAdmin(idUser);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const handleEditProfileBrief = async (req, res) => {
  const { username, fullname, bio } = req.body;
  console.log(req.body);
  if (!username || !fullname) {
    return res.status(200).json({
      errCode: 4,
      message: "Missing inputs parameter!.",
    });
  }
  const userData = await userService.handleEditProfileBrief(
    username,
    fullname,
    bio
  );
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
module.exports = {
  handleLoging: handleLoging,
  handleLogout: handleLogout,
  getMatching: getMatching,
  getUserByUsername: getUserByUsername,
  getInfoByID: getInfoByID,
  handleSignup: handleSignup,
  handleEditProfile: handleEditProfile,
  handleChangePassword: handleChangePassword,
  getProfileSetting: getProfileSetting,
  handleAddFriendRelation: handleAddFriendRelation,
  handleCheckFriendRelation: handleCheckFriendRelation,
  getUserBySearch: getUserBySearch,
  getListUser: getListUser,
  getIdZodiacByIdUser: getIdZodiacByIdUser,
  getListAccReported: getListAccReported,
  deleteUserByAdmin: deleteUserByAdmin,
  getUserByAdmin: getUserByAdmin,
  handleEditProfileBrief: handleEditProfileBrief,
};
