const prisma = require('../config/prisma')
const bcript = require('bcrypt')
const jwt = require('jsonwebtoken');
const { key } = require('../config/key');

module.exports = {
    async getAllUsers(req, res){
        try {
            const users = await prisma.user.findMany();
            res.status(200).json({
                "success": true,
                "data": users
            });
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                "success": false,
                "message": "Error en el sistema"
            })
        }
    }, 
    async createUser(req,res){
        try{
            const user = req.body

            const file = req.file
            user.image = file.filename

            const password_encrypted = await bcript.hash(user.password, 10);
            user.password = password_encrypted

            const rol = await prisma.rol.findFirst({where:{id_rol: parseInt(user.rol)}})
            console.log(rol);
            if(!rol){
                return res.status(400).json({
                    "success": false,
                    "message": "bad request"
                })
            }
            delete user.rol
            const newUser = await prisma.user.create({
                data: user,
            })

            const userRol = await prisma.roleUser.create({
                data: {idRol: rol.id_rol, idUser: newUser.id_user}
            })

            user.rol = rol.name

            res.status(201).json({
                "success": true,
                data: user
            })
        
        }catch(error){
            console.log(error)
            return res.status(401).json({
                "success": false,
                "message": "Error en el sistema"
            })
        }
            
    },
    async loginUser(req,res){
        try {
          const {password, email} = req.body
    
          const userEmail = await prisma.user.findFirst({where: {email}})
          
          if(!userEmail){
            return res.status(401).json({
                "success": false,
                "message": "Empledo no fue encontrado"
            })
          }
    
          const userComparation = await bcript.compare(password, userEmail.password);

          
          if(!userComparation){
              return res.status(400).json({
                  "success": false,
                  "message": "Contraseña incorrecta",
                })
            }
            
            const userRol = await prisma.roleUser.findFirst({where: {idUser: userEmail.id_user},include:{rol: true}})
            const token = jwt.sign({id: userEmail.id_user, "rol": userRol.rol.name},key)
            
            return res.status(203).json({
                "success": true,
                "message": "usuario autenticado",
                "token":token,
          })
    
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                "success": false,
                "message": "Error en el servidor"
            })
        }
    },
    async getUserById(req, res){

        try {
            const id_user = parseInt(req.params.id);
            const user = await prisma.user.findFirst({where:{id_user}})
        
            if(!user){
                return res.status(203).json({
                    "success": false,
                    "message": "usuario no encontrado",
              })
            }
            
            return res.status(200).json({
                "success": true,
                "message": "usuario encontrado",
                "data": user
            })
            
        } catch (error) {
            return res.status(203).json({
                "success": false,
                "message": "Error en el servidor",
          })
        }
    
    },
    async getAllEmployes(req, res){
        try {
            const employes = prisma.user.findMany({where: {
                rolUser:{
                    some:{
                        idRol: 1
                    }
                }
            }})
            const listEmploye = new Array();
            (await employes).forEach(employe=>{
                listEmploye.push(employe);
            })
            res.status(200).json({
                "success": true, 
                "data": listEmploye
            });
            
        } catch (error) {
            return res.status(203).json({
                "success": false,
                "message": "Error en el servidor",
          })
        }
    }

}