const express = require('express');
const router = express.Router();

const { isLoggedIn, isAdmin } = require("../middlewares/auth.middleware.js");
const User = require('../models/User.model');

const uploader = require("../middlewares/cloudinary.middleware.js")

// ejemplo de una ruta privada (solo usuarios logeados)
router.get("/", isLoggedIn, (req, res, next) => {

  console.log(req.session.user) // ! la informacion del usuario haciendo esta llamada
  console.log(req.session.user._id) // ! la id del usuario haciendo esta llamada

  // ! usan esta informacion para buscar en la BD cosas de este usuario
  User.findById(req.session.user._id)
  .then((response) => {
    console.log(response) // info del usuario para pasar al render
    res.render("profile/private.hbs", {
      userProfile: response
    })
  })
  .catch((err) => next(err))



})


// ejemplo de ruta solo para admins
router.get("/admin", isLoggedIn, isAdmin, (req, res, next) => {

  res.render("profile/admin.hbs")

})


// ruta que reciba la imagen, la envie a cloudinary, registre el URL de cloudinary en el documento de user de BD y redireccione al usuario

//                            el nombre del campo de archivo
//                                        |
router.post("/upload-picture", uploader.single("image"), async (req, res, next) => {

  console.log(req.file) // la forma en que cloudinary nos da la data de la imagen almacenada

  try {
    
    await User.findByIdAndUpdate(req.session.user._id, {
      profilePic: req.file.path
    })

    // si todo sale bien
    res.redirect("/profile")
  } catch (error) {
    next(error)
  }


})




module.exports = router;