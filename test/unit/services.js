const sinon = require('sinon');
const expect = require('chai').expect;

const productModel = require("../../models/productModel");
const productService = require("../../services/productService");

const product = { name: "test1", quantity: 2 };


const TEST_ID = 1;

describe('SERVICE', () => {
  describe('finalvalidation', () => {
    before(async () => {
      const create = { id: TEST_ID };
      sinon.stub(productModel, "getByName").resolves([]);
      sinon.stub(productModel, "create").resolves(create);
    });

    after(async () => {
      productModel.getByName.restore();
      productModel.create.restore();
    });

    it('cria um objeto com o produto', async () => {
      const response = await productService.finalValidation(product);
      expect(response).to.be.an("object");
    });

    it("retorna o produto com o seu id", async () => {
      const response = await productService.finalValidation(product.name, product.quantity);
      expect(response.message).to.be.eql({ id: TEST_ID, ...product });
    });
  });
  describe('update', () => {
    before(async () => {
      const update = { id: TEST_ID };
      sinon.stub(productModel, "getByName").resolves([]);
      sinon.stub(productModel, "update").resolves(update);
    });

    after(async () => {
      productModel.getByName.restore();
      productModel.update.restore();
    });

    it('cria um objeto com o produto', async () => {
      const response = await productService.update(product);
      expect(response).to.be.an("object");
    });

    it("verifica se retorna uma string no message", async () => {
      const response = await productService.update(product.name, product.quantity);
      expect(response.message).to.be.a('string');
    });
  });
});
