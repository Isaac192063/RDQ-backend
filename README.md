
# Backend RDQ

Backend para la empresa RDQ

## Installation

1. Install my-project with npm
```bash
npm i
```
2. Crear base de datos
3. crear archivo .env en la riaz. Con esta varible local
```bash
DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:PORT/DB_NAME?schema=public"
```
Ejemplo:
```bash
DATABASE_URL="postgresql://postgres:ADMIN@localhost:5433/shopRDQ?schema=public"
```
4. ejecutar comando
```bash
npm install
npm i bcrypt cors express jsonwebtoken morgan multer
npm i -D nodemon prisma
npx prisma migrate dev 
```
5. Ingresar estos roles. en la base de datos
```
crear estos registros de la base de datos: 
INSERT INTO public."roles"(name)
VALUES ('user'),
       ('admin');
```

## Iniciar servidor

To deploy this project run

```bash
  npm run dev
```


## API Reference


#### Post user

```http
  POST /api/user
```
Enviar estos parametros:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of user to fetch |
| `name`      | `string` | **Required**. name of user to fetch |
| `last_name`      | `string` | **Required**. lastName of user to fetch |
| `phone_number`      | `string` | **Required**. phoneNumber of user to fetch |
| `initial_data`      | `DateTime` | **Required**. initialData of user to fetch |
| `email`      | `string` | **Required**. email of user to fetch |
| `password`      | `string` | **Required**. password of user to fetch |
| `image`      | `string` | image of user to fetch |
| `enabled`      | `boolean` | **Required**. enabled of user to fetch |
| `rol`      | `integer` | **Required**. rol of user to fetch (1 user - 2 admin) |


#### Put user

```http
  PUT /api/user/${id}
```
Enviar estos parametros:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name of user to fetch |
| `last_name`      | `string` | **Required**. lastName of user to fetch |
| `phone_number`      | `string` | **Required**. phoneNumber of user to fetch |
| `email`      | `string` | **Required**. email of user to fetch |
| `password`      | `string` | **Required**. password of user to fetch |
| `image`      | `string` | image of user to fetch |

#### Delete user

```http
  Delete /api/user/${id}
```

#### Post user - logeo

```http
  POST /api/user/login
```
Enviar estos parametros:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email of user to fetch |
| `password`      | `string` | **Required**. password 

## Documentación

 - [Documentación de prisma](https://www.prisma.io/docs/)




    
