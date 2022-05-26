
const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/concection");
const productsModel = require("../../../models/productsModel");

// const call = async () => {
//   const call = await productsModel.getAll()
//   console.log(call)
// }
// call();

describe("Testando Model products", () => {
  describe("Testando GetAll do products", async () => {
    const mock = [
      [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
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
      await productsModel.getAll();
      const spyCall = connection.execute.getCall(0);
      const query = 'SELECT * FROM products';
      expect(spyCall.args).to.deep.equal([query]);
    }) 

    it("Testando o retorno da função", async () => {
      const result = await productsModel.getAll();
      const expectReturn = [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
      ];
      expect(result).to.deep.equal(expectReturn);
    }) 
  })

  describe("Testando GetById do products", async () => {
    const mock = [
      [{ id: 1, name: 'Martelo de Thor', quantity: 10 }],
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
      await productsModel.getById(1);
      const spyCall = connection.execute.getCall(0);
      const query = 'SELECT * FROM products WHERE id = ?';
      expect(spyCall.args).to.deep.equal([query, [1]]);
    }) 

    it("Testando o retorno da função", async () => {
      const result = await productsModel.getById(1);
      const expectReturn = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      expect(result).to.deep.equal(expectReturn);
    }) 
  })
})
