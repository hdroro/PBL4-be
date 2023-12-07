import userService from "../services/userService";

const handleLoging = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
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
  console.log("req.query.idUser", req.query.idUser);
  if (req.query.idUser) {
    const userData = await userService.handleGetInfoByID(req.query.idUser);

    return res.status(200).json({ userData });
  } else {
    return res.status(400).json({ error: "Người dùng không tồn tại" });
  }
};

const handleSignup = async (req, res) => {
  const { username, password, fullname, date, gender } = req.body;
  if (!username || !password || !fullname || !date) {
    return res.status(200).json({
      errCode: 4,
      message: "Missing inputs parameter!.",
    });
  }
  const userData = await userService.handleUserSignUp(
    username,
    password,
    fullname,
    date,
    gender
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
  if (!username || !fullname || !bio || !birth) {
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
  console.log(req.body);
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
      message: "retype password wrong!",
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
};
