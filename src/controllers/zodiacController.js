import zodiacService from "../services/zodiacService";

const getListZodiac = async(req,res)=>{
    try{
        const zodiacData = await zodiacService.handleGetListZodiac();
        console.log(zodiacData);
        return res.status(200).json(zodiacData);
    }
    catch(err){
        return res.status(400).json(err);
    }
}

const getZodiacById = async(req,res)=>{
    try{
        if(req.query.id){
            const data = await zodiacService.handleZodiacById(req.query.id);
            return res.status(200).json(data);
        }
        else return res.status(400).json({errCode: 1, errMessage: 'Missing input parameters'});
    }
    catch(err){
        return res.status(400).json(err);
    }
}

module.exports = {
    getListZodiac,
    getZodiacById
}