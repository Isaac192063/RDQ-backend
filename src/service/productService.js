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
    if(error.meta){
      throw new CustomError(`El ${error.meta.target} del ${error.meta.modelName} ya existe`, 400);
    }
    throw new CustomError("Error en el servidor", 500);
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
      orderBy:{
        owner: 'desc'
      }
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

async function updateProduct(id, content, typePackaging, packaging) {
  try {

    const productSearch = await prisma.packaging.findFirst({
      where: {id: id}
    });

    if(!productSearch){
      throw new CustomError(`No se encontro el envase`, 404);
    }

    const updatedPackaging = await prisma.packaging.update({
      where: { id: id },
      data: {
        hydrostatic_date: new Date(packaging.hydrostatic_date).toISOString(),
        owner: packaging.owner,
        ctt_id: content.id,
        tpg_cod: typePackaging.cod,
        },
        include: {
          typePackaging: true,
          content: true,
      },
    });

    return updatedPackaging;
  } catch (error) {
    console.log(error);
    if(error.message){

      throw new CustomError(error.message, error.statusCode);
      }
    throw new CustomError(`Error al actualizar el envase`, 500);
  }
}

async function deleteProduct(id) {
  try {
    const deletedPackaging = await prisma.packaging.delete({
      where: { id: id,  },
    });

    return deletedPackaging;
  } catch (error) {
    console.log(error);
    if(error.code === 'P2025'){
      throw new CustomError(`No se encontro el envase`, 404);
    }
    throw new CustomError(`Error al eliminar el envase`, 500);
  }
}
module.exports = { newProduct, getByProductId, getAllProducts, getProductByCod, updateProduct, deleteProduct };
