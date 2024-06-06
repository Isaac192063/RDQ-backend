const prisma = require("../config/prisma");
const CustomError = require("../others/customErrors");

async function getAllCity(){
    try {
        const cities = await prisma.city.findMany({
          include:{
            departament: true
          }
        });
    
        return cities;
      } catch (error) {
        console.log("first")
        throw new CustomError("Error en el servidor", 500);
      }
}

async function findCityByName(name){
    try {
        const cities = await prisma.city.findMany({
          where: {
            name: {
              contains: name,
              mode: 'insensitive'
            },
          },
          include:{
            departament: true
          }
        });
        return cities;
      } catch (error) {
        throw new CustomError("Error en el servidor", 500);
      }
}

module.exports = {
    getAllCity, findCityByName
}