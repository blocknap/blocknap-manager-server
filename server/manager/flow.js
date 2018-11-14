const async = require("async");
const manage = require('../blockchain/ethereum/manageSmartContract');
const servers = require('../oracle_listener/servers');
const dbAddress = require('../ddbb/manager_address');

exports.compile = function(info,infoSc,paramsConstructor,res) {
    async.series({
        abi: function(callback) {
            manage.compile(infoSc,callback)
        }
    }, function(err, results) {
        async.series({
            mine: function(callback) {
                manage.mine(info,results, callback);
            }
        }, function(err, results) {
            if(results.mine.address !==  undefined && results.mine.address !== "") {
                servers.addOracle(results.mine.address,results.mine.abi,infoSc.oracle);
                servers.addListen(results.mine.address,results.mine.abi,infoSc.listener);
                dbAddress.insertAddress(infoSc.name,results.mine.address,results.mine.abi);
            } else {
                console.log("> error mine contract:"+results.mine.error.message);
            }
            res.json(results.mine);
        });
    });
}
