const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'UTF-8');
const orderlist_view = fs.readFileSync('./orderlist.html');

const mariadb = require('./database/connect/mariadb');



let handle = {}; //keyvalue

function main(response){
    console.log('main');

    mariadb.query("select * from product", function(err, rows){
        console.log(rows);
    })

    response.writeHead(200, {'content-Type' : 'text/html'});
    response.write(main_view)
    response.end();
}


function favicon(response) {
    response.writeHead(204); // No Content
    response.end();
}

function redRacket(response){
    fs.readFile('./img/redRacket.png', function(err, data){
        response.writeHead(200, {'content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function blueRacket(response){
    fs.readFile('./img/blueRacket.png', function(err, data){
        response.writeHead(200, {'content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function blackRacket(response){
    fs.readFile('./img/blackRacket.png', function(err, data){
        response.writeHead(200, {'content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}


function order(response, productId){
    response.writeHead(200, {'content-Type' : 'text/html'});

    mariadb.query("insert into orderlist values (" + productId + ", '"+ new Date().toLocaleDateString() + "');", function(err, rows){
        console.log(rows);
    })


    response.write('order page');
    response.end();
}

function orderlist(response){
    console.log('orderlist');

    response.writeHead(200, {'content-Type' : 'text/html'});

    mariadb.query("select * from orderlist", function(err, rows){
        response.write(orderlist_view);

        rows.forEach(element => {
        response.write(
        "<tr>" +
        "<td>" + element.productId + "</td>" +
        "<td>" + element.orderDate + "</td>" +
        "</tr>"
  );
});


        response.write("</table>");
        response.end();
        
    })
}

handle['/'] = main;
handle['/favicon.ico'] = favicon;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

/* image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;