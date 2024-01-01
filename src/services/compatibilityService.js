const Conversation = require("../models/conversation");
const Zodiac_compatibility = require("../models/zodiac_compatibility");
const Account = require("../models/account");

async function handleGetRandomUserMatching(idUser, onlineUsers) {
  try {
    let randomData = {};
    const accountModel = new Account();
    const userData = await accountModel.getCusByID(idUser); // lay thong tin user
    const idZodiac = userData[0].idZodiac;

    const compatibilityModel = new Zodiac_compatibility();
    let Listcompatibility = await compatibilityModel.getRateCompatibility(
      idZodiac
    ); // lay ra danh sach idZodiac tuong thich
    Listcompatibility = Array.from(Listcompatibility);
    console.log("zodiac", Listcompatibility);

    let ListUserDataOnline = [];
    onlineUsers = onlineUsers.filter(item => {
      if(item.userID != 0) return item;
    })

    for (let i = 0; i < onlineUsers.length; i++) {
      const conversationModel = new Conversation(
        "",
        idUser,
        onlineUsers[i].userID
      );
      const conversationCheck =
        await conversationModel.checkExistedConversation();
      if (!conversationCheck) {
        const userMatchData = await accountModel.getCusByID(
          onlineUsers[i].userID
        );
        if (userMatchData) {
          ListUserDataOnline = [
            ...ListUserDataOnline,
            {
              idUser: userMatchData[0].idUser,
              idZodiac: userMatchData[0].idZodiac,
            },
          ];
        } else {
          randomData.errCode = 1;
          randomData.errMessage = "User match khong ton tai!";
          return randomData;
        }
      }
    }

    if (ListUserDataOnline.length === 0) {
      randomData.errCode = 2;
      randomData.errMessage =
        "Hien khong co user nao online thich hop de matching!";
      return randomData;
    }
    console.log("online: ", ListUserDataOnline);
    let number;
    if (ListUserDataOnline.length <= 10) {
      number = Math.ceil(ListUserDataOnline.length * 0.7);
    } else if (ListUserDataOnline.length <= 20) {
      number = Math.ceil(ListUserDataOnline.length * 0.65);
    } else if (ListUserDataOnline.length <= 30) {
      number = Math.ceil(ListUserDataOnline.length * 0.6);
    } else if (ListUserDataOnline.length <= 40) {
      number = Math.ceil(ListUserDataOnline.length * 0.55);
    } else if (ListUserDataOnline.length <= 50) {
      number = Math.ceil(ListUserDataOnline.length * 0.5);
    } else {
      number = Math.ceil(ListUserDataOnline.length * 0.4);
    }
    console.log("number: ", number);
    let count = 1;
    let res = [];
    for (let i = 0; i < Listcompatibility.length; i++) {
      for (let j = 0; j < ListUserDataOnline.length; j++) {
        if (Listcompatibility[i].idZodiac2 == ListUserDataOnline[j].idZodiac) {
          res = [...res, ListUserDataOnline[j]];
          count++;
        }
        if (count > number) break;
      }
      if (count > number) break;
    }
    console.log("res array matching: ");
    console.log(res);
    const randomIndex = Math.floor(Math.random() * res.length);
    randomData.errCode = 0;
    randomData.errMessage = "OK!";
    randomData.dataUser = res[randomIndex];
    console.log("user match random:");
    console.log(res[randomIndex]);
    return randomData;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  handleGetRandomUserMatching,
};
