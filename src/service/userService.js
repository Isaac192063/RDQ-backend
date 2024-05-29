const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const { sendError, MESSAGE, sendResponseOk } = require("../others/response");
const jwt = require("jsonwebtoken");
const { key } = require("../config/key");
const { deleteImage } = require("../others/deleteImage");

async function newUser(user, res) {
  try {
    const password_encrypted = await bcrypt.hash(user.password, 10);
    user.password = password_encrypted;

    const rol = await prisma.rol.findFirst({
      where: { id: parseInt(user.rol) },
    });

    if (!rol) {
      throw new Error("Rol no encontrado");
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
      throw new Error("Este email ya fue registrado");
    }

    throw new Error("solicitud incorrecta");
  }
}

async function getAllUsers(res) {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error(MESSAGE.ERROR_SERVIDOR);
  }
}

async function loginUser(res, password, email) {
  try {
    const userEmail = await prisma.user.findFirst({ where: { email } });

    if (!userEmail) {
      throw new Error("usuario no encontrado");
    }

    const userComparation = await bcrypt.compare(password, userEmail.password);

    if (!userComparation) {
      throw new Error("Contraseña incorrecta");
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
      throw new Error(error.message);
    }
    throw new Error("solicitud incorrecta");
  }
}

async function getUserById(id, res) {
  try {
    const user = await prisma.user.findFirst({ where: { id: id } });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  } catch (error) {
    if (error.message) {
      throw new Error(error.message);
    }
    throw new Error("solicitud incorrecta");
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
    throw new Error("solicitud incorrecta");
  }
}
async function updateUser(id, req, newUser) {
  try {
    let imageFile;

    const user = await prisma.user.findFirst({
      where: { id: parseInt(id) },
    });

    if (!user) {
      throw new Error("Empledo no fue encontrado");
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
      throw new Error("El email ya esta en uso");
    }else if (error.message) {
      throw new Error(error.message);
    }
    throw new Error("solicitud incorrecta");
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
      throw new Error("Usuario no encontrado");
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
      throw new Error(error.message);
    }
    throw new Error(MESSAGE.ERROR_SERVIDOR);
  }
}

async function findUserName(name) {
  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    return users;
  } catch (error) {
    throw new Error(MESSAGE.ERROR_SERVIDOR);
  }
}

module.exports = { newUser, getAllUsers, loginUser, getUserById, getAllEmployes, updateUser, deleteUser, findUserName };
