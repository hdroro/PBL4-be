const MyDate = require("../models/mydate");
const account = require("../models/account");
const zodiac = require("../models/zodiac");

let handleUserLogin = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      const idRole = await new account().getAdminAcc(username);
      let idRole_;
      if (idRole != 0) idRole_ = 1;
      else idRole_ = 0;
      const user = new account(username, password, idRole_);
      let userCheck;
      userCheck = await user.checkUsername();
      if (userCheck) {
        let passwordCheck = await user.checkPassword(password);

        if (!!passwordCheck) {
          let idUser = await user.getIdAccount(username);
          userData.errCode = 0;
          userData.errMessage = "OK";

          delete user.password;
          userData.user = user;
          userData.idUser = idUser;
        } else {
          userData.errCode = 3;
          userData.errMessage = "Wrong password";
        }
      } else {
        userData.errCode = 2;
        userData.errMessage = `Not exist username`;
      }
      resolve(userData);
    } catch (e) {
      // reject(e);
      throw e;
    }
  });
};

let handleGetInfo = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userDataInfo = {};
      const user = new account(username);

      const userinfo = await user.getCusAcc(username);

      userDataInfo.errCode = 0;
      userDataInfo.errMessage = "OK";

      delete userinfo.password;
      userDataInfo.user = userinfo;

      resolve(userDataInfo);
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetInfoByID = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userDataInfo = {};
      const user = new account();
      const zodiac_ = new zodiac();

      const userinfo = await user.getCusByID(idUser);

      console.log("service");
      console.log(userinfo);
      console.log("userinfo.idZodiac " + userinfo[0].idZodiac);
      const avatar = await zodiac_.getAvatarByID(userinfo[0].idZodiac);

      userDataInfo.errCode = 0;
      userDataInfo.errMessage = "OK";

      delete userinfo[0].password;

      userDataInfo.user = userinfo[0];
      userDataInfo.user.avatar = avatar;

      resolve(userDataInfo);
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetUserBySearch = (idAcc, userSearch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const listUser = await new account().getUserBySearch(idAcc, userSearch);
      console.log(listUser);

      const listUserInfo = {
        listUser: [],
        errCode: 0,
        errMessage: "OK",
      };

      for (const item of listUser) {
        const avatar = await new zodiac().getAvatarByID(item.idZodiac);
        listUserInfo.listUser.push({
          ...item,
          avatar: avatar,
        });
      }

      resolve(listUserInfo);
    } catch (err) {
      reject(err);
    }
  });
};

let handleUserSignUp = (
  username,
  password,
  fullname,
  birth,
  gender,
  timeRegister
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userDataInfo = {};
      const user = new account(username);
      let userCheck = await user.checkUsername(username);
      if (!userCheck) {
        let month = birth.substr(5, 2);
        let date = birth.substr(8, 2);
        if (date[0] == "0") {
          date = parseInt(date[1]);
        } else {
          date = parseInt(date);
        }
        if (month[0] == "0") {
          month = parseInt(month[1]);
        } else {
          month = parseInt(month);
        }
        let idZodiac = await new zodiac().getIdZodiac(date, month);
        if (idZodiac) {
          let addUserCheck = await user.addAccount(
            username,
            password,
            fullname,
            birth,
            gender,
            idZodiac,
            timeRegister
          );
          if (addUserCheck) {
            userDataInfo.errCode = 0;
            userDataInfo.errMessage = "Sign up successfully!";
          } else {
            userDataInfo.errCode = 1;
            userDataInfo.errMessage = "Failed add account user!";
          }
        } else {
          userDataInfo.errCode = 2;
          userDataInfo.errMessage = "Can not find id zodiac!";
        }
      } else {
        userDataInfo.errCode = 3;
        userDataInfo.errMessage = "Username have already existed!";
      }

      resolve(userDataInfo);
    } catch (error) {
      reject(error);
    }
  });
};

