require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, CLIENT_ORIGIN } = require('./config')
const validateBearerToken = require('./validate-bearer-token')
const swatchesRouter = require('./swatches/swatches-router')
const errorHandler = require('./error-handler')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(
  cors({
      
  })
);
app.use(validateBearerToken)

// endpoint
// app.use('/api/swatches', swatchesRouter)

app.use(swatchesRouter)

app.use(errorHandler)

module.exports = app