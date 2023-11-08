
// middleware => funcion que se va a invocar antes de la ruta

function isLoggedIn(req, res, next) {

  if (req.session.user === undefined) {
    // el usuario no está logeado, así que fuera de aqui
    res.redirect("/auth/login")
  } else {
    // el usuario sí está logeado, así que adelante con la ruta
    next()
  }

}

module.exports = isLoggedIn