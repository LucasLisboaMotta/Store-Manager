
const sinon = require("sinon");
const salesControllers = require("../../../controllers/salesControllers");
const salesService = require("../../../services/salesServices")
const chai = require('chai')
const { expect } = chai
chai.use(require('chai-as-promised'))

describe("Testando sales da aba Controller", () => {
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
      sinon.stub(salesService, "getAll").resolves(mock);

      await salesControllers.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);;
      salesService.getAll.restore();
    })

    it('testando  o body do getAll', async () => {
       const mock = [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
      ];
      sinon.stub(salesService, "getAll").resolves(mock);
      await salesControllers.getAll(request, response);
      expect(response.json.calledWith(mock)).to.be.equal(true);;
      salesService.getAll.restore();
    })
  })

  describe("Testando o getById", async () => {
    it('testando  o status do getById', async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(salesService, "getById").resolves(mock);
      await salesControllers.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);;
      salesService.getById.restore();
    })

    it('testando  o body do getById', async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(salesService, "getById").resolves(mock);
      await salesControllers.getById(request, response);
      expect(response.json.calledWith(mock)).to.be.equal(true);;
      salesService.getById.restore();
    })

    it('testando  o next do getById', async () => {

      const mensage = { status: 404, mensage: 'Sale not found'};
      sinon.stub(salesService, "getById").throws(mensage);
      const next = sinon.stub().returns();
      await salesControllers.getById(request, response, next);
      expect(next.calledWith(mensage)).to.be.equal(true);;
      salesService.getById.restore();
    })
  })
 
  describe("Testando o post", async () => {
    it('testando  o status do post', async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(salesService, "post").resolves(mock);
      await salesControllers.post(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);;
      salesService.post.restore();
    })

    it('testando  o body do post', async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(salesService, "post").resolves(mock);
      await salesControllers.post(request, response);
      expect(response.json.calledWith(mock)).to.be.equal(true);;
      salesService.post.restore();
    })

    it('testando  o next do post', async () => {

      const mensage = { status: 422, mensage: 'Such amount is not permitted to sell'};
      sinon.stub(salesService, "post").throws(mensage);
      const next = sinon.stub().returns();
      await salesControllers.post(request, response, next);
      expect(next.calledWith(mensage)).to.be.equal(true);;
      salesService.post.restore();
    })
  })

  describe("Testando o put", async () => {
    it('testando  o status do put', async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(salesService, "put").resolves(mock);
      await salesControllers.put(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);;
      salesService.put.restore();
    })

    it('testando  o body do put', async () => {
      const mock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(salesService, "put").resolves(mock);
      await salesControllers.put(request, response);
      expect(response.json.calledWith(mock)).to.be.equal(true);;
      salesService.put.restore();
    })

    it('testando  o next do put', async () => {

      const mensage = { status: 404, mensage: 'Sale not found'};
      sinon.stub(salesService, "put").throws(mensage);
      const next = sinon.stub().returns();
      await salesControllers.put(request, response, next);
      expect(next.calledWith(mensage)).to.be.equal(true);;
      salesService.put.restore();
    })
  })

  describe("Testando o delete", async () => {
    it('testando  o status do delete', async () => {
      sinon.stub(salesService, "delete").resolves();
      await salesControllers.delete(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);;
      salesService.delete.restore();
    })

    it('testando  o body do delete', async () => {
      sinon.stub(salesService, "delete").resolves();
      await salesControllers.delete(request, response);
      expect(response.json.calledWith()).to.be.equal(true);;
      salesService.delete.restore();
    })

    it('testando  o next do delete', async () => {

      const mensage = { status: 404, mensage: 'Sale not found'};
      sinon.stub(salesService, "delete").throws(mensage);
      const next = sinon.stub().returns();
      await salesControllers.delete(request, response, next);
      expect(next.calledWith(mensage)).to.be.equal(true);;
      salesService.delete.restore();
    })
  })
})