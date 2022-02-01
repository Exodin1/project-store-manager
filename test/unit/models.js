const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../models/connection");

const productModel = require("../../models/productModel");
const saleModel = require("../../models/salesModel");

const mock = [{
  id: 1,
  name: "test1",
  quantity: 5,
}];

const mockList = [
  {
    id: 1,
    name: "test2",
    quantity: 5,
  },
  {
    id: 2,
    name: "test3",
    quantity: 2,
  },
];
const sale = [
  {
    "product_id": 2,
    "quantity": 3
  }
]
const mockSales = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    product_id: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    product_id: 2,
    quantity: 2,
  },
];

describe('MODEL', () => {
  describe('"product"', () => {
    describe('"create"', () => {
      before(async () => {
        sinon.stub(connection, "execute").resolves(mock);
      });

      after(async () => {
        connection.execute.restore();
      });
      it('cria um objeto', async () => {
        const response = await productModel.create(mockList[0].name, mockList[0].quantity);
        expect(response).to.be.an("object");
      });

      it('retorna o id correto', async () => {
        const response = await productModel.create(mockList[1].name, mockList[1].quantity);
        expect(response).to.have.a.property("id");
      });
    });

    describe('"getByName"', () => {
      before(async () => {
        sinon.stub(connection, "execute").resolves(mock);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('retorna false', async () => {
        const response = await productModel.getByName(mock.name);
        expect(response).to.be.false
      });

      it('retorna undefined', async () => {
        const response = await productModel.getByName(mock.name);
        expect(response.name).to.be.undefined;
      });
    });

    describe('"getAll"', () => {
      before(async () => {
        sinon.stub(connection, "execute").resolves([mockList]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('retorna um array de objetos', async () => {
        const response = await productModel.getAll();
        response.map(obj => expect(obj).to.be.an('object'));
      });

      it('retorna a lista de produtos', async () => {
        const response = await productModel.getAll();
        expect(response).to.be.eql(mockList);
      });
    });

    describe('"getById"', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves(mock);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('retorna false', async () => {
        const response = await productModel.getById(mock.id);
        expect(response).to.be.false

      });

      it('retorna undefined', async () => {
        const response = await productModel.getById(mock.id);
        expect(response.id).to.be.undefined;
      });
      it('retorna false quando sem parametros', async () => {
        const response = await productModel.getById();
        expect(response).to.be.false
      })
    });

    describe('update', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves(mock);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('retorna quando false sem parametro', async () => {
        const response = await productModel.update();
        expect(response).to.be.false;

      });

      it('Change the name of the product', async () => {
        const response = await productModel.update(1, "test", 5);
        expect(response).to.be.true;
      });
    });

    describe('delete', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves(mock);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('retorna um objeto', async () => {
        const response = await productModel.$delete(mock.id);
        expect(response).to.be.an('object');
      });

      it('encontra o produto a ser deletado', async () => {
        const response = await productModel.$delete(mock.id);
        expect(response.id).to.be.equal(1);

      });
    });
  });
});

describe('"sale"', () => {
  describe('createSale', () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves([1]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna o numero da sale', async () => {
      const response = await saleModel.createSale(sale);
      expect(response).to.be.a('number');
    });
  });
  describe('getAllSales', () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves([mockSales]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Return an array of sales', async () => {
      const response = await saleModel.getAllSales();
      expect(response).to.be.an('array');
    });
  });

  describe('getSaleById', () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves([mockSales]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array de "sales"', async () => {
      const response = await saleModel.getSaleById(1);
      expect(response).to.be.an('array');
    });
  });

  describe('updateSale', () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves([1]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('faz o update da sale', async () => {
      const response = await saleModel.updateSale(sale.product_id, sale.quantity, 1);
      expect(response).to.be.an('array');
    });
  })
});
