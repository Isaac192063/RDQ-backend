const { Router } = require("express");
const employeeController = require("../controllers/user.controller");
const prisma = require("../config/prisma");
const multer = require("../config/multer");

const routerUser = Router();

routerUser.get("", employeeController.getAllUsers);
routerUser.get("/search",employeeController.findUserName );
routerUser.post("", multer.single("image"),employeeController.createUser);
routerUser.post("/login", employeeController.loginUser);
routerUser.get("/emp", employeeController.getAllEmployes);
routerUser.get("/:id", employeeController.getUserById);
routerUser.put("/:id",multer.single("image"), employeeController.updateUser);
routerUser.delete("/:id", employeeController.deleteUser);

module.exports = routerUser;
