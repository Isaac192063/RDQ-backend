const { Router } = require("express");
const employeeController = require("../controllers/user.controller");
const prisma = require("../config/prisma");
const multer = require("../config/multer");

const routerUser = Router();

routerUser.get("/api/user", employeeController.getAllUsers);
routerUser.post(
  "/api/user",
  multer.single("image"),
  employeeController.createUser
);
routerUser.get("", (req, res)=>{
  res.send("hello world")
})
routerUser.post("/api/user/login", employeeController.loginUser);
routerUser.get("/api/user/emp", employeeController.getAllEmployes);
routerUser.get("/api/user/:id", employeeController.getUserById);
routerUser.put("/api/user/:id", async (req, res) => {
  try {
    const newUser = req.body;
    const id = req.params.id;

    const updateEmployee = await prisma.user.update({
      where: {
        id_user: parseInt(id),
      },
      data: {
        name: newUser.name,
        last_name: newUser.last_name,
        phone_number: newUser.phone_number,
      },
    });

    res.status(203).json(updateEmployee);
  } catch (error) {
    console.log(error)
    res.status(500).json({
        "message": "error"
    })
  }
});
module.exports = routerUser;
