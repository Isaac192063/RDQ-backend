const prisma = require("../config/prisma");

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
  const product = await prisma.packaging.findFirst({
    where: {
      id: id,
    },
    include: {
      content: true,
      typePackaging: true,
    },
  });

  return product;
}

async function getAllProducts() {
  const products = await prisma.packaging.findMany({
    include: {
      content: true,
      typePackaging: true,
    },
  });

  return products;
}
module.exports = { newProduct, getByProductId, getAllProducts };
