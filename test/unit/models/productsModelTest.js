
const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/concection");
const productsModel = require("../../../models/productsModel");

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

  describe("Testando GetByName do products", async () => {
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
      await productsModel.getByName('Martelo de Thor');
      const spyCall = connection.execute.getCall(0);
      const query = 'SELECT * FROM products WHERE name = ?';
      expect(spyCall.args).to.deep.equal([query, ['Martelo de Thor']]);
    }) 

    it("Testando o retorno da função", async () => {
      const result = await productsModel.getByName('Martelo de Thor');
      const expectReturn = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      expect(result).to.deep.equal(expectReturn);
    }) 
  })

  describe("Testando post do products", async () => {
    const mock = [
      { insertId: 10 },
      undefined
    ];

    beforeEach(async () => {
      const execute = mock;
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("Testando os argumentos usados na função", async () => {
      await productsModel.post('Martelo de Thor', 8);
      const spyCall = connection.execute.getCall(0);
      const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';
      expect(spyCall.args).to.deep.equal([query, ['Martelo de Thor', 8]]);
    }) 

    it("Testando o retorno da função", async () => {
      const result = await productsModel.post('Martelo de Thor', 8);
      const expectReturn = 10;
      expect(result).to.deep.equal(expectReturn);
    }) 
  })

  describe("Testando Put do products", async () => {
    const mock = [
      { insertId: 10 },
      undefined
    ];

    beforeEach(async () => {
      const execute = mock;
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("Testando os argumentos usados na função", async () => {
      await productsModel.put('Martelo de Thor', 8, 1);
      const spyCall = connection.execute.getCall(0);
      const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?;';
      expect(spyCall.args).to.deep.equal([query, ['Martelo de Thor', 8, 1]]);
    }) 
  })

  describe("Testando Delete do products", async () => {
    const mock = [
      { affectedRows: 10 },
      undefined
    ];

    beforeEach(async () => {
      const execute = mock;
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("Testando os argumentos usados na função", async () => {
      await productsModel.delete(1);
      const spyCall = connection.execute.getCall(0);
      const query = 'DELETE FROM products WHERE id = ?;';
      expect(spyCall.args).to.deep.equal([query, [1]]);
    }) 
  })

  describe("Testando sumQuantity do products", async () => {
    const mock = [
      { affectedRows: 10 },
      undefined
    ];

    beforeEach(async () => {
      const execute = mock;
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("Testando os argumentos usados na função", async () => {
      await productsModel.sumQuantity({ quantity: 10, productId: 1 });
      const spyCall = connection.execute.getCall(0);
      const query = 'UPDATE products SET quantity = quantity + ? WHERE id = ?;';
      expect(spyCall.args).to.deep.equal([query, [10, 1]]);
    }) 
  })

  describe("Testando subtractQuantity do products", async () => {
    const mock = [
      { affectedRows: 10 },
      undefined
    ];

    beforeEach(async () => {
      const execute = mock;
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("Testando os argumentos usados na função", async () => {
      await productsModel.subtractQuantity({ quantity: 10, productId: 1 });
      const spyCall = connection.execute.getCall(0);
      const query = 'UPDATE products SET quantity = quantity - ? WHERE id = ?;';
      expect(spyCall.args).to.deep.equal([query, [10, 1]]);
    }) 
  })
})
