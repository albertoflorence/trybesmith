import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ordersService from '../../../src/services/orders.service';
import OrderModel from '../../../src/database/models/order.model';

chai.use(chaiHttp);

describe('GET /orders', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('should return all orders', async function () {
    const data = [{ userId: 1, id: 2, productIds: [1, 2] }];
    const orders = OrderModel.bulkBuild(data, { raw: true });
    sinon.stub(OrderModel, 'findAll').resolves(orders);
    const response = await chai.request(app).get('/orders');

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equals(data);
  });
});
