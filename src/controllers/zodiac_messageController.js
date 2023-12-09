import zodiacMessageService from "../services/zodiac_messageService";

const getZodiacMessageByIdUser = async(req,res)=>{
    try{
        // if(req.query.idUser && req.session.idUser && req.query.idUser == req.session.idUser){
        if(req.query.idUser){
            const idUser = req.query.idUser;
            const listMessage = await zodiacMessageService.handleGetZodiacMessageByIdUser(idUser);
            return res.status(200).json(listMessage);
        }
        else return res.status(400).json({errCode: 1, errMessage:"Thiếu tham số hoặc không phù hợp user"});
    }
    catch(err){
        return res.status(400).json(err);
    }
}

const readZodiacMessage = async(req,res)=>{
    try{
        // if(req.query.idUser && req.session.idUser && req.query.idUser == req.session.idUser){
        if(req.body.id){
            const id = req.body.id;
            const message = await zodiacMessageService.handleReadZodiacMessage(id);
            return res.status(200).json(message);
        }
        else return res.status(400).json({errCode: 1, errMessage:"Thiếu tham số hoặc không phù hợp user"});
    }
    catch(err){
        return res.status(400).json(err);
    }
}

const getAllZodiacMessage = async(req,res)=>{
    try{
        const page = req.query.page;
        const listMessage = await zodiacMessageService.getAllZodiacMessage(page);
        return res.status(200).json(listMessage);
    }
    catch(err){
        return res.status(400).json(err);
    }
}

const getZodiacMessageDetail = async(req,res)=>{
    try{
        if(req.query.id){
            const idZodiacMessage = req.query.id;
            const listMessage = await zodiacMessageService.handleGetZodiacMessageById(idZodiacMessage);
            return res.status(200).json(listMessage);
        }
        else return res.status(400).json({errCode: 1, errMessage:"Thiếu tham số"});
    }
    catch(err){
        return res.status(400).json(err);
    }
}

const createZodiacMessage = async(req,res)=>{
    try{
        if(req.body.idZodiac && req.body.content){
            const idZodiac = req.body.idZodiac;
            const content = req.body.content;
            const message = await zodiacMessageService.handleCreateZodiacMessage(idZodiac,content);
            return res.status(200).json(message);
        }
        else return res.status(400).json({errCode: 1, errMessage:"Thiếu tham số"});
    }
    catch(err){
        return res.status(400).json(err);
    }
}

module.exports = {
    getZodiacMessageByIdUser,
    getAllZodiacMessage,
    createZodiacMessage,
    getZodiacMessageDetail,
    readZodiacMessage
}