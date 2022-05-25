
const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/concection");
const salesModel = require("../../../models/salesModel");

describe("Testando Model Sale", () => {

  describe("Testando GetAll do Sales", async () => {
    const sales = [ 
      { id: 1, date: '2022-05-10 10:10:10' },
      { id: 2, date: '2022-05-11 20:20:20' }
    ];

    beforeEach(async () => {
      const execute = [sales];
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("testando o argumento usado no connection", async () => {
      sinon.spy(connection, "execute")
      await salesModel.getAll();
      const spyCall = connection.execute.getCall(0)
      const query = 'SELECT * FROM sales'
      expect(spyCall.args).to.equal([query]);
    });

    it("retorna um array", async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.a("array");
    });

    it("se o array possui objetos dentro", async () => {
      const response = await salesModel.getAll();
      expect(response[0]).to.be.a("object");
    });

    it("se os objetos estão na forma correta", async () => {
      const response = await salesModel.getAll();
      expect(response[0]).to.equal({ id: 1, date: '2022-05-10 10:10:10' });
      expect(response[1]).to.equal({ id: 2, date: '2022-05-11 20:20:20' });
    });

  });

  describe("Testando GetById do Sales", async () => {
    const sales = [ 
      { id: 1, date: '2022-05-10 10:10:10' }
    ];

    beforeEach(async () => {
      const execute = [sales];
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("testando o argumento usado no conection", async () => {
      sinon.spy(connection, "execute")
      await salesModel.getById(1);
      const spyCall = connection.execute.getCall(0);
      const query = 'SELECT * FROM sales WHERE id = ?';
      expect(spyCall.args).to.equal([query, [1]]);
    });

    it("retorna um objeto", async () => {
      const response = await salesModel.getById(1);
      expect(response).to.be.a("object");
    });

    it("se o objeto esta na forma correta", async () => {
      const response = await salesModel.getById(1);
      expect(response).to.equal({ id: 1, date: '2022-05-10 10:10:10' });
    });

  });

  describe("Testando post do Sales", async () => {
    const sales = [
      {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 10,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      },
      undefined
    ];

    beforeEach(async () => {
      const execute = sales;
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("testando o argumento usado no conection", async () => {
      sinon.spy(connection, "execute")
      await salesModel.getPost('2022-05-10 10:10:10');
      const spyCall = connection.execute.getCall(0)
      const query = 'INSERT INTO sales (date) VALUES (?);'
      expect(spyCall.args).to.equal([query, ['2022-05-10 10:10:10']]);
    });

    it("retorna um objeto", async () => {
      const response = await salesModel.getPost('2022-05-10 10:10:10');
      expect(response).to.be.a("object");
    });

    it("se o objeto possui o id correto", async () => {
      const response = await salesModel.getPost('2022-05-10 10:10:10');
      expect(response.insertId).to.equal(10);
    });
  });

  describe("Testando put do Sales", async () => {
    const sales = [
      {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 10,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      },
      undefined
    ];

    beforeEach(async () => {
      const execute = sales;
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("testando o argumento usado no conection", async () => {
      sinon.spy(connection, "execute")
      await salesModel.getPost('2022-05-10 10:10:10');
      const spyCall = connection.execute.getCall(0)
      const query = 'INSERT INTO sales (date) VALUES (?);'
      expect(spyCall.args).to.equal([query, ['2022-05-10 10:10:10']]);
    });

    it("retorna um objeto", async () => {
      const response = await salesModel.getPost('2022-05-10 10:10:10');
      expect(response).to.be.a("object");
    });

    it("se o objeto possui o id correto", async () => {
      const response = await salesModel.getPost('2022-05-10 10:10:10');
      expect(response.insertId).to.equal(10);
    });
  });
});