let handleEditProfile = (id, username, name, bio, birthday, gender) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userDataInfo = {};
      const user = new account(username);
      let month = birthday.substr(5, 2);
      let date = birthday.substr(8, 2);
      if (date[0] == "0") {
        date = parseInt(date[1]);
      } else {
        date = parseInt(date);
      }
      if (month[0] == "0") {
        month = parseInt(month[1]);
      } else {
        month = parseInt(month);
      }
      let idZodiac = await new zodiac().getIdZodiac(date, month);
      if (idZodiac) {
        let addUserCheck = await user.editAccount(
          id,
          username,
          name,
          bio,
          birthday,
          gender,
          idZodiac
        );
        if (addUserCheck) {
          userDataInfo.errCode = 0;
          userDataInfo.errMessage = "Edit info successfully!";
        } else {
          userDataInfo.errCode = 1;
          userDataInfo.errMessage = "Failed edit info!";
        }
      } else {
        userDataInfo.errCode = 2;
        userDataInfo.errMessage = "Can not find id zodiac!";
      }

      resolve(userDataInfo);
    } catch (error) {
      reject(error);
    }
  });
};

let handleEditProfileBrief = (username, name, bio) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userDataInfo = {};
      const user = new account(username);
      let addUserCheck = await user.editAccountBrief(username, name, bio);
      if (addUserCheck) {
        userDataInfo.errCode = 0;
        userDataInfo.errMessage = "Edit info successfully!";
      } else {
        userDataInfo.errCode = 1;
        userDataInfo.errMessage = "Failed edit info!";
      }
      resolve(userDataInfo);
    } catch (error) {
      reject(error);
    }
  });
};

let handleChangePassword = (username, oldpassword, newpassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userDataInfo = {};
      const user = new account(username);
      const checkOldPassword = await user.checkPassword(oldpassword);
      if (checkOldPassword) {
        const updatePassword = await user.updatePassword(newpassword);
        if (updatePassword) {
          userDataInfo.errCode = 0;
          userDataInfo.errMessage = "Update password successfully!";
        } else {
          userDataInfo.errCode = 2;
          userDataInfo.errMessage = "Failed update password!";
        }
      } else {
        userDataInfo.errCode = 1;
        userDataInfo.errMessage = "Wrong password!";
      }
      resolve(userDataInfo);
    } catch (error) {
      reject(error);
    }
  });
};

let handleAddFriendRelation = (idAcc1, idAcc2) => {
  return new Promise(async (resolve, reject) => {
    try {
      let relationInfo = {};
      const relation = new friend_relation();
      const checkFriendRelation = await relation.checkFriendRelation(
        idAcc1,
        idAcc2
      );
      if (!checkFriendRelation) {
        const idFriendRelation = await relation.save(idAcc1, idAcc2);
        if (idFriendRelation) {
          relationInfo.errCode = 0;
          relationInfo.errMessage = "OK!";
        }
      } else {
        relationInfo.errCode = 1;
        relationInfo.errMessage =
          "Friend existed! Can not add new friend relation!";
      }
      resolve(relationInfo);
    } catch (error) {
      reject(error);
    }
  });
};

let handleCheckFriendRelation = (idAcc1, idAcc2) => {
  return new Promise(async (resolve, reject) => {
    try {
      let relationInfo = {};
      const relation = new friend_relation();
      const checkFriendRelation = await relation.checkFriendRelation(
        idAcc1,
        idAcc2
      );
      if (checkFriendRelation) {
        relationInfo.errCode = 0;
        relationInfo.errMessage = "Friend!";
      } else {
        relationInfo.errCode = 1;
        relationInfo.errMessage = "Not friend!";
      }
      resolve(relationInfo);
    } catch (error) {
      reject(error);
    }
  });
};

