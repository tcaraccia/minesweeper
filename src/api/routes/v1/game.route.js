const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/game.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const {
  create,
} = require('../../validations/game.validation');

const router = express.Router();


router
  .route('/create')
  /**
   * @api {post} v1/games/create Create Game
   * @apiDescription Create a new Game
   * @apiVersion 1.0.0
   * @apiName CreateGame
   * @apiGroup Game
   * @apiPermission user
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiParam  {Number{1-100}}      [rows]       Board's rows
   * @apiParam  {Number{1-100}}      [cols]       Board's cols
   * @apiParam  {Number{1-100}}      [mines]      Board's mines qty
   *
   * @apiSuccess {Object} board object.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   */
  .post(validate(create), controller.create);


module.exports = router;
