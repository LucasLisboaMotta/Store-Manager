// const concection = require('./concection');

// const test = async () => {
//   const frase = `update StoreManager.products set quantity = 45 where id = 1;`;
//    const oi = await concection.execute(frase);
//   console.log(oi);
// };

// test();

// post, nova informação
// [
//   ResultSetHeader {
//     fieldCount: 0,
//     affectedRows: 1,
//     insertId: 10,
//     info: '',
//     serverStatus: 2,
//     warningStatus: 0
//   },
//   undefined
// ]

// delete
// [
//   ResultSetHeader {
//     fieldCount: 0,
//     affectedRows: 1,
//     insertId: 0,
//     info: '',
//     serverStatus: 2,
//     warningStatus: 0
//   },
//   undefined
// ]

// update
// [
//   ResultSetHeader {
//     fieldCount: 0,
//     affectedRows: 1,
//     insertId: 0,
//     info: 'Rows matched: 1  Changed: 1  Warnings: 0',
//     serverStatus: 2,
//     warningStatus: 0,
//     changedRows: 1
//   },
//   undefined
// ]