//admin
let handleGetListUser = async (page) => {
  try {
    var listUser = await new account().getListUser();
    const lengthListUser = listUser.length;
    const perPage = 10;
    var lastPage = Math.ceil(listUser.length / perPage);
    if (lastPage === 0) lastPage = 1;
    const pageNumber = parseInt(page) || 1;
    console.log(pageNumber + " " + lastPage);
    if (pageNumber < 1 || pageNumber > lastPage)
      throw {
        errCode: 3,
        errMessage: "Page number not correct",
      };
    const start = (pageNumber - 1) * perPage;
    const end = pageNumber * perPage;
    const prev = pageNumber === 1 ? false : pageNumber - 1;
    const next = pageNumber === lastPage ? false : pageNumber + 1;
    listUser = Array.from(listUser).slice(start, end);
    listUser.forEach((user) => {
      var time = new MyDate(user.birth.toString());
      user.birth = time.toMyLocaleDateString();
    });
    return {
      errCode: 0,
      errMessage: "OK",
      size: lengthListUser,
      listUser: listUser,
      prev: prev,
      next: next,
      lastPage: lastPage,
    };
  } catch (err) {
    throw err;
  }
};

let handleGetListAccReported = async (page) => {
  try {
    var listAccReport = await new account().getListAccReported();
    const perPage = 10;
    var lastPage = Math.ceil(listAccReport.length / perPage);
    if (lastPage === 0) lastPage = 1;
    const pageNumber = parseInt(page) || 1;
    console.log(pageNumber + " " + lastPage);
    if (pageNumber < 1 || pageNumber > lastPage)
      throw {
        errCode: 3,
        errMessage: "Page number not correct",
      };
    const start = (pageNumber - 1) * perPage;
    const end = pageNumber * perPage;
    const prev = pageNumber === 1 ? false : pageNumber - 1;
    const next = pageNumber === lastPage ? false : pageNumber + 1;
    listAccReport = Array.from(listAccReport).slice(start, end);
    listAccReport.forEach((user) => {
      var time = new MyDate(user.birth.toString());
      user.birth = time.toMyLocaleDateString();
    });
    return {
      errCode: 0,
      errMessage: "OK",
      listAccReport: listAccReport,
      prev: prev,
      next: next,
      lastPage: lastPage,
    };
  } catch (err) {
    throw err;
  }
};

let handleDeleteUserByAdmin = async (idUser) => {
  try {
    await new account().deleteAccountByAdmin(idUser);
    return {
      errCode: 0,
      errMessage: "OK",
    };
  } catch (err) {
    throw err;
  }
};

let handleGetUserByAdmin = async (idUser) => {
  try {
    const zodiac_ = new zodiac();

    const userinfo = await new account().getCusByID(idUser);
    const avatar = await zodiac_.getAvatarByID(userinfo[0].idZodiac);

    const user = userinfo[0];
    delete user.password;

    user.avatar = avatar;
    var time = new MyDate(user.birth.toString());
    user.birth = time.toMyLocaleDateString();

    return {
      errCode: 0,
      errMessage: "OK",
      user: user,
    };
  } catch (err) {
    throw err;
  }
};

let handleGetListIdZodiacByIdUser = async (idUser) => {
  try {
    const idZodiac = await new account().getListIdZodiacByIdUser(idUser);

    return {
      errCode: 0,
      errMessage: "OK",
      idZodiac: idZodiac,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  handleUserLogin: handleUserLogin,
  handleGetInfo: handleGetInfo,
  handleGetInfoByID: handleGetInfoByID,
  handleUserSignUp: handleUserSignUp,
  handleAddFriendRelation: handleAddFriendRelation,
  handleChangePassword: handleChangePassword,
  handleCheckFriendRelation: handleCheckFriendRelation,
  handleEditProfile: handleEditProfile,
  handleGetUserBySearch: handleGetUserBySearch,
  handleGetListUser: handleGetListUser,
  handleGetListAccReported: handleGetListAccReported,
  handleDeleteUserByAdmin: handleDeleteUserByAdmin,
  handleGetUserByAdmin: handleGetUserByAdmin,
  handleEditProfileBrief: handleEditProfileBrief,
  handleGetListIdZodiacByIdUser: handleGetListIdZodiacByIdUser,
};
