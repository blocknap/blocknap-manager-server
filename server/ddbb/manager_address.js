const { Pool, Client } = require('pg');

var pool = null;

function initPool() {
    if (pool===null) {
        pool = new Pool({
            connectionString: global.properties.db,
        })
    }
}

exports.insertAddress = function(name,address,abi) {
    initPool();
    pool.query('INSERT INTO manager_address(name,address,abi) VALUES($1,$2,$3)', [name,address,abi], (err, res) => {
        console.log("> insert into manager_address");
    });
}

exports.getAllAddress = function() {
    initPool();
    pool.query('select * from manager_address', (err, res) => {
        console.log("> get all address "+res.rows.length);
        global.allAddress = res.rows;
    })
}
