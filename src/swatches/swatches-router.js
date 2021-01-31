const express = require('express')
const { v4: uuid } = require('uuid')
const logger = require('../logger')

const swatchesRouter = express.Router()
const bodyParser = express.json()

const swatches = require('../swatches-data.js')

swatchesRouter
  .route('/api/swatches')
  .get((req, res) => {
    // move implementation logic here
    res.json(swatches);
  })
  .post(bodyParser, (req, res) => {
    // move implementation logic here
    const { color_primary, color_secondary, font_primary, font_secondary = [] } = req.body;

    // get an id
    const id = uuid();
  
    const swatch = {
      id,
      color_primary,
      color_secondary,
      font_primary,
      font_secondary
    };
  
    swatches.push(swatch);
  
    logger.info(`Swatch with id ${id} created`);
  
    res
      .status(201)
      .location(`http://localhost:8000/api/swatches/${id}`)
      .json({id});
  })

swatchesRouter
  .route('/api/swatches/:id')
  .get((req, res) => {
    // move implementation logic here
    const { id } = req.params;
    const swatch = swatches.find(c => c.id == id);
  
    // make sure we found a card
    if (!swatch) {
      logger.error(`Swatch with id ${id} not found.`);
      return res
        .status(404)
        .send('Swatch Not Found');
    }
  
    res.json(swatch);
  })
  .delete((req, res) => {
    // move implementation logic here
    const { id } = req.params;

    const swatchIndex = swatches.findIndex(c => c.id == id);

    if (swatchIndex === -1) {
      logger.error(`Swatch with id ${id} not found.`);
      return res
        .status(404)
        .send('Not found');
    }

    swatches.splice(swatchIndex, 1);

    logger.info(`Swatch with id ${id} deleted.`);
    res
      .status(204)
      .end();
    })

module.exports = swatchesRouter