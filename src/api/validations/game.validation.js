const Joi = require('joi');

module.exports = {
  // POST /v1/game/create
  create: {
    body: {
      rows: Joi.number(),
      cols: Joi.number(),
      mines: Joi.number(),
    },
  },
};
