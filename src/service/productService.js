const prisma = require("../config/prisma");

async function newProduct(content, typePackaging, packaging) {
  try {


    const createdTypePackaging = await prisma.typePackaging.upsert({
      where: { id_type_packaging: typePackaging.id_type_packaging },
      update: {},
      create: {
        color: typePackaging.color,
        pressure_amount: typePackaging.pressure_amount,
        price: typePackaging.price,
        size: typePackaging.size,
      },
    });

    const createdContent = await prisma.content.upsert({
      where: { id_content: content.id_content },
      update: {},
      create: {
        name: content.name,
        unit_measurement: content.unit_measurement,
        price: content.price,
      },
    });

    const createdPackaging = await prisma.packaging.create({
      data: {
        ...packaging,
        content: { connect: { id_content: createdContent.id_content } },
        typePackaging: {
          connect: {
            id_type_packaging: createdTypePackaging.id_type_packaging,
          },
        },
      },
      include: {
        typePackaging: true,
        content: true
      }
    });

    return createdPackaging
  } catch (error) {
    throw new Error(`Error al crear el empaque: ${error.message}`);
  }
}

async function getByProductId(id){


  const product = await prisma.packaging.findFirst({
    where: {
      id_packaging: id
    },
    include:{
      content: true,
      typePackaging: true
    }
  })

  return product
}

async function getAllProducts(){
  const products = await prisma.packaging.findMany({
    include:{
      content: true,
      typePackaging: true
    }
  })

  return products;
}
module.exports = { newProduct, getByProductId, getAllProducts };
