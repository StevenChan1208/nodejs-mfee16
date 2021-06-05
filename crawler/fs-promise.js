const axios = require("axios");

// 引入promise版的fs，就不需要自己寫
const fs = require("fs/promises");
let moment = require('moment');


// function readFilePromise () {
//     return new Promise((resolve, reject) => {
//         fs.readFile("stock.txt", "utf8", (err, data) => {
//             if (err) {
//                 reject(err)
//             }
//             resolve(data)
//         })
//     })
// };

fs.readFile("stock.txt", "utf-8")
    .then((result) => {
        // axios 是一個promise 當他return時，代表又丟了一個promise出去，所以外面可以再接一個then
        return axios({
            method: 'get',
            url: 'https://www.twse.com.tw/exchangeReport/STOCK_DAY?',
            params: {
                date: moment().format('YYYYMMDD'),
                stockNo: result
            }

        })
    })
    // 這個then接的是axios這個promise的結果
    .then(function (response){
        if(response.data.stat === "OK"){
            console.log(response.data.date);
            console.log(response.data.title);
        }
    // 任何一個promise發生錯誤 readFilePromise 和 axios的錯誤都會被catch接住

    }).catch((err) => {
        console.log(err)
    })