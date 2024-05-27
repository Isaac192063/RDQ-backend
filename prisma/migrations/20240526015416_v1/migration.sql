-- CreateEnum
CREATE TYPE "PersonType" AS ENUM ('NATURAL', 'JURIDICO');

-- CreateTable
CREATE TABLE "customers" (
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

    CONSTRAINT "customers_pkey" PRIMARY KEY ("identification")
);

-- CreateTable
CREATE TABLE "departaments" (
    "id" VARCHAR(2) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "departaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" VARCHAR(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "dpt_id" VARCHAR(2) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id","dpt_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_number" SERIAL NOT NULL,
    "identification_user" VARCHAR(20) NOT NULL,
    "type_process" VARCHAR(15) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "iduser" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_number")
);

-- CreateTable
CREATE TABLE "users" (
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

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_orders" (
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "reception_date" TIMESTAMP(3),
    "product_amount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,
    "empty" BOOLEAN NOT NULL DEFAULT true,
    "order_number" INTEGER NOT NULL,
    "pkg_id" VARCHAR(8) NOT NULL,

    CONSTRAINT "product_orders_pkey" PRIMARY KEY ("order_number","pkg_id")
);

-- CreateTable
CREATE TABLE "contents" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "color" VARCHAR(20) NOT NULL,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packagings" (
    "id" VARCHAR(15) NOT NULL,
    "hydrostatic_date" TIMESTAMP(3) NOT NULL,
    "owner" VARCHAR(30) NOT NULL,
    "ctt_id" INTEGER NOT NULL,
    "tpg_cod" INTEGER NOT NULL,

    CONSTRAINT "packagings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_packagings" (
    "cod" SERIAL NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "pressure_amount" VARCHAR(3) NOT NULL,

    CONSTRAINT "type_packagings_pkey" PRIMARY KEY ("cod")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_cty_id_dpt_cty_id_fkey" FOREIGN KEY ("cty_id", "dpt_cty_id") REFERENCES "cities"("id", "dpt_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_dpt_id_fkey" FOREIGN KEY ("dpt_id") REFERENCES "departaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_identification_user_fkey" FOREIGN KEY ("identification_user") REFERENCES "customers"("identification") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_orders" ADD CONSTRAINT "product_orders_order_number_fkey" FOREIGN KEY ("order_number") REFERENCES "orders"("order_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_orders" ADD CONSTRAINT "product_orders_pkg_id_fkey" FOREIGN KEY ("pkg_id") REFERENCES "packagings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packagings" ADD CONSTRAINT "packagings_ctt_id_fkey" FOREIGN KEY ("ctt_id") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packagings" ADD CONSTRAINT "packagings_tpg_cod_fkey" FOREIGN KEY ("tpg_cod") REFERENCES "type_packagings"("cod") ON DELETE RESTRICT ON UPDATE CASCADE;
