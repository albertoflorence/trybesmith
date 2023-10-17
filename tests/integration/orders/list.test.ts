import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ordersService from '../../../src/services/orders.service';

chai.use(chaiHttp);

describe('GET /orders', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('should return all orders', async function () {
    sinon
      .stub(ordersService, 'getAll')
      .resolves({ code: 'OK', data: [{ id: 1, userId: 1, productIds: [1, 2] }] });
    const response = await chai.request(app).get('/orders');

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal([{ id: 1, userId: 1, productIds: [1, 2] }]);
  });
});
