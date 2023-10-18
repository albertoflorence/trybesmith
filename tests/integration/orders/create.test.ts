import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import tokenUtil from '../../../src/utils/tokenUtil';

chai.use(chaiHttp);

describe('POST /orders', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('should create a order', async function () {
    const data = { userId: 1, productIds: [1, 2] };
    const user = UserModel.build({
      level: 1,
      password: '123456',
      username: 'user',
      vocation: 'knight',
      id: 1,
    });
    const order = OrderModel.build({ userId: 1, id: 1 });

    sinon.stub(order, 'setProductIds');
    sinon.stub(OrderModel, 'create').resolves(order);
    sinon.stub(UserModel, 'findOne').resolves(user);
    sinon.stub(tokenUtil, 'verify').returns({ username: 'user', id: 1 });

    const response = await chai
      .request(app)
      .post('/orders')
      .send(data)
      .set('Authorization', 'Bearer token');

    expect(response).to.have.status(201);
    expect(response.body).to.deep.equals(data);
  });
});
