const express = require('express');
const router = express.Router();

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

  // el correo electronico deba tener el formato correcto
  // el nombre de usuario o correo electronico no este repetido


  // redireccion de prueba si todo sale bien
  res.redirect("/")

})


// GET "/auth/login" => renderizar el formulario de acceso


// POST "/auth/login" => recibir las credenciales del usuario, validarlo/autenticarlo y crear una sesión activa del usuario



module.exports = router;