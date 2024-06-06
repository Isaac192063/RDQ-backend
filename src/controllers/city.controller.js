const { sendError } = require("../others/response");
const { findCityByName, getAllCity } = require("../service/cityService");

module.exports ={
    async getAllCities(req,res){
        try {
            const cities = await getAllCity();
      
            return res.status(200).json(cities);
          } catch (error) {
            console.log(error)
            return sendError(res, error.message, 500);
          }
    },
    async getCityByName(req,res){
        try {

            const name = req.query.name;
            const cities = await findCityByName(name);
            console.log(cities.length)
      
            return res.status(200).json(cities);
          } catch (error) {
            return sendError(res, error.message, 500);
          }
    }
}