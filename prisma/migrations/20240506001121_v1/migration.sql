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
    "state" BOOLEAN NOT NULL,
    "idCity" VARCHAR(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("identification")
);

-- CreateTable
CREATE TABLE "departaments" (
    "id_departament" VARCHAR(2) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "departaments_pkey" PRIMARY KEY ("id_departament")
);

-- CreateTable
CREATE TABLE "cities" (
    "id_city" VARCHAR(3) NOT NULL,
    "idDepartament" VARCHAR(2) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id_city")
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
    "id_user" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "phone_number" VARCHAR(30) NOT NULL,
    "initial_data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(30) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "image" VARCHAR(50),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "idRol" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "roles" (
    "id_rol" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "product_orders" (
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "delivery_invoice" TIMESTAMP(3) NOT NULL,
    "reception_date" TIMESTAMP(3),
    "recepcion_invoice" TIMESTAMP(3),
    "product_amount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,
    "order_number" INTEGER NOT NULL,
    "idPackaging" VARCHAR(8) NOT NULL,

    CONSTRAINT "product_orders_pkey" PRIMARY KEY ("order_number","idPackaging")
);

-- CreateTable
CREATE TABLE "contents" (
    "id_content" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "unit_measurement" VARCHAR(10) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id_content")
);

-- CreateTable
CREATE TABLE "packagings" (
    "id_packaging" VARCHAR(8) NOT NULL,
    "hydrostatic_date" TIMESTAMP(3) NOT NULL,
    "stock" INTEGER NOT NULL,
    "supplier" VARCHAR(30) NOT NULL,
    "idContent" INTEGER NOT NULL,
    "idTypePackaging" INTEGER NOT NULL,

    CONSTRAINT "packagings_pkey" PRIMARY KEY ("id_packaging")
);

-- CreateTable
CREATE TABLE "type_packagings" (
    "id_type_packaging" SERIAL NOT NULL,
    "pressure_amount" DOUBLE PRECISION NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "color" VARCHAR(20) NOT NULL,

    CONSTRAINT "type_packagings_pkey" PRIMARY KEY ("id_type_packaging")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_idCity_fkey" FOREIGN KEY ("idCity") REFERENCES "cities"("id_city") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_idDepartament_fkey" FOREIGN KEY ("idDepartament") REFERENCES "departaments"("id_departament") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_identification_user_fkey" FOREIGN KEY ("identification_user") REFERENCES "customers"("identification") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "roles"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_orders" ADD CONSTRAINT "product_orders_order_number_fkey" FOREIGN KEY ("order_number") REFERENCES "orders"("order_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_orders" ADD CONSTRAINT "product_orders_idPackaging_fkey" FOREIGN KEY ("idPackaging") REFERENCES "packagings"("id_packaging") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packagings" ADD CONSTRAINT "packagings_idContent_fkey" FOREIGN KEY ("idContent") REFERENCES "contents"("id_content") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packagings" ADD CONSTRAINT "packagings_idTypePackaging_fkey" FOREIGN KEY ("idTypePackaging") REFERENCES "type_packagings"("id_type_packaging") ON DELETE RESTRICT ON UPDATE CASCADE;
