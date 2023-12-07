const db = require('../config/conectDB');

class Zodiac_Compatibility {
    constructor(idZodiacCompatibility, idZodiac1, idZodiac2, rate) {
        this.idZodiacCompatibility = idZodiacCompatibility;
        this.idZodiac1 = idZodiac1;
        this.idZodiac2 = idZodiac2;
        this.rate = rate;
    }

    async getRateCompatibility(idZodiac) {
        return new Promise((resolve, reject) => {
            const query = `select * from zodiac_compatibility where idZodiac1 = ? order by rate DESC`;
            db.query(query, [idZodiac], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }
}

module.exports = Zodiac_Compatibility;