const httpStatus = require('http-status');
const Game = require('../models/game.model');


/**
 * Create new game
 * @public
 */
exports.create = async (req, res, next) => {
  const game = new Game(Game.config(req.body.rows, req.body.mines));
  const savedGame = await game.save();
  res.status(httpStatus.CREATED);
  res.json(savedGame.transform());
};

/**
 * Update game state
 * @public
 */
exports.update = async (req, res, next) => {
  const { action, payload } = req.body;
  console.log(req.params.gameId);
  switch (action) {
    case 'REVEAL': {
      const game = await Game.findOne({ _id: req.params.gameId });
      if (!game) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY);
        res.json();
        return;
      }
      const result = await game.reveal(payload.row, payload.col);
      res.status(httpStatus.OK);
      res.json(result);
      break;
    }
    case 'FLAG': {
      break;
    }
    case 'PAUSE': {
      break;
    }
    case 'RESUME': {
      break;
    }
    default: {
      res.status(httpStatus.METHOD_NOT_ALLOWED);
      res.json();
      break;
    }
  }
};

