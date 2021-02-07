const SwatchesService = {
  getAllSwatches(knex) {
    return knex.select('*').from('swatches')
  },

  insertSwatch(knex, newSwatch) {
    return knex
      .insert(newSwatch)
      .into('swatches')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  deleteBookmark(knex, id) {
    return knex('swatches')
      .where({ id })
      .delete()
  },
  updateSwatch(knex, id, newSwatchFields) {
    return knex('swatches')
      .where({ id })
      .update(newSwatchFields)
  },
  

}

module.exports = SwatchesService