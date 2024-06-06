const { Router } = require("express");
const cityController = require("../controllers/city.controller");
const routerCity = Router();

routerCity.get("", cityController.getAllCities);

routerCity.get("/search", cityController.getCityByName);

module.exports = routerCity;
