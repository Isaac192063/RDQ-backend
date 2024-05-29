const { deleteImage } = require("../others/deleteImage");
const { sendError, MESSAGE } = require("../others/response");
const {
  newUser,
  getAllUsers,
  loginUser,
  getUserById,
  getAllEmployes,
  updateUser,
  deleteUser,
  findUserName,
} = require("../service/userService");

module.exports = {
  async getAllUsers(req, res, next) {
    try {
      const users = await getAllUsers(res);
      if (users) {
        res.status(200).json({
          success: true,
          data: users,
        });
      }
    } catch (error) {
      return sendError(res, error.message, 500);
    }
  },
  async createUser(req, res, next) {
    try {
      const user = req.body;

      if (req.file) {
        const file = req.file;
        user.image = file.filename;
      }

      const nUser = await newUser(user, res);

      if (nUser) {
        res.status(201).json({
          success: true,
          data: nUser,
          message: "empleado registrado",
        });
      }
    } catch (error) {
      console.log(error)
      return sendError(res, error.message, 401);
    }
  },
  async loginUser(req, res, next) {
    try {
      const { password, email } = req.body;

      const userLogin = await loginUser(res, password, email);

      if (userLogin) {
        return res.status(203).json({
          success: true,
          message: "usuario autenticado",
          token: userLogin,
        });
      }
    } catch (error) {
      return sendError(res, error.message, 401);
    }
  },
  async getUserById(req, res, next) {
    try {
      const id_user = parseInt(req.params.id);

      const user = await getUserById(id_user);

      return res.status(200).json({
        success: true,
        message: "usuario encontrado",
        data: user,
      });
    } catch (error) {
      sendError(res, error.message, 401);
    }
  },
  async getAllEmployes(req, res) {
    try {
      console.log("first");
      const employes = await getAllEmployes();
      res.status(200).json({
        success: true,
        data: employes,
      });
    } catch (error) {
      return sendError(res, error.message, 500);
    }
  },
  async updateUser(req, res) {
    try {
      const newUser = req.body;
      const id = req.params.id;

      await updateUser(id, req, newUser);

      return res.status(203).json({
        success: true,
        message: "Informacion del empleado actualizada",
      });
    } catch (error) {
      sendError(res, error.message, 500);
    }
  },
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await deleteUser(id);

      return res.status(200).json({
        message: "empleado eliminado",
        success: true,
      });
    } catch (error) {
      return sendError(res, error.message, 500);
    }
  },
  async findUserName(req, res) {
    const name = req.query.name;
    console.log(name);
    try {
      const users = await findUserName(name);

      return res.status(200).json(users);
    } catch (error) {
      return sendError(res, error.message, 500);
    }
  },
};
