const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const find = require('../find/findSmartContract');


exports.openServer = function (callback) {
    console.log("> Init Express");
    setRoute();
    app.listen(global.properties.port);
    callback(null, 'openServer');
    console.log('> Open port ' + properties.port);
}


function setRoute() {

    router.post('/insert/:name', function(req, res) {
        console.log("> call insert");
        find.create(req,res);
    });

    router.post('/call/:name/:function_name/:address', function(req, res) {
        console.log("> call function");
        find.call(req,res);
    });

    app.use('/manager/v1', router);


}