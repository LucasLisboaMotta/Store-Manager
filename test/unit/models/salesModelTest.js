
const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/concection");
const salesModel = require("../../../models/salesModel");

// const call = async () => {
//   const call = await salesModel.getAll()
//   console.log(call)
// }
// call();

describe("Testando Model sales", () => {
  describe("Testando GetAll do sales", async () => {
    const mock = [
      [
        {
          saleId: 1,
          date: '2022-05-26T15:28:35.000Z',
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: '2022-05-26T15:28:35.000Z',
          productId: 2,
          quantity: 10
        },
        {
          saleId: 2,
          date: '2022-05-26T15:28:35.000Z',
          productId: 3,
          quantity: 15
        }
      ],
      []
    ];
    beforeEach(async () => {
      const execute = mock;
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("Testando os argumentos usados na função", async () => {
    await salesModel.getAll();
    const spyCall = connection.execute.getCall(0);
    const query = `
    SELECT
    sales.id AS saleId,
    sales.date,
    sales_products.product_id AS productId,
    sales_products.quantity
    FROM sales
    INNER JOIN sales_products
    ON sales.id = sales_products.sale_id
    ORDER BY saleId, productId
    ;`;;
    expect(spyCall.args).to.deep.equal([query]);
    }) 

    it("Testando o retorno da função", async () => {
      const result = await salesModel.getAll();
      const expectReturn = [
        {
          saleId: 1,
          date: '2022-05-26T15:28:35.000Z',
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: '2022-05-26T15:28:35.000Z',
          productId: 2,
          quantity: 10
        },
        {
          saleId: 2,
          date: '2022-05-26T15:28:35.000Z',
          productId: 3,
          quantity: 15
        }
      ];
      expect(result).to.deep.equal(expectReturn);
    }) 
  })

  describe("Testando GetById do sales", async () => {
    const mock = [
      [
        {
          saleId: 1,
          date: '2022-05-26T15:28:35.000Z',
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: '2022-05-26T15:28:35.000Z',
          productId: 2,
          quantity: 10
        }
      ],
      []
    ];;

    beforeEach(async () => {
      const execute = mock;
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("Testando os argumentos usados na função", async () => {
    await salesModel.getById(1);
    const spyCall = connection.execute.getCall(0);
    const query = `
    SELECT 
    sales.date,
    sales_products.product_id AS productId,
    sales_products.quantity
    FROM sales
    INNER JOIN sales_products
    ON sales.id = sales_products.sale_id
    where sales.id = ?
    ORDER BY productId
    ;`;
    expect(spyCall.args).to.deep.equal([query, [1]]);
    }) 

    it("Testando o retorno da função", async () => {
      const result = await salesModel.getById(1);
      const expectReturn = [
        {
          saleId: 1,
          date: '2022-05-26T15:28:35.000Z',
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: '2022-05-26T15:28:35.000Z',
          productId: 2,
          quantity: 10
        }
      ];
      expect(result).to.deep.equal(expectReturn);
    }) 
  })

  describe("Testando postNewSale do sales", async () => {
    const mock = [ { insertId: 1}, undefined ];
    beforeEach(async () => {
      const execute = mock;
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("Testando os argumentos usados na função", async () => {
    await salesModel.postNewSale();
    const spyCall = connection.execute.getCall(0);
    const query = 'INSERT INTO sales (date) VALUES (NOW());';
    expect(spyCall.args).to.deep.equal([query]);
    }) 

    it("Testando o retorno da função", async () => {
      const result = await salesModel.postNewSale();
      const expectReturn = 1
      expect(result).to.deep.equal(expectReturn);
    }) 
  })

  describe("Testando postSaleProduct do sales", async () => {
    const mock = [ { insertId: 1}, undefined ];
    beforeEach(async () => {
      sinon.stub(connection, "execute").resolves();
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("Testando os argumentos usados na função", async () => {
    const args =  [{ quantity: 10, productId: 2}, 4]
    await salesModel.postSaleProduct(...args);
    const spyCall = connection.execute.getCall(0);
    const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';
    expect(spyCall.args).to.deep.equal([query, [4, 2, 10]]);
    }) 
  })
})