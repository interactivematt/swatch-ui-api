const knex = require('knex')
const app = require('./app')
const { PORT, API_BASE_URL } = require('./config')

app.listen(PORT, () => {
  console.log(`Server listening at ${API_BASE_URL}`)
})