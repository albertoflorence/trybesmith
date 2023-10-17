import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import productsService from '../../../src/services/products.service';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('should return 201 when product is created', async function () {
    const data = { name: 'Product 1', price: '10', orderId: 4 };
    const product = ProductModel.build(data);
    sinon.stub(ProductModel, 'create').resolves(product);
    const response = await chai.request(app).post('/products').send(data);

    expect(response).to.have.status(201);
    expect(response.body).to.deep.equal({
      id: null,
      ...data,
    });
  });
});
