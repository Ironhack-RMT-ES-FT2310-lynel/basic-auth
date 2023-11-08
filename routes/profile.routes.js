const express = require('express');
const router = express.Router();

const isLoggedIn = require("../middlewares/auth.middleware.js")

// ejemplo de una ruta privada (solo usuarios logeados)
router.get("/", isLoggedIn, (req, res, next) => {

  console.log(req.session.user) // la informacion del usuario haciendo esta llamada
  res.render("profile/private.hbs")

})




module.exports = router;