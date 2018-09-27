const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/game.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const {
  create,
  reveal,
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
  .post(authorize(LOGGED_USER), validate(create), controller.create);

router
  .route('/:gameId/reveal')
/**
   * @api {post} v1/games/:gameId/reveal Reveal a Cell
   * @apiDescription Reveals a Cell
   * @apiVersion 1.0.0
   * @apiName RevealCell
   * @apiGroup Game
   * @apiPermission user
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiParam  {Number{1-100}}      row        Row index of the cell to reveal
   * @apiParam  {Number{1-100}}      col        Col index of the cell to reveal
   *
   * @apiSuccess {Object} result Object with the result of the revealed cell.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   */
  .post(authorize(LOGGED_USER), validate(reveal), controller.reveal);
router
  .route('/:gameId')
/**
   * @api {post} v1/games/:gameId Reveal a Cell
   * @apiDescription Reveals a Cell
   * @apiVersion 1.0.0
   * @apiName RevealCell
   * @apiGroup Game
   * @apiPermission user
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiParam  {Number{1-100}}      row        Row index of the cell to reveal
   * @apiParam  {Number{1-100}}      col        Col index of the cell to reveal
   *
   * @apiSuccess {Object} result Object with the result of the revealed cell.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   */
  .put(authorize(LOGGED_USER), validate(reveal), controller.reveal);
module.exports = router;
