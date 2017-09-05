var http = require('http'),
        fs = require('fs'),
        url = require('url'),
        port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function (request, response) {
    var parsedUrl = url.parse(request.url).pathname;
    //console.log('parsedUrl (just the pathname): ' + parsedUrl);
    /*
     Your request handler should send listingData in the JSON format if a GET request 
     is sent to the '/listings' path. Otherwise, it should send a 404 error. 
     
     HINT: explore the request object and its properties 
     http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
     */
    if (parsedUrl !== '/listings') {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        //console.log('Bad Gateway thrown');
        response.end('Bad gateway error');
    } else {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(JSON.stringify(listingData));
        //console.log('Should see listings.json...');
    }
};

fs.readFile('listings.json', 'utf8', function (err, data) {
    /*
     This callback function should save the data in the listingData variable, 
     then start the server. 
     */
    listingData = JSON.parse(data);
    //console.log('parsed listingData');
    server = http.createServer(requestHandler).listen(8080);
    console.log('Server listening on: http://localhost:8080');
});


