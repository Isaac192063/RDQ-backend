const { Router } = require("express");
const employeeController = require("../controllers/user.controller");
const prisma = require("../config/prisma");
const multer = require("../config/multer");
const ExcelJS = require('exceljs');

const routerUser = Router();

routerUser.get("", employeeController.getAllUsers);
routerUser.get("/search",employeeController.findUserName );
routerUser.post("", multer.single("image"),employeeController.createUser);
routerUser.post("/login", employeeController.loginUser);
routerUser.get("/emp", employeeController.getAllEmployes);
routerUser.put("/:id",multer.single("image"), employeeController.updateUser);
routerUser.delete("/:id", employeeController.deleteUser);
routerUser.get('/excel/downloadExcel', async (req, res) => {
    try {
        console.log("first")
     
      const users = await prisma.user.findMany(
        {
            where: {
                rol_id: 1,
              },
              orderBy: {
                id: "desc",
              },
        }
      );
      
      // Crear un nuevo libro de Excel
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Users');
  
      // Agregar encabezados
      worksheet.columns = [
          { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'name', width: 30 },
        { header: 'Apellido', key: 'last_name', width: 30 },
        { header: 'Numero celular', key: 'phone_number', width: 30 },
        { header: 'Fecha inicial de trabajo', key: 'initial_data', width: 30, font: {bold: true} },
        { header: 'Usuario activo', key: 'enabled', width: 20 },
    ];
  
      // Agregar datos
      users.forEach(user => {
        worksheet.addRow(user);
    });
  
      // Configurar el archivo de respuesta
      res.setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + 'users.xlsx'
      );
      
      // Enviar el archivo Excel al cliente
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Error al generar el archivo Excel:', error);
      res.status(500).send('Error al generar el archivo Excel');
    }
});
routerUser.get("/:id", employeeController.getUserById);
module.exports = routerUser;
