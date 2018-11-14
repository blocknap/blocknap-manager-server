const program = require('commander');
const async = require("async");
const fs = require('fs');
const wallet = require('./server/blockchain/ethereum/getWallet');
const manager = require('./server/manager/flow');
const express = require('./server/express/express');

program
    .version('0.1.0')
    .option('-f, --file <value>', 'set file', './blocknap_manager_server.json');

// must be before .parse() since
// node's emit() is immediate
program.on('--help', function () {
    console.log('')
    console.log('Examples:');
    console.log('');
    console.log('  - f blocknap_manager_server.json');
});

program.parse(process.argv);

function load() {
    console.log("--------------------------------");
    console.log(" BlockNap Manager Server v0.2.0");
    console.log("--------------------------------");
    const propertiesRaw = fs.readFileSync(program.file);
    global.properties = JSON.parse(propertiesRaw);
    initApp();
}


function initApp() {

    async.series([
            function (callback) {
                wallet.setWallet(callback);
            },
            function (callback) {
                wallet.openAccount(callback);
            },
            function (callback) {
                express.openServer(callback);
            }
        ],
        function (err, results) {
            console.log("> series "+JSON.stringify(results));
        });

}

load();