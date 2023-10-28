const account = require('../models/account');
const zodiac = require('../models/zodiac');

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

let handleUserSignUp = (username, password, fullname, birth, gender) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userDataInfo = {};
            const user = new account(username);
            let userCheck = await user.checkUsername(username);
            if(!userCheck) {
                let month = birth.substr(5, 2);
                let date = birth.substr(8, 2);
                if(date[0] == '0') {
                    date = parseInt(date[1]);
                } else {
                    date = parseInt(date);
                }
                if(month[0] == '0') {
                    month = parseInt(month[1]);
                } else {
                    month = parseInt(month);
                }
                let idZodiac = await new zodiac().getIdZodiac(date, month);
                if(idZodiac) {
                    let addUserCheck = await user.addAccount(username, password, fullname, birth, gender, idZodiac);
                    if(addUserCheck) {
                        userDataInfo.errCode = 0;
                        userDataInfo.errMessage = 'Sign up successfully!';
                    } else {
                        userDataInfo.errCode = 1;
                        userDataInfo.errMessage = 'Failed add account user!';
                    }
                } else {
                    userDataInfo.errCode = 2;
                    userDataInfo.errMessage = 'Can not find id zodiac!';
                }
                
            } else {
                userDataInfo.errCode = 3;
                userDataInfo.errMessage = 'Username have already existed!';
            }

            resolve(userDataInfo);
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    handleGetInfo: handleGetInfo,
    handleGetInfoByID: handleGetInfoByID,
    handleUserSignUp: handleUserSignUp,
}