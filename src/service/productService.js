const prisma = require("../config/prisma");
const CustomError = require("../others/customErrors");

async function newProduct(content, typePackaging, packaging) {
  try {
    const createdTypePackaging = await prisma.typePackaging.findFirst({
      where: { cod: typePackaging.cod },
    });

    const createdContent = await prisma.content.findFirst({
      where: { id: content.id },
    });

    const createdPackaging = await prisma.packaging.create({
      data: {
        id: packaging.id,
        hydrostatic_date: new Date(packaging.hydrostatic_date).toISOString(),
        owner: packaging.owner,
        ctt_id: createdContent.id,
        tpg_cod: createdTypePackaging.cod,
      },
      include: {
        typePackaging: true,
        content: true,
      },
    });

    return createdPackaging;
  } catch (error) {
    console.log(error);
    throw new Error(`Error al crear el empaque: ${error.message}`);
  }
}

async function getByProductId(id) {
  try {
    
    const product = await prisma.packaging.findFirst({
      where: {
        id: id,
      },
      include: {
        content: true,
        typePackaging: true,
      },
    });

    if(!product){
      throw new CustomError("No se encontro el prouducto buscado", 404);
    }
  
    return product;
  } catch (error) {
    if(error.message){
      throw new CustomError(error.message, error.statusCode);

    }
    throw new CustomError("Error en el servidor", 500);
  }
}

async function getAllProducts() {
  try {
    const products = await prisma.packaging.findMany({
      include: {
        content: true,
        typePackaging: true,
      },
    });

    return products;
  } catch (error) {
    throw new CustomError("Error en el servidor", 500);
  }
}

async function updateProduct(id, product) {
  try {
  } catch (error) {}
}

async function getProductByCod(cod){
  try {
    console.log("first")
    const products = await prisma.packaging.findMany({
      where:{
        id:{
          contains:cod,
          mode: 'insensitive'
        }
      },
      include: {
        content: true,
        typePackaging: true,
      },
    });

    return products;
  } catch (error) {
    throw new CustomError("Error en el servidor", 500);
  }
}
module.exports = { newProduct, getByProductId, getAllProducts, getProductByCod };
