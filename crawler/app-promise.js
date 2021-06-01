const axios = require("axios");
const fs = require("fs");


// JS 處理時間
// let dt = new Date();
// let formatDate = dt.toISOString().slice(0,10).replace("-","").replace("-","");

// moment js
let moment = require('moment');
// console.log(moment().format('YYYYMMDD'));

function readFilePromise () {
    return new Promise((resolve, reject) => {
        fs.readFile("stock.txt", "utf8", (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
};
readFilePromise()
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

// npm i axios
// 引入 axios





// axios({
//     method: 'get',
//     url: 'https://www.twse.com.tw/exchangeReport/STOCK_DAY?',
//     params: {
//         date: 20210529,
//         stockNo: 2330
//     }
// }).then(function (response){
//     console.log(response.data.title)
// })