const sinon = require("sinon");
const salesModel = require("../../../models/salesModel");
const salesService = require("../../../services/salesServices")
const chai = require('chai')
const { expect } = chai
// chai.use(require('chai-as-promised'))

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
      const mock = [
       { date: '2022-05-26T17:06:00.000Z', productId: 1, quantity: 5 },
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

  describe("Testando Post sales", async () => {    
    it("Verificando o retorno da função", async () => {
      const args = { body: [{ productId: 1, quantity: 6 }] };
      sinon.stub(salesModel, "postNewSale").resolves(3);
      sinon.stub(salesModel, "postSaleProduct").resolves();
      const result = await salesService.post(args);
      expect(result).to.deep.equal({ id: 3, itemsSold: [{ productId: 1, quantity: 6 }]});
      salesModel.postNewSale.restore();
      salesModel.postSaleProduct.restore();
    })

    it("Verificando o os argumentos usados na função salesMode.postSaleProduct", async () => {
      const args = { body: [
        { productId: 1, quantity: 6 },
        { productId: 3, quantity: 7 },
        { productId: 9, quantity: 9 }
      ]};
      sinon.stub(salesModel, "postNewSale").resolves(3);
      sinon.stub(salesModel, "postSaleProduct").resolves();
      await salesService.post(args);
      const spyCall0 = salesModel.postSaleProduct.getCall(0);
      const spyCall1 = salesModel.postSaleProduct.getCall(1);
      const spyCall2 = salesModel.postSaleProduct.getCall(2);
      const spyCall3 = salesModel.postSaleProduct.getCall(3);
      expect(spyCall0.args).to.deep.equal([{ productId: 1, quantity: 6 }, 3]);
      expect(spyCall1.args).to.deep.equal([{ productId: 3, quantity: 7 }, 3]);
      expect(spyCall2.args).to.deep.equal([{ productId: 9, quantity: 9 }, 3]);
      expect(spyCall3).to.deep.equal(null);
      salesModel.postNewSale.restore();
      salesModel.postSaleProduct.restore();
    })
  })

  describe("Testando Put sales", async () => {    
    it("Verificando o retorno da função", async () => {
      const args = { params: { id: '10' }, body: [{ productId: 1, quantity: 6 }] };
      const mock = [
        { date: '2022-05-26T17:06:00.000Z', productId: 1, quantity: 5 },
        { date: '2022-05-26T17:06:00.000Z', productId: 2, quantity: 10 }
       ];
      sinon.stub(salesModel, "deleteSaleProduct").resolves();
      sinon.stub(salesModel, "postSaleProduct").resolves();
      sinon.stub(salesModel, "getById").resolves(mock);
      const result = await salesService.put(args);
      expect(result).to.deep.equal({ saleId: '10', itemUpdated: [{ productId: 1, quantity: 6 }]});
      salesModel.deleteSaleProduct.restore();
      salesModel.postSaleProduct.restore();
      salesModel.getById.restore();
    })

    it("Verificando erro", async () => {
      const mock = [];
      const args = { params: { id: '10' }, body: [{ productId: 1, quantity: 6 }] };
      sinon.stub(salesModel, "getById").resolves(mock);
      sinon.stub(salesModel, "deleteSaleProduct").resolves();
      sinon.stub(salesModel, "postSaleProduct").resolves();
      await expect(salesService.put(args)).to.be.rejectedWith({ status: 404, message: 'Sale not found'});
      salesModel.getById.restore();
      salesModel.deleteSaleProduct.restore();
      salesModel.postSaleProduct.restore();
      })

    it("Verificando o os argumentos usados na função salesMode.postSaleProduct", async () => {
      const args = { 
        params: { id: '10' },
        body: [
        { productId: 1, quantity: 6 },
        { productId: 3, quantity: 7 },
        { productId: 9, quantity: 9 }
      ]};
      const mock = [
        { date: '2022-05-26T17:06:00.000Z', productId: 1, quantity: 5 },
        { date: '2022-05-26T17:06:00.000Z', productId: 2, quantity: 10 }
       ];
      sinon.stub(salesModel, "getById").resolves(mock);
      sinon.stub(salesModel, "deleteSaleProduct").resolves();
      sinon.stub(salesModel, "postSaleProduct").resolves();
      await salesService.put(args);
      const spyCall0 = salesModel.postSaleProduct.getCall(0);
      const spyCall1 = salesModel.postSaleProduct.getCall(1);
      const spyCall2 = salesModel.postSaleProduct.getCall(2);
      const spyCall3 = salesModel.postSaleProduct.getCall(3);
      expect(spyCall0.args).to.deep.equal([{ productId: 1, quantity: 6 }, '10']);
      expect(spyCall1.args).to.deep.equal([{ productId: 3, quantity: 7 }, '10']);
      expect(spyCall2.args).to.deep.equal([{ productId: 9, quantity: 9 }, '10']);
      expect(spyCall3).to.deep.equal(null);
      salesModel.getById.restore();
      salesModel.deleteSaleProduct.restore();
      salesModel.postSaleProduct.restore();
    })
  })

  describe("Testando delete sales", async () => {    
    it("Verificando o retorno da função", async () => {
      const mock = [
       { date: '2022-05-26T17:06:00.000Z', productId: 1, quantity: 5 },
       { date: '2022-05-26T17:06:00.000Z', productId: 2, quantity: 10 }
      ];
      sinon.stub(salesModel, "getById").resolves(mock);
      sinon.stub(salesModel, "deleteSaleProduct").resolves();
      sinon.stub(salesModel, "deleteSales").resolves();
      await salesService.delete({ params: { id: '1'} });
      const spyCallGetById = salesModel.getById.getCall(0);
      const spyCallDeleteSaleProduct = salesModel.deleteSaleProduct.getCall(0);
      const spyCallDeleteSales = salesModel.deleteSales.getCall(0);
      expect(spyCallGetById.args).to.deep.equal(['1']);
      expect(spyCallDeleteSaleProduct.args).to.deep.equal(['1']);
      expect(spyCallDeleteSales.args).to.deep.equal(['1']);
      salesModel.getById.restore();
      salesModel.deleteSaleProduct.restore();
      salesModel.deleteSales.restore();
    })

    it("Verificando erro", async () => {
    const mock = [];
    sinon.stub(salesModel, "getById").resolves(mock);
    const args = { params: { id: '10'} };
    await expect(salesService.delete(args)).to.be.rejectedWith({ status: 404, message: 'Sale not found'});
    salesModel.getById.restore();
    })
  })

})