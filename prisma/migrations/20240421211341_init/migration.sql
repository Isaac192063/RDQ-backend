/*
  Warnings:

  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Departament` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Packaging` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoleUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypePackaging` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."City" DROP CONSTRAINT "City_idDepartament_fkey";

-- DropForeignKey
ALTER TABLE "public"."Customer" DROP CONSTRAINT "Customer_idCity_idDepartament_fkey";

-- DropForeignKey
ALTER TABLE "public"."Customer" DROP CONSTRAINT "Customer_idState_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_idCustomer_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_iduser_fkey";

-- DropForeignKey
ALTER TABLE "public"."Packaging" DROP CONSTRAINT "Packaging_idContent_fkey";

-- DropForeignKey
ALTER TABLE "public"."Packaging" DROP CONSTRAINT "Packaging_idTypePackaging_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductOrder" DROP CONSTRAINT "ProductOrder_idCustomer_iduser_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductOrder" DROP CONSTRAINT "ProductOrder_idPackaging_fkey";

-- DropForeignKey
ALTER TABLE "public"."RoleUser" DROP CONSTRAINT "RoleUser_idRol_fkey";

-- DropForeignKey
ALTER TABLE "public"."RoleUser" DROP CONSTRAINT "RoleUser_idUser_fkey";

-- DropTable
DROP TABLE "public"."City";

-- DropTable
DROP TABLE "public"."Content";

-- DropTable
DROP TABLE "public"."Customer";

-- DropTable
DROP TABLE "public"."Departament";

-- DropTable
DROP TABLE "public"."Order";

-- DropTable
DROP TABLE "public"."Packaging";

-- DropTable
DROP TABLE "public"."ProductOrder";

-- DropTable
DROP TABLE "public"."Rol";

-- DropTable
DROP TABLE "public"."RoleUser";

-- DropTable
DROP TABLE "public"."State";

-- DropTable
DROP TABLE "public"."TypePackaging";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "State" (
    "id_state" SERIAL NOT NULL,
    "client_status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id_state")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id_customer" SERIAL NOT NULL,
    "first_name" VARCHAR(20) NOT NULL,
    "middle_name" VARCHAR(20),
    "last_name" VARCHAR(20) NOT NULL,
    "last_name_2" VARCHAR(20),
    "email" VARCHAR(30) NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "identification" VARCHAR(20) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "neighborhood" VARCHAR(30) NOT NULL,
    "idCity" INTEGER NOT NULL,
    "idDepartament" INTEGER NOT NULL,
    "idState" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id_customer")
);

-- CreateTable
CREATE TABLE "Departament" (
    "id_departament" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Departament_pkey" PRIMARY KEY ("id_departament")
);

-- CreateTable
CREATE TABLE "City" (
    "id_city" SERIAL NOT NULL,
    "idDepartament" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("idDepartament","id_city")
);

-- CreateTable
CREATE TABLE "Order" (
    "iduser" INTEGER NOT NULL,
    "idCustomer" INTEGER NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("idCustomer","iduser")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "last_name" VARCHAR(20) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "initial_data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(30) NOT NULL,
    "password" VARCHAR(110) NOT NULL,
    "image" VARCHAR(50),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id_rol" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "RoleUser" (
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idRol" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "RoleUser_pkey" PRIMARY KEY ("idRol","idUser")
);

-- CreateTable
CREATE TABLE "ProductOrder" (
    "cod" SERIAL NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "delivery_invoice" TIMESTAMP(3) NOT NULL,
    "reception_date" TIMESTAMP(3),
    "recepcion_invoice" TIMESTAMP(3),
    "product_amount" INTEGER NOT NULL,
    "iduser" INTEGER NOT NULL,
    "idCustomer" INTEGER NOT NULL,
    "idPackaging" INTEGER NOT NULL,

    CONSTRAINT "ProductOrder_pkey" PRIMARY KEY ("cod")
);

-- CreateTable
CREATE TABLE "Content" (
    "id_content" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "unit_measurement" VARCHAR(10) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id_content")
);

-- CreateTable
CREATE TABLE "Packaging" (
    "id_packaging" SERIAL NOT NULL,
    "hydrostatic_date" TIMESTAMP(3) NOT NULL,
    "stock" INTEGER NOT NULL,
    "lote" TIMESTAMP(3) NOT NULL,
    "maker" VARCHAR(30) NOT NULL,
    "idContent" INTEGER NOT NULL,
    "idTypePackaging" INTEGER NOT NULL,

    CONSTRAINT "Packaging_pkey" PRIMARY KEY ("id_packaging")
);

-- CreateTable
CREATE TABLE "TypePackaging" (
    "id_type_packaging" SERIAL NOT NULL,
    "pressure_amount" DOUBLE PRECISION NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "color" VARCHAR(20) NOT NULL,

    CONSTRAINT "TypePackaging_pkey" PRIMARY KEY ("id_type_packaging")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_idCity_idDepartament_fkey" FOREIGN KEY ("idCity", "idDepartament") REFERENCES "City"("idDepartament", "id_city") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_idState_fkey" FOREIGN KEY ("idState") REFERENCES "State"("id_state") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_idDepartament_fkey" FOREIGN KEY ("idDepartament") REFERENCES "Departament"("id_departament") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "Customer"("id_customer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleUser" ADD CONSTRAINT "RoleUser_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "Rol"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleUser" ADD CONSTRAINT "RoleUser_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOrder" ADD CONSTRAINT "ProductOrder_idCustomer_iduser_fkey" FOREIGN KEY ("idCustomer", "iduser") REFERENCES "Order"("idCustomer", "iduser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOrder" ADD CONSTRAINT "ProductOrder_idPackaging_fkey" FOREIGN KEY ("idPackaging") REFERENCES "Packaging"("id_packaging") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packaging" ADD CONSTRAINT "Packaging_idContent_fkey" FOREIGN KEY ("idContent") REFERENCES "Content"("id_content") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packaging" ADD CONSTRAINT "Packaging_idTypePackaging_fkey" FOREIGN KEY ("idTypePackaging") REFERENCES "TypePackaging"("id_type_packaging") ON DELETE RESTRICT ON UPDATE CASCADE;
