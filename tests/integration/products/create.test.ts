import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import productsService from '../../../src/services/products.service';

chai.use(chaiHttp);

describe('POST /products', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('should return 201 when product is created', async function () {
    sinon.stub(productsService, 'create').resolves({
      code: 'CREATED',
      data: { id: 1, name: 'Product 1', price: 10, orderId: 4 },
    });
    const response = await chai
      .request(app)
      .post('/products')
      .send({ name: 'Product 1', price: 10, orderId: 4 });

    expect(response).to.have.status(201);
    expect(response.body).to.deep.equal({
      id: 1,
      name: 'Product 1',
      price: 10,
      orderId: 4,
    });
  });
});
