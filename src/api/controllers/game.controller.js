const httpStatus = require('http-status');
const Game = require('../models/game.model');


/**
 * Create new game
 * @public
 */
exports.create = async (req, res, next) => {
  const game = new Game(req.body);
  const savedGame = await game.save();
  res.status(httpStatus.CREATED);
  res.json(savedGame);
};
