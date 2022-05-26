const sinon = require("sinon");
const salesModel = require("../../../models/salesModel");
const salesService = require("../../../services/salesServices")
const chai = require('chai')
const { expect } = chai
chai.use(require('chai-as-promised'))

// const call = async () => {
//   const call = await salesService.getById(5)
//   console.log(call)
// }
// call();

describe("Testando Service sales", () => {
  describe("Testando GetAll sales", async () => {
    
    
    it("Verificando o retorno da função", async () => {
      const mock = [
        {
          saleId: 1,
          date: '2022-05-26T17:06:00.000Z',
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: '2022-05-26T17:06:00.000Z',
          productId: 2,
          quantity: 10
        },
        {
          saleId: 2,
          date: '2022-05-26T17:06:00.000Z',
          productId: 3,
          quantity: 15
        }
      ]
      sinon.stub(salesModel, "getAll").resolves(mock);
      const result = await salesService.getAll();
      expect(result).to.deep.equal(mock);
      salesModel.getAll.restore();
    })
  })

  describe("Testando GetById sales", async () => {    
    it("Verificando o retorno da função", async () => {
      const mock = [{ date: '2022-05-26T17:06:00.000Z', productId: 1, quantity: 5 },
       { date: '2022-05-26T17:06:00.000Z', productId: 2, quantity: 10 }
      ];
      sinon.stub(salesModel, "getById").resolves(mock);
      const result = await salesService.getById({ params: { id: '1'} });
      expect(result).to.deep.equal(mock);
      salesModel.getById.restore();
    })

    it("Verificando erro", async () => {
    const mock = [];
    sinon.stub(salesModel, "getById").resolves(mock);
    const result = salesService.getById;
    await expect(result({ params: { id: '10'} })).to.be.rejectedWith({ status: 404, message: 'Sale not found'});
    salesModel.getById.restore();
    })
  })
})