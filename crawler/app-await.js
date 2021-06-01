const axios = require("axios");
const moment = require("moment");
// TODO: 從 stock.txt 讀股票代碼進來
// filesystem
// npm i fs ??? -> 不用

function xhrPromise() {
  return new Promise((resolve, reject) => {
    const fs = require("fs");
    fs.readFile("stock.txt", "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
async function manager() {
  try {
    await axios
      .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
          response: "json",
          date: moment().format("YYYYMMDD"),
          stockNo: await xhrPromise(),
        },
      })
      .then(function (response) {
        if (response.data.stat === "OK") {
          console.log(response.data.date);
          console.log(response.data.title);
        }
      });
    // let result = await doWorkPromise("刷完牙", 2000, true);
    // console.log("await", result);
  } catch (err) {
    console.log("錯誤", err);
  } finally {
    console.log("最後做完了");
  }
}
manager();