const multer = require('multer')

const storage = multer.diskStorage({
destination: (req,file, cb)=>{
  cb(null,'./src/public/imgs')
},
filename:(req, file, cb)=>{
    const ext = file.originalname.split('.').pop()
    console.log(ext)
    cb(null, `${Date.now()}.${ext}`)
}
})

const configMulter = multer({storage})

// http://localhost:3000/imgs/1712452325886.png
module.exports = configMulter