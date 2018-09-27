const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/game.controller');
const { authorize } = require('../../middlewares/auth');
const {
  create,
  update,
} = require('../../validations/game.validation');

const router = express.Router();


router
  .route('/start')
  /**
   * @api {post} v1/games/start Start Game
   * @apiDescription Starts a new Game
   * @apiVersion 1.0.0
   * @apiName StartGame
   * @apiGroup Game
   * @apiPermission user
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiParam  {Number{1-100}}      rows       Board's rows
   * @apiParam  {Number{1-100}}      cols       Board's cols
   * @apiParam  {Number{1-100}}      mines      Board's mines qty
   *
   * @apiSuccess {Object} board object.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   */
  .post(authorize(), validate(create), controller.create);


router
  .route('/:gameId')
/**
   * @api {put} v1/games/:gameId Perform Game Action
   * @apiDescription Performs a game action
   * @apiVersion 1.0.0
   * @apiName action
   * @apiGroup Game
   * @apiPermission user
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiParam  {String}      action        An action to perform in the game:'REVEAL,FLAG,PAUSE,MARK'
   * @apiParam  {Object}      payload       Payload Object containing row, col and flagStyle props when required.
   *
   * @apiSuccess {Object} result Object with the result of the game's state.

   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   */
  .put(authorize(), validate(update), controller.update);
module.exports = router;
