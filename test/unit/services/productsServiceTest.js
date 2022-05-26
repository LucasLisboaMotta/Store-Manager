
const sinon = require("sinon");
const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsServices")
const chai = require('chai')
const { expect } = chai
chai.use(require('chai-as-promised'))

// const call = async () => {
//   const call = await productsService.getById(3)
//   console.log(call)
// }
// call();

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
      const result = await productsService.getById(1);
      expect(result).to.deep.equal(mock);
      productsModel.getById.restore();
    })

    it("Verificando erro", async () => {
    const mock = undefined;
    sinon.stub(productsModel, "getById").resolves(mock);
    const result = productsService.getById;
    await expect(result()).to.be.rejectedWith(Error);
    productsModel.getById.restore();
    })
  })
})