const prisma = require("../config/prisma");
const CustomError = require("../others/customErrors");

async function newCustomer(customer) {
  try {
    const da = customer.birthDate;
    customer.birthDate = new Date(da).toISOString();
    const newCustomer = await prisma.customer.create({
      data: customer,
      include: {
        city: true,
      },
    });

    return newCustomer;
  } catch (error) {
    console.log(error);
    if (error.code == "P2002") {
      throw new CustomError("Este email ya fue registrado", 409);
    }
    throw new CustomError("solicitud incorrecta", 500);
  }
}

async function getAllCustomers() {
  try {
    const newCustomer = await prisma.customer.findMany({
      include:{
        city: true
      }
    });

    return newCustomer;
  } catch (error) {
    throw new CustomError("Error en el servidor", 500);
  }
}

async function getCustomerByid(id) {
  try {
    const newCustomer = await prisma.customer.findFirst({
      where: {
        identification: id,
      },
      include:{
        city: true
      }
    });

    if (!newCustomer) {
      throw new CustomError("No se encontro el cliente buscado", 404);
    }

    return newCustomer;
  } catch (error) {
    if (error.message) {
      throw new CustomError(error.message, error.statusCode);
    }
    throw new CustomError("Error en el servidor", 500);
  }
}

async function updateCustomer(id, customer) {
  try {
    const newuser = await prisma.customer.findFirst({
      where: {
        identification: id,
      },
    });

    if (!newuser) {
      throw new CustomError("No se encontro el cliente a actualizar", 404);
    }


    const newCustomer = await prisma.customer.update({
      where: {
        identification: id,
      },
      data: {
        first_name: customer.first_name,
        middle_name: customer.middle_name,
        last_name: customer.last_name,
        last_name_2: customer.last_name_2,
        address: customer.address,
        neighborhood: customer.neighborhood,
        phone_number: customer.neighborhood,
        cty_id: customer.cty_id,
        dpt_cty_id: customer.dpt_cty_id,
        warranty: customer.warranty
      },
    });

    return newCustomer;
  } catch (error) {
    if (error.message) {
      throw new CustomError(error.message, error.statusCode);
    }
    throw new CustomError("Error en el servidor", 500);
  }
}

async function deleteCustomer(id) {
  try {
    const newuser = await prisma.customer.findFirst({
      where: {
        identification: id,
      },
    });

    if (!newuser) {
      throw new CustomError("No se encontro el cliente a eliminar", 404);
    }

    const newCustomer = await prisma.customer.update({
      where: {
        identification: id,
      },
      data: {
        state: !newuser.state,
      },
    });

    return newCustomer;
  } catch (error) {
    if (error.message) {
      throw new CustomError(error.message, error.statusCode);
    }
    throw new CustomError("Error en el servidor", 500);
  }
}

module.exports = {
  newCustomer,
  getAllCustomers,
  getCustomerByid,
  updateCustomer,
  deleteCustomer
};
