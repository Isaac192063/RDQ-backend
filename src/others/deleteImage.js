const fs = require('fs')
const path = require('path')

function deleteImage(img){
    try {
        fs.unlinkSync(path.join(__dirname, '../public/imgs/'+img))
    } catch (error) {
        console.log(error)
    }
}

module.exports = {deleteImage};