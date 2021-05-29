    const axios = require('axios');

// Make a request for a user with a given ID
axios.get('https://www.twse.com.tw/exchangeReport/BWIBBU_d', { 
    params: {
        response: 'json',
        date: '20210529',
        stockNo: '2330'
    },
})
  .then(function (response) {
    // handle success
    console.log(response.data.date);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });