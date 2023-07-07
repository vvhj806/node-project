const mysql = require('mysql');
const db = require('../../config/database.js');

module.exports = {
    login: function(id, pass) {
        const sql =  `SELECT * FROM member WHERE id = '${id}' AND password = '${pass}'`;

        return new Promise((resolve, reject) => {
            const con = mysql.createConnection(db);
            con.query(
                sql, (err, result, field) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
            con.end();
        });
    }
}