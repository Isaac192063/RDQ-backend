-- CreateEnum
CREATE TYPE "PersonType" AS ENUM ('NATURAL', 'JURIDICO');

-- CreateTable
CREATE TABLE "CUSTOMERS" (
    "identification" VARCHAR(20) NOT NULL,
    "first_name" VARCHAR(20) NOT NULL,
    "middle_name" VARCHAR(20),
    "last_name" VARCHAR(20) NOT NULL,
    "last_name_2" VARCHAR(20),
    "email" VARCHAR(30) NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "address" VARCHAR(40) NOT NULL,
    "neighborhood" VARCHAR(30) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "warranty" VARCHAR(100) NOT NULL,
    "typePerson" "PersonType" NOT NULL,
    "cty_id" VARCHAR(3) NOT NULL,
    "dpt_cty_id" VARCHAR(2) NOT NULL,

    CONSTRAINT "CUSTOMERS_pkey" PRIMARY KEY ("identification")
);

-- CreateTable
CREATE TABLE "DEPARTAMENTS" (
    "id" VARCHAR(2) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "DEPARTAMENTS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CITIES" (
    "id" VARCHAR(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "dpt_id" VARCHAR(2) NOT NULL,

    CONSTRAINT "CITIES_pkey" PRIMARY KEY ("id","dpt_id")
);

-- CreateTable
CREATE TABLE "ORDERS" (
    "order_number" SERIAL NOT NULL,
    "identification_user" VARCHAR(20) NOT NULL,
    "type_process" VARCHAR(15) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "delivery_code" TEXT,
    "reception_code" TEXT,
    "iduser" INTEGER NOT NULL,

    CONSTRAINT "ORDERS_pkey" PRIMARY KEY ("order_number")
);

-- CreateTable
CREATE TABLE "USERS" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "phone_number" VARCHAR(30) NOT NULL,
    "initial_data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(30) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "image" VARCHAR(50),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "rol_id" INTEGER NOT NULL,

    CONSTRAINT "USERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ROLES" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "ROLES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DETAIL_ORDERS" (
    "delivery_date" TIMESTAMP(3),
    "reception_date" TIMESTAMP(3),
    "product_amount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,
    "empty" BOOLEAN NOT NULL DEFAULT true,
    "order_number" INTEGER NOT NULL,
    "pkg_id" VARCHAR(8) NOT NULL,

    CONSTRAINT "DETAIL_ORDERS_pkey" PRIMARY KEY ("order_number","pkg_id")
);

-- CreateTable
CREATE TABLE "CONTENTS" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "color" VARCHAR(20) NOT NULL,

    CONSTRAINT "CONTENTS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PACKAGINGS" (
    "id" VARCHAR(15) NOT NULL,
    "hydrostatic_date" TIMESTAMP(3) NOT NULL,
    "owner" VARCHAR(30) NOT NULL,
    "empty" BOOLEAN NOT NULL DEFAULT false,
    "inStorage" BOOLEAN NOT NULL DEFAULT true,
    "ctt_id" INTEGER NOT NULL,
    "tpg_cod" INTEGER NOT NULL,

    CONSTRAINT "PACKAGINGS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TYPE_PACKAGINGS" (
    "cod" SERIAL NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "pressure_amount" VARCHAR(3) NOT NULL,

    CONSTRAINT "TYPE_PACKAGINGS_pkey" PRIMARY KEY ("cod")
);

-- CreateIndex
CREATE UNIQUE INDEX "CUSTOMERS_email_key" ON "CUSTOMERS"("email");

-- CreateIndex
CREATE UNIQUE INDEX "USERS_email_key" ON "USERS"("email");

-- AddForeignKey
ALTER TABLE "CUSTOMERS" ADD CONSTRAINT "CUSTOMERS_cty_id_dpt_cty_id_fkey" FOREIGN KEY ("cty_id", "dpt_cty_id") REFERENCES "CITIES"("id", "dpt_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CITIES" ADD CONSTRAINT "CITIES_dpt_id_fkey" FOREIGN KEY ("dpt_id") REFERENCES "DEPARTAMENTS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ORDERS" ADD CONSTRAINT "ORDERS_identification_user_fkey" FOREIGN KEY ("identification_user") REFERENCES "CUSTOMERS"("identification") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ORDERS" ADD CONSTRAINT "ORDERS_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "USERS" ADD CONSTRAINT "USERS_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "ROLES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DETAIL_ORDERS" ADD CONSTRAINT "DETAIL_ORDERS_order_number_fkey" FOREIGN KEY ("order_number") REFERENCES "ORDERS"("order_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DETAIL_ORDERS" ADD CONSTRAINT "DETAIL_ORDERS_pkg_id_fkey" FOREIGN KEY ("pkg_id") REFERENCES "PACKAGINGS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PACKAGINGS" ADD CONSTRAINT "PACKAGINGS_ctt_id_fkey" FOREIGN KEY ("ctt_id") REFERENCES "CONTENTS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PACKAGINGS" ADD CONSTRAINT "PACKAGINGS_tpg_cod_fkey" FOREIGN KEY ("tpg_cod") REFERENCES "TYPE_PACKAGINGS"("cod") ON DELETE RESTRICT ON UPDATE CASCADE;
