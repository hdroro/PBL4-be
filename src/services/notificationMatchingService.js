const Notification_Matching = require('../models/notification_matching');

async function handleGetNotificationMatching(idUser) {
    try {
        const notifData = {};
        const notifModel = new Notification_Matching();
        const notifList = await notifModel.getListNotificationMatching(idUser);
        notifData.errCode = 0;
        notifData.errMessage = 'OK';
        notifData.data = notifList;
        return notifData;
    } catch (e) {
        throw e;
    }
}

async function handleAddNotificationMatching(idAcc1, idAcc2) {
    try {
        const notifData = {};
        const notifModel = new Notification_Matching();
        const notifId = await notifModel.save(idAcc1, idAcc2);
        notifData.errCode = 0;
        notifData.errMessage = 'OK';
        notifData.data = notifId;
        console.log("Notif id: ", notifId);
        return notifData;
    } catch (err) {
        return err;
    }
}

async function handleSetDenyNotificationMatching(idNotificationMatching) {
    try {
        const notifData = {};
        const notifModel = new Notification_Matching();
        const notifCheck = await notifModel.setDeny(idNotificationMatching);
        if(notifCheck) {
            notifData.errCode = 0;
            notifData.errMessage = 'OK';
        }
        else {
            notifData.errCode = 1;
            notifData.errMessage = "Can not set deny notification matching!";
        }
        return notifData;
    } catch (err) {
        return err;
    }
}

async function handleSetReadNotificationMatching(idNotificationMatching) {
    try {
        const notifData = {};
        const notifModel = new Notification_Matching();
        const notifCheck = await notifModel.setRead(idNotificationMatching);
        if(notifCheck) {
            notifData.errCode = 0;
            notifData.errMessage = 'OK';
        }
        else {
            notifData.errCode = 1;
            notifData.errMessage = "Can not set read notification matching!";
        }
        return notifData;
    } catch (err) {
        return err;
    }
}

async function handleGetCountNotReadNotificationMatching(idAcc1) {
    try {
        const notifData = {};
        const notifModel = new Notification_Matching();
        const data = await notifModel.getCountNotRead(idAcc1);
        console.log(data);
        console.log('get count');
        console.log(data[0].count);
        notifData.errCode = 0;
        notifData.errMessage = 'OK';
        notifData.data = data[0].count;
        
        return notifData;
    } catch (err) {
        return err;
    }
}

async function handleGetDetailNotificationMatching(idNotificationMatching, idAcc1, idAcc2) {
    try {
        const notifData = {};
        const notifModel = new Notification_Matching();
        const notifInfo = await notifModel.getDetailNotificationMatching(idNotificationMatching, idAcc1, idAcc2);
        if(notifInfo) {
            notifData.errCode = 0;
            notifData.errMessage = 'OK';
            notifData.data = notifInfo[0];
        }
        else {
            notifData.errCode = 1;
            notifData.errMessage = "Can not get detail info of notification matching!";
        }
        return notifData;
    } catch (err) {
        return err;
    }
}

module.exports = {
    handleGetNotificationMatching,
    handleAddNotificationMatching,
    handleSetDenyNotificationMatching,
    handleSetReadNotificationMatching,
    handleGetCountNotReadNotificationMatching,
    handleGetDetailNotificationMatching,
};
