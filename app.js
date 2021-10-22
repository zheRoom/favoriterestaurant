const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurant = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurant.results })
})

app.get('/restaurants/:id', (req, res) => {
  const conform = restaurant.results.find(data => data.id.toString() === req.params.id)
  res.render('show', { restaurant: conform })
})


app.get('/search', (req, res) => {
  const search = restaurant.results.filter(data => data.name.toLowerCase().includes(req.query.keyword.toLowerCase()) ||
    data.category.toLowerCase().includes(req.query.keyword.toLowerCase()))
  res.render('index', { restaurant: search, keyword: req.query.keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})