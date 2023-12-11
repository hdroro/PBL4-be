const Zodiac = require('../models/zodiac');

async function handleGetListZodiac(){
    try{
        const zodiacModel =new Zodiac();
        const listZodiac = await zodiacModel.getListZodiac();
        return {
            errCode: 0,
            errMessage: "OK",
            listZodiac: listZodiac,
        }
    }
    catch(err){
        throw err;
    }
}

async function handleZodiacById(id){
    try{
        const zodiacModel = new Zodiac();
        const zodiacData = await zodiacModel.getZodiacById(id);
        return {
            errCode: 0,
            errMessage: "OK",
            data: zodiacData,
        }
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    handleGetListZodiac,
    handleZodiacById
}