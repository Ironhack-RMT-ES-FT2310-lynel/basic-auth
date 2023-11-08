const express = require('express');
const User = require('../models/User.model');
const router = express.Router();
const bcrypt = require('bcryptjs');

// GET "/auth/signup" => renderizar formulario de registro
router.get("/signup", (req, res, next) => {

  res.render("auth/signup.hbs")

})


// POST "/auth/signup" => recibir los datos del usuario y crearlo en la DB
router.post("/signup", async (req, res, next) => {

  console.log(req.body)

  const { username, email, password } = req.body

  // los campos deban estar llenos
  if ( username === "" || email === "" || password === "" ) {
    console.log("al menos uno de los campos está vacio")
    // 1. queremos indicarle al usuario que hubo fallo de frontend
    res.render("auth/signup.hbs", {
      errorMessage: "Todos los campos deben estar llenos"
    })

    // 2. detener la ejecucion de la ruta/funcion
    return;
  }

  // la contraseña deba ser lo suficientemente segura
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  // const passwordRegex = new RegExp("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm")
  if (passwordRegex.test(password) === false) {
    res.render("auth/signup.hbs", {
      errorMessage: "Contraseña no es suficiente segura. Debe tener 8 caracteres, al menos una mayuscula, una minuscula y un numero."
    })
    return; // detener la ruta
  }

  // el correo electronico deba tener el formato correcto (Esperamos que ustedes la apliquen en los proyectos)


  try {
    // el correo electronico no este repetido
    const foundUserWithSameEmail = await User.findOne( {email} )
    // si foundUserWithSameEmail es null, no hariamos nada
    // si foundUserWithSameEmail es algo, entonces enviamos error
    if (foundUserWithSameEmail !== null) {
      res.render("auth/signup.hbs", {
        errorMessage: "Correo electronico ya registrado"
      })
      return; // detener la ruta
    }

    // el nombre de usuario no este repetido (tarea y para hacer en los proyectos)


    // cifrar la contraseña del usuario
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    // si todo sale bien, creamos al usuario

    await User.create({
      username,
      email,
      password: hashedPassword
    })

    // redireccion de prueba si todo sale bien
    res.redirect("/")

  } catch(err) {
    next(err)
  }

})


// GET "/auth/login" => renderizar el formulario de acceso


// POST "/auth/login" => recibir las credenciales del usuario, validarlo/autenticarlo y crear una sesión activa del usuario



module.exports = router;