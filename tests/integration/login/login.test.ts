import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /login', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('should return 400 BAD REQUEST when username or password is not provided', async function () {
    const response = await chai.request(app).post('/login');

    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.equal({
      message: '"username" and "password" are required',
    });
  });

  it('should return 401 UNAUTHORIZED when username or password is invalid', async function () {
    const user = UserModel.build({
      username: 'user',
      password: '123456',
      level: 1,
      vocation: 'knight',
      id: 1,
    });
    sinon.stub(UserModel, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compareSync').returns(false);
    const response = await chai
      .request(app)
      .post('/login')
      .send({ username: 'user', password: 'incorrect_password' });

    expect(response).to.have.status(401);
    expect(response.body).to.be.deep.equal({
      message: 'Username or password invalid',
    });
  });

  it('should return 200 OK when login is successful', async function () {
    const user = UserModel.build({
      username: 'user',
      password: '123456',
      level: 1,
      vocation: 'knight',
      id: 1,
    });
    sinon.stub(UserModel, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    const response = await chai
      .request(app)
      .post('/login')
      .send({ username: 'user', password: '123456' });

    expect(response).to.have.status(200);
    expect(response.body.token.length).to.be.greaterThan(0);
  });
});
