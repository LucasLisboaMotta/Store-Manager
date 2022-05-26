
const sinon = require("sinon");
const productsControllers = require("../../../controllers/productsControllers");
const productsService = require("../../../services/productsServices")
const chai = require('chai')
const { expect } = chai
chai.use(require('chai-as-promised'))

// const call = async () => {
//   const call = await productsService.getById(3)
//   console.log(call)
// }
// call();

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
 
})