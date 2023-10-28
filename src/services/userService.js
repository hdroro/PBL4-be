const account = require('../models/account');

let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            const user = new account(username, password);
            const idUser = await user.getIdAccount(username);
            let userCheck = await user.checkUsername();
            if (userCheck) {
                let passwordCheck = await user.checkPassword(password);

                if (!!passwordCheck) {
                    userData.errCode = 0;
                    userData.errMessage = 'OK';

                    delete user.password;
                    userData.user = user;
                    userData.idUser = idUser;
                }
                else {
                    userData.errCode = 3;
                    userData.errMessage = 'Wrong password';
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = `User not found`;
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetInfo = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userDataInfo = {};
            const user = new account(username);

            const userinfo = await user.getCusAcc(username);

            userDataInfo.errCode = 0;
            userDataInfo.errMessage = 'OK';

            delete userinfo.password;
            userDataInfo.user = userinfo;

            resolve(userDataInfo);
        } catch (error) {
            reject(error);
        }
    })
}

let handleGetInfoByID = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userDataInfo = {};
            const user = new account();

            const userinfo = await user.getCusByID(idUser);

            userDataInfo.errCode = 0;
            userDataInfo.errMessage = 'OK';

            delete userinfo.password;
            userDataInfo.user = userinfo;

            resolve(userDataInfo);
        } catch (error) {
            reject(error);
        }
    })
}




module.exports = {
    handleUserLogin: handleUserLogin,
    handleGetInfo: handleGetInfo,
    handleGetInfoByID: handleGetInfoByID
}