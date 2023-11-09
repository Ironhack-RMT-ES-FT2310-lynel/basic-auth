
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

function isAdmin(req, res, next) {

  if (req.session.user.role === "admin") {
    next() // continua con la ruta porque eres un admin
  } else {
    res.redirect("/auth/login") // fuera de aqui porque no eres un admin
  }

}


function updateLocals(req, res, next) {

  if (req.session.user === undefined) {
    res.locals.isSessionActive = false // accesible en hbs
  } else {
    res.locals.isSessionActive = true // accesible en hbs
  }

  next() // continua normalmente con la ruta

}


module.exports = {
  isLoggedIn,
  updateLocals,
  isAdmin
}