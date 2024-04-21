const {Router} = require('express')
const employeeController = require('../controllers/user.controller')
const prisma = require('../config/prisma')
const multer = require('../config/multer')

const routerUser = Router()


routerUser.get("/api/user",  employeeController.getAllUsers)
routerUser.post("/api/user", multer.single('image'), employeeController.createUser)
routerUser.post("/api/user/login", employeeController.loginUser)
routerUser.get("/api/user/emp", employeeController.getAllEmployes)
routerUser.get("/api/user/:id", employeeController.getUserById)
module.exports = routerUser