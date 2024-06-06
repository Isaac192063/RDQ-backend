const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const {  MESSAGE } = require("../others/response");
const jwt = require("jsonwebtoken");
const { key } = require("../config/key");
const { deleteImage } = require("../others/deleteImage");
const CustomError = require("../others/customErrors");

async function newUser(user, res) {
  try {
    const password_encrypted = await bcrypt.hash(user.password, 10);
    user.password = password_encrypted;

    const rol = await prisma.rol.findFirst({
      where: { id: parseInt(user.rol) },
    });

    if (!rol) {
      throw new CustomError("Rol inexistente", 400);
    }

    const aux_rol = user.rol;
    delete user.rol;

    user.rol_id = parseInt(aux_rol);

    const newUser = await prisma.user.create({
      data: user,
    });

    return newUser;
  } catch (error) {
    if (error.code == "P2002") {
      throw new CustomError("Este email ya fue registrado", 409);
    }else if(error.message){
      throw new CustomError(error.message, error.statusCode);
    }

    throw new CustomError("Error en el servidor", 500);
  }
}

async function getAllUsers(res) {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new CustomError(MESSAGE.ERROR_SERVIDOR, 500);
  }
}

async function loginUser(res, password, email) {
  try {
    const userEmail = await prisma.user.findFirst({ where: { email } });

    if (!userEmail) {
      throw new CustomError("usuario no encontrado", 404);
    }

    const userComparation = await bcrypt.compare(password, userEmail.password);

    if (!userComparation) {
      throw new CustomError("Contraseña incorrecta", 401);
    }

    const user = await prisma.user.findFirst({
      where: { id: userEmail.id },
      include: { rolUser: true },
    });
    const rol = await prisma.rol.findFirst({ where: { id: user.rol_id } });

    const token = jwt.sign({ id: userEmail.id, rol: rol.name }, key);

    return token;
  } catch (error) {
    if (error.message) {
      throw new CustomError(error.message, error.statusCode);
    }
    throw new CustomError("Error en el servidor", 500);
  }
}

async function getUserById(id, res) {
  try {
    const user = await prisma.user.findFirst({ where: { id: id } });

    if (!user) {
      throw new CustomError("Usuario no fue encontrado", 404);
    }
    return user;
  } catch (error) {
    if (error.message) {
      throw new CustomError(error.message, error.statusCode);
    }
    throw new CustomError("Error en el servidor", 500);
  }
}

async function getAllEmployes() {
  try {
    const employes = await prisma.user.findMany({
      where: {
        rol_id: 1,
      },
      orderBy: {
        id: "desc",
      },
    });
    return employes;
  } catch (error) {
    throw new CustomError("Error en el servidor", 500);
  }
}
async function updateUser(id, req, newUser) {
  try {
    let imageFile;

    const user = await prisma.user.findFirst({
      where: { id: parseInt(id) },
    });

    if (!user) {
      throw new CustomError("Empledo no fue encontrado", 404);
    }

    const password_encrypted = await bcrypt.hash(newUser.password, 10);

    if (req.file) {
      console.log("Eliminando imagen...");
      deleteImage(user.image);
      imageFile = req.file.filename;
    }

    const updateEmployee = await prisma.user.update({
      where: {
        id: parseInt(id),
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

    return updateEmployee;
  } catch (error) {
    if (error.code == "P2002") {
      throw new CustomError("El email ya esta en uso", 409);
    }else if (error.message) {
      throw new CustomError(error.message, error.statusCode);
    }
    throw new CustomError("Error en el servidor", 500);
  }
}

async function deleteUser(id) {
  try {
    const userDelete = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!userDelete) {
      throw new CustomError("Usuario no encontrado", 404);
    }

    const updatedStatus = await prisma.user.update({
      where: { id: userDelete.id },
      data: {
        enabled: !userDelete.enabled,
      },
    });
    return updatedStatus;
  } catch (error) {
    if(error.message){
      throw new CustomError(error.message, error.statusCode);
    }
    throw new CustomError(MESSAGE.ERROR_SERVIDOR, 500);
  }
}

async function findUserName(name) {
  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        },
      },
    });
    return users;
  } catch (error) {
    throw new CustomError(MESSAGE.ERROR_SERVIDOR, 500);
  }
}

module.exports = { newUser, getAllUsers, loginUser, getUserById, getAllEmployes, updateUser, deleteUser, findUserName };
