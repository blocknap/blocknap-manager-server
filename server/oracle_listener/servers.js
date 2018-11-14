const request = require('request');

exports.addOracle = function(address,abi,oracle) {
    if (global.properties.oracle_enable) {
        callHttp(global.properties.oracle_manager,address,abi,oracle);
    }
}


exports.addListen = function(address,abi,listener) {
    if (global.properties.listen_enable) {
        callHttp(global.properties.listen_manager,address,abi,listener);
    }
}


function callHttp(url,address,abi,name) {

    var body = {"abi":abi};
    console.log("> call server :"+url+name+"/"+address);
    var options = {
        uri: url+name+"/"+address,
        method: 'POST',
        json:body
    };

    request(options, function (error, response, body) {
        console.log('> error request ', error); // Print the error if one occurred
        console.log('> statusCode request ', response && response.statusCode); // Print the response status code if a response was received
        console.log('> body request ', body); // Print the HTML for the Google homepage.
    });


}