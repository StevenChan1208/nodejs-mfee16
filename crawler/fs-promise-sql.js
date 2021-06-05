//引入各個需求
const axios = require("axios");
const fs = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql");
const Promise = require("bluebird");

//建立連線所需資料
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "stock",
});
//建立連線
connection = Promise.promisifyAll(connection);

(async function () {
  try {
    await connection.connectAsync();

    //讀取STOCK.TXT  
    let stockCode = await fs.readFile("stock.txt", "utf-8");
    console.log(`我的 stock code: ${stockCode}`);
    let stock = await connection.queryAsync(`SELECT stock_id FROM stock WHERE stock_id = ${stockCode}`);

    if (stock.length <= 0) {
        let response = await axios.get(`https://www.twse.com.tw/zh/api/codeQuery?query=${stockCode}`
    );
    let answer = response.data.suggestions.shift();
    let answers = answer.split("\t");
        // console.log(stockInfos);
        if (answers.length > 1) {
            //TODO: answers[0], answers[1]
            connection.queryAsync(`INSERT INTO stock (stock_id, stock_name) VALUES ('${answers[0]}', '${answers[1]}')`);
        }
    }
} catch (err) {
    console.error (err);
} finally {
    connection.end();
}
})();