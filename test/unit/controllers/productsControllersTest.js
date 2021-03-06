
const sinon = require("sinon");
const productsControllers = require("../../../controllers/productsControllers");
const productsService = require("../../../services/productsServices")
const chai = require('chai')
const { expect } = chai
chai.use(require('chai-as-promised'))

describe("Testando Products da aba Controller", () => {
  const request = {};
  const response = {};
  response.json = sinon.stub().returns();
  response.status = sinon.stub().returns(response);
  describe("Testando o getAll", async () => {
    it('testando  o status do getAll', async () => {
      const mock = [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
      ];
      sinon.stub(productsService, "getAll").resolves(mock);

      await productsControllers.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);;
      productsService.getAll.restore();
    })

    it('testando  o body do getAll', async () => {
       const mock = [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
      ];
      sinon.stub(productsService, "getAll").resolves(mock);
      await productsControllers.getAll(request, response);
      expect(response.json.calledWith(mock)).to.be.equal(true);;
      productsService.getAll.restore();
    })
  })

  describe("Testando o getById", async () => {
    it('testando  o status do getById', async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(productsService, "getById").resolves(mock);
      await productsControllers.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);;
      productsService.getById.restore();
    })

    it('testando  o body do getById', async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(productsService, "getById").resolves(mock);
      await productsControllers.getById(request, response);
      expect(response.json.calledWith(mock)).to.be.equal(true);;
      productsService.getById.restore();
    })

    it('testando  o next do getById', async () => {

      const mensage = { status: 404, mensage: 'Product not found'};
      sinon.stub(productsService, "getById").throws(mensage);
      const next = sinon.stub().returns();
      await productsControllers.getById(request, response, next);
      expect(next.calledWith(mensage)).to.be.equal(true);;
      productsService.getById.restore();
    })
  })

  describe("Testando o post", async () => {
    it('testando  o status do post', async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(productsService, "post").resolves(mock);
      await productsControllers.post(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);;
      productsService.post.restore();
    })

    it('testando  o body do post', async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(productsService, "post").resolves(mock);
      await productsControllers.post(request, response);
      expect(response.json.calledWith(mock)).to.be.equal(true);;
      productsService.post.restore();
    })

    it('testando  o next do post', async () => {

      const mensage = { status: 409, mensage: 'Product already exists'};
      sinon.stub(productsService, "post").throws(mensage);
      const next = sinon.stub().returns();
      await productsControllers.post(request, response, next);
      expect(next.calledWith(mensage)).to.be.equal(true);;
      productsService.post.restore();
    })
  })  

  describe("Testando o put", async () => {
    it('testando  o status do put', async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(productsService, "put").resolves(mock);
      await productsControllers.put(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);;
      productsService.put.restore();
    })

    it('testando  o body do put', async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(productsService, "put").resolves(mock);
      await productsControllers.put(request, response);
      expect(response.json.calledWith(mock)).to.be.equal(true);;
      productsService.put.restore();
    })

    it('testando  o next do put', async () => {

      const mensage = { status: 404, mensage: 'Product not found'};
      sinon.stub(productsService, "put").throws(mensage);
      const next = sinon.stub().returns();
      await productsControllers.put(request, response, next);
      expect(next.calledWith(mensage)).to.be.equal(true);;
      productsService.put.restore();
    })
  })

  describe("Testando o delete", async () => {
    it('testando  o status do delete', async () => {
      sinon.stub(productsService, "delete").resolves();
      await productsControllers.delete(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);;
      productsService.delete.restore();
    })

    it('testando  o body do delete', async () => {
      sinon.stub(productsService, "delete").resolves();
      await productsControllers.delete(request, response);
      expect(response.json.calledWith()).to.be.equal(true);;
      productsService.delete.restore();
    })

    it('testando  o next do delete', async () => {

      const mensage = { status: 404, mensage: 'Product not found'};
      sinon.stub(productsService, "delete").throws(mensage);
      const next = sinon.stub().returns();
      await productsControllers.delete(request, response, next);
      expect(next.calledWith(mensage)).to.be.equal(true);;
      productsService.delete.restore();
    })
  })
})