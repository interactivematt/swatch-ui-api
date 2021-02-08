const path = require('path')
const express = require('express')
const { v4: uuid } = require('uuid')
const logger = require('../logger')

const swatchesRouter = express.Router()
const bodyParser = express.json()

const SwatchesService = require('./swatches-service')

swatchesRouter
  .route('/api/swatches')

  .get((req, res, next) => {
    // move implementation logic here
    SwatchesService.getAllSwatches(req.app.get('db'))
      .then(swatches => {
        res.json(swatches)
      })
      .catch(next)
  })
  .post(bodyParser, (req, res, next) => {
    // move implementation logic here
    const { name, color_primary, color_secondary, font_primary } = req.body;

    // get an id
    const id = uuid();
  
    const newSwatch = {
      name,
      color_primary,
      color_secondary,
      font_primary,
    };
  
    SwatchesService.insertSwatch(
      req.app.get('db'),
      newSwatch
    )
      .then(swatch => {
        logger.info(`Swatch with id ${id} created`);
        res
          .status(201)
          .location(`http://localhost:8000/api/swatches/${id}`)
          .json(swatch);
      })
      .catch(next)
  })

swatchesRouter
  .route('/api/swatches/:id')
  
  .delete((req, res, next) => {
    // move implementation logic here
    const { id } = req.params;
    SwatchesService.deleteSwatch(
      req.app.get('db'),
      id
    )
      .then(numRowsAffected => {
        logger.info(`Swatch with id ${id} deleted.`)
        res.status(204).end()
      })
      .catch(next)
    console.log(`Swatch ${id} deleted from db`)
  })

  .patch(bodyParser, (req, res, next) => {
      const { name, color_primary, color_secondary, font_primary } = req.body;
      const swatchToUpdate = { name, color_primary, color_secondary, font_primary }
  
      const numberOfValues = Object.values(swatchToUpdate).filter(Boolean).length
      if (numberOfValues === 0) {
        logger.error(`Invalid update without required fields`)
        return res.status(400).json({
          error: {
            message: `Request body must include 'name'`
          }
        })
      }
  
      SwatchesService.updateSwatch(
        req.app.get('db'),
        req.params.id,
        swatchToUpdate
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })

module.exports = swatchesRouter