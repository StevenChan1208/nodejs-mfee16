$(function () {
    /* ajax */
    $.ajax({
        type: "GET",
        // path refer to /routes/api
        url: "/api/stock",
    }).done(function (data) {
        console.log(data);
    }).always(function () {
        console.log("done");
    });

    /* axios -> promised-based */
    // then or async / await
    axios.get('/api/stock')
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {

        });
    
    /* fetch -> promised-based */
    // then or async / await
    fetch('/api/stock')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
})