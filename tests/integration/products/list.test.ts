import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productsService from '../../../src/services/products.service';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('should get all the products', async function () {
    sinon.stub(productsService, 'getAll').resolves({
      code: 'OK',
      data: [{ id: 1, name: 'Product 1', price: 10, orderId: 4 }],
    });
    const response = await chai.request(app).get('/products');

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal([
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        orderId: 4,
      },
    ]);
  });
});
