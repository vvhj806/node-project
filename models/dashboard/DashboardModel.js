const mysql = require('mysql');
const db = require('../../config/database.js');

module.exports = {
    getIntroduceInfo: function(companyId) {
        const sql =  `SELECT * FROM company_introduce WHERE company_id = '${companyId}' ANd del_yn = 'n'`;

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
    },
    saveIntroduceInfo: function(companyId, title, content) {
        // UPDATE문 실행시키기 전 

        const sql = `UPDATE company_introduce SET title = '${title}', content = '${content}' WHERE company_id = '${companyId}'`;

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