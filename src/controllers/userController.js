import userService from '../services/userService';

const handleLoging = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    req.session.user_session = { username: username };
    req.session.isAuth = true;
    req.session.save();
    console.log("kkk " + req.session.user_session);

    if (!username || !password) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing inputs parameter!.',
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
}

const getMatching = async (req, res) => {
    if (req.session.user_session) {
        const user = req.session.user_session; 
        const userData = await userService.handleGetInfo(user.username);
    
        return res.status(200).json({ userData });
    } else {
        return res.status(400).json({ error: 'Người dùng không tồn tại' });
    }
}

const getInfoByID = async (req, res) => {
    if (req.query.idUser) {
        const userData = await userService.handleGetInfoByID(req.query.idUser);
    
        return res.status(200).json({ userData });
    } else {
        return res.status(400).json({ error: 'Người dùng không tồn tại' });
    }
}


const handleSignup = async (req, res) => {
    const {username, password, fullname, date, gender} = req.body;
    if(!username || !password || !fullname || !date) {
        return res.status(200).json({
            errCode: 4,
            message: 'Missing inputs parameter!.',
        });
    }
    const userData = await userService.handleUserSignUp(username, password, fullname, date, gender);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
    
}
module.exports = {
    handleLoging: handleLoging,
    getMatching: getMatching,
    getInfoByID: getInfoByID,
    handleSignup: handleSignup,
}