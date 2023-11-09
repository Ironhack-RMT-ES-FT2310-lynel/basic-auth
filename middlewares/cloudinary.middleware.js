// config/cloudinary.config.js
 
const cloudinary = require('cloudinary').v2; // validar credenciales y es el paquete donde se envia la imagen
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // genera una bolsita (bundle) para transmitir la imagen y las configuraciones
const multer = require('multer'); // paquete para poder transmitir data más compleja
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
 
const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  params: {
    allowed_formats: ['jpg', 'png'], // que formatos vamos a aceptar
    folder: 'profile-pics-app' // The name of the folder in cloudinary
    // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
  }
});
 
//                     storage: storage
module.exports = multer({ storage });