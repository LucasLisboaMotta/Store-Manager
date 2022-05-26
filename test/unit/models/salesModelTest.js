
const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/concection");
const salesModel = require("../../../models/salesModel");

// const call = async () => {
//   const call = await salesModel.getAll()
//   console.log(String(call[0].date))
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
})