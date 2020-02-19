// importando bibliotecas
const express = require('express')
const nunjucks = require('nunjucks')

// Inciando Servidor Express
const app = express()
app.use(express.urlencoded({ extended: false })) // habilita o express a manipular req.body

// Iniciando Nunjucks
nunjucks.configure('views', { // diretorio onde se encontra as view's
  autoescape: true,
  express: app, // indicar a variavel do servidor express
  watch: true // habilita o reload do servidor ao atualizar arquivos .njk
})
app.set('view engine', 'njk') // definindo o formato das view's(njk)

// Iniciando Middleware
const middlewareCheck = (req, res, next) => {
  const { age } = req.query
  if (age === '') {
    return res.redirect('/')
  } else {
    next()
  }
}

// Iniciando Rotas
app.get('/', (req, res) => {
  return res.render('form')
})

app.post('/check', (req, res) => {
  const { age } = req.body
  if (age >= 18) {
    res.redirect(`/major?age=${age}`)
  } else {
    res.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', middlewareCheck, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', middlewareCheck, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

// Iniciando Porta
app.listen(2000)
