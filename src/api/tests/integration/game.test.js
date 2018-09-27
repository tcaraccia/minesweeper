/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const app = require('../../../index');
const User = require('../../models/user.model');
const Game = require('../../models/game.model');


describe('Users API', async () => {
  let userAccessToken;
  let dbUsers;
  let game;

  const password = '123456';
  const passwordHashed = await bcrypt.hash(password, 1);

  beforeEach(async () => {
    dbUsers = {

      jonSnow: {
        email: 'jonsnow@gmail.com',
        password: passwordHashed,
        name: 'Jon Snow',
      },
    };
    game = {
      size: 4,
      mines: 2,
    };

    await User.remove({});
    await User.insertMany([dbUsers.jonSnow]);
    dbUsers.jonSnow.password = password;
    userAccessToken = (await User.findAndGenerateToken(dbUsers.jonSnow)).accessToken;
  });
  /**
  describe('POST /v1/games/create', () => {
    it('should create a new game when request is ok', () => {
      return request(app)
        .post('/v1/games/create')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(game)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body).to.include(game);
        });
    });
     */
  describe('GAME Model', () => {
    it('should create a new board with mines in it', async () => {
      const testGame = await Game.config(game.size, game.mines);
      expect(testGame).to.have.property('cells');
    });
    it('should have the right amount of cells', async () => {
      const testGame = await Game.config(game.size, game.mines);
      testGame.cells.forEach((element) => {
        expect(element).to.be.lengthOf(4);
      });
    });
    it('should have the right amont of mines', async () => {
      const testGame = await Game.config(game.size, game.mines);
      const mineCount = testGame.cells.reduce((acum, x) =>
        acum + x.filter(y => y.mine).length, 0);
      expect(mineCount).to.equal(2);
    });
  });
});
