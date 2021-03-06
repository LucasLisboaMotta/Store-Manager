
const sinon = require("sinon");
const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsServices")
const chai = require('chai')
const { expect } = chai
chai.use(require('chai-as-promised'))

describe("Testando Service Products", () => {
  describe("Testando GetAll Products", async () => {
    
    
    it("Verificando o retorno da função", async () => {
      const mock = [
          { id: 1, name: 'Martelo de Thor', quantity: 10 },
          { id: 2, name: 'Traje de encolhimento', quantity: 20 },
          { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
        ];
      sinon.stub(productsModel, "getAll").resolves(mock);
      const result = await productsService.getAll();
      expect(result).to.deep.equal(mock);
      productsModel.getAll.restore();
    })
  })

  describe("Testando GetById Products", async () => {    
    it("Verificando o retorno da função", async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(productsModel, "getById").resolves(mock);
      const result = await productsService.getById({ params: { id: '1'} });
      expect(result).to.deep.equal(mock);
      productsModel.getById.restore();
    })

    it("Verificando erro", async () => {
    const mock = undefined;
    sinon.stub(productsModel, "getById").resolves(mock);
    const result = productsService.getById;
    await expect(result({ params: { id: '10'} })).to.be.rejectedWith({ status: 404, message: 'Product not found'});
    productsModel.getById.restore();
    })
  })

  describe("Testando Post Products", async () => {    
    it("Verificando o retorno da função", async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(productsModel, "post").resolves(mock.id);
      sinon.stub(productsModel, "getByName").resolves(undefined);
      const result = await productsService.post({ body: { name: mock.name, quantity: mock.quantity} });
      expect(result).to.deep.equal(mock);
      productsModel.getByName.restore();
      productsModel.post.restore();
    })

    it("Verificando erro", async () => {
    const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
    sinon.stub(productsModel, "post").resolves(mock.id);
    sinon.stub(productsModel, "getByName").resolves(mock);
    const params = { body: { name: mock.name, quantity: mock.quantity} };
    await expect(productsService.post(params)).to.be.rejectedWith({ status: 409, message: 'Product already exists'});
    productsModel.getByName.restore();
    productsModel.post.restore();
    })
  })

  describe("Testando put Products", async () => { 
    const args = { params: { id: 1} , body: { name: 'Martelo de Thor', quantity: 10 } }   
    it("Verificando o retorno da função", async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(productsModel, "put").resolves();
      sinon.stub(productsModel, "getById").resolves(mock);
      const result = await productsService.put(args);
      expect(result).to.deep.equal(mock);
      productsModel.put.restore();
      productsModel.getById.restore();
    })

    it("Verificando erro", async () => {
    const mock = undefined;
    sinon.stub(productsModel, "put").resolves();
    sinon.stub(productsModel, "getById").resolves(mock);
    await expect(productsService.put(args)).to.be.rejectedWith({ status: 404, message: 'Product not found'});
    productsModel.put.restore();
    productsModel.getById.restore();
    })
  })

  describe("Testando delete Products", async () => { 
    const args = { params: { id: 1} }   
    it("Verificando o retorno da função", async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(productsModel, "delete").resolves();
      sinon.stub(productsModel, "getById").resolves(mock);
      const result = await productsService.delete(args);
      expect(result).to.deep.equal(args.params.id);
      productsModel.delete.restore();
      productsModel.getById.restore();
    })

    it("Verificando erro", async () => {
    const mock = undefined;
    sinon.stub(productsModel, "delete").resolves();
    sinon.stub(productsModel, "getById").resolves(mock);
    await expect(productsService.delete(args)).to.be.rejectedWith({ status: 404, message: 'Product not found'});
    productsModel.delete.restore();
    productsModel.getById.restore();
    })
  })
})