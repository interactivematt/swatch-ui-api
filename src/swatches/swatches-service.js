const SwatchesService = {
  getAllSwatches(knex) {
    return knex.select('*').from('swatch')
  },

  insertSwatch(knex, newSwatch) {
    return knex
      .insert(newSwatch)
      .into('swatch')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

}

module.exports = SwatchesService