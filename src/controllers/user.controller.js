const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");
const { key } = require("../config/key");
const { deleteImage } = require("../others/deleteImage");
const bcrypt = require("bcrypt");
const {sendError, MESSAGE} = require("../others/errors");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
    }
  },
  async createUser(req, res) {
    try {
      const user = req.body;

      if(req.file){

        const file = req.file;
        user.image = file.filename;
      }


      const password_encrypted = await bcrypt.hash(user.password, 10);
      user.password = password_encrypted;

      const rol = await prisma.rol.findFirst({
        where: { id_rol: parseInt(user.rol) },
      });

      if (!rol) {
        return   sendError(res, MESSAGE.BAD_REQUEST, 400);
      }
      const aux_rol = user.rol;
      delete user.rol;

      user.idRol = parseInt(aux_rol);

      const newUser = await prisma.user.create({
        data: user,
      });

      res.status(201).json({
        success: true,
        data: newUser,
        message: "empleado registrado",
      });
    } catch (error) {
      return  sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
    }
  },
  async loginUser(req, res) {
    try {
      const { password, email } = req.body;

      const userEmail = await prisma.user.findFirst({ where: { email } });

      if (!userEmail) {
        return sendError(res, "usuario no encontrado", 404);
      }
      
      const userComparation = await bcrypt.compare(
        password,
        userEmail.password
      );
      
      if (!userComparation) {
        return sendError(res, "Contraseña incorrecta", 401);
      }

      const user = await prisma.user.findFirst({
        where: { id_user: userEmail.id_user },
        include: { rolUser: true },
      });
      const rol = await prisma.rol.findFirst({ where: { id_rol: user.idRol } });

      const token = jwt.sign({ id: userEmail.id_user, rol: rol.name }, key);

      return res.status(203).json({
        success: true,
        message: "usuario autenticado",
        token: token,
      });
    } catch (error) {
      return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
    }
  },
  async getUserById(req, res) {
    try {
      const id_user = parseInt(req.params.id);
      const user = await prisma.user.findFirst({ where: { id_user } });

      if (!user) {
        return res.status(203).json({
          success: false,
          message: "usuario no encontrado",
        });
      }

      return res.status(200).json({
        success: true,
        message: "usuario encontrado",
        data: user,
      });
    } catch (error) {
      return res.status(203).json({
        success: false,
        message: "Error en el servidor",
      });
    }
  },
  async getAllEmployes(req, res) {
    try {
      const employes = await prisma.user.findMany({
        where: {
          idRol: 1,
        },
        orderBy: {
          id_user: "desc",
        },
      });
        console.log(employes);
      res.status(200).json({
        success: true,
        data:employes,
      });
    } catch (error) {
      return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
    }
  },
  async updateUser(req, res) {
    try {
      const newUser = req.body;
      const id = req.params.id;
      let imageFile;

      const user = await prisma.user.findFirst({
        where: { id_user: parseInt(id) },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Empledo no fue encontrado",
        });
      }

      const password_encrypted = await bcrypt.hash(newUser.password, 10);

      if (req.file) {
        console.log("Eliminando imagen...");
        deleteImage(user.image);
        imageFile = req.file.filename;
      }

      const updateEmployee = await prisma.user.update({
        where: {
          id_user: parseInt(id),
        },
        data: {
          name: newUser.name,
          last_name: newUser.last_name,
          phone_number: newUser.phone_number,
          password: password_encrypted,
          email: newUser.email,
          image: imageFile,
        },
      });

      res.status(203).json({
        success: true,
        message: "Informacion del empleado actualizada",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        sucess: false,
        message:
          "Error al actualizar la información del empleado. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  },
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const userDelete = await prisma.user.findFirst({
        where: {
          id_user: parseInt(id),
        },
      });

      if (!userDelete) {
        return sendError(res, "Usuario no encontrado", 401);
      }

      const updatedStatus = await prisma.user.update({
        where: { id_user: userDelete.id_user },
        data: {
          enabled: !userDelete.enabled,
        },
      });

      return res.status(200).json({
        message: "empleado eliminado",
        success: true,
      });
    } catch (error) {
      return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
    }
  },
  async findUserName(req, res) {
    const name = req.query.name;
    console.log(name);
    try {
      
      const users = await prisma.user.findMany({
        where: {
          name: {
            contains: name,
          },
          idRol: 1,
        },
      });
    
      return res.status(200).json(users);

    } catch (error) {
      return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
    }

  },
};
