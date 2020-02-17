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
  if (req.body.age === '') {
    return res.redirect('/')
  } else {
    next()
  }
}

// Iniciando Rotas
app.get('/', (req, res) => {
  return res.render('form')
})

app.post('/check', middlewareCheck, (req, res) => {
  const idade = req.body.age
  if (idade >= 18) {
    res.redirect(`/major/${idade}`)
  } else {
    res.redirect(`/minor/${idade}`)
  }
})

app.get('/major/:age', (req, res) => {
  const idade = req.params.age
  return res.render('major', { idade })
})

app.get('/minor/:age', (req, res) => {
  const idade = req.params.age
  return res.render('minor', { idade })
})

// Iniciando Porta
app.listen(2000)
