const mysql = require('mysql');
const db = require('../../config/database.js');

module.exports = {
    getIntroduceInfo: function(companyId) {
        const sql =  `SELECT * FROM company_introduce WHERE company_id = '${companyId}' AND del_yn = 'n'`;

        return new Promise((resolve, reject) => {
            const con = mysql.createConnection(db);
            con.query(sql, (err, result, field) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
            con.end();
        });
    },
    saveIntroduceInfo: function(companyId, title, content, saveState) {
        let sql = '';

        if(saveState == 'i') {
            sql = `INSERT INTO company_introduce (company_id, title, content) VALUES (${companyId}, '${title}', '${content}')`;
        } else if(saveState == 'u') {
            sql = `UPDATE company_introduce SET title = '${title}', content = '${content}' WHERE company_id = '${companyId}'`;
        }
        
        return new Promise((resolve, reject) => {
            const con = mysql.createConnection(db);
            con.query(sql, (err, result, field) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
            con.end();
        });
    },
    getCompanyList: function(page, search = '') {
        const countPerPage = 5;
        const offset = (page - 1) * countPerPage;
        let sql = `SELECT * FROM company WHERE del_yn = 'n'`;

        if (search) {
            sql += ` AND company_name LIKE '%${search}%'`;
        }

        sql += ` ORDER BY idx DESC LIMIT ${offset}, ${countPerPage}`;

        return new Promise((resolve, reject) => {
            const con = mysql.createConnection(db);
            con.query(sql, (err, result, field) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
            con.end();
        });
    },
    getCompanyListCnt: function(search = '') {
        let sql = `SELECT count(*) as cnt FROM company WHERE del_yn = 'n'`;

        if(search) {
            sql += ` AND company_name LIKE '%${search}%'`;
        }

        return new Promise((resolve, reject) => {
            const con = mysql.createConnection(db);
            con.query(sql, (err, result, field) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
            con.end();
        });
    },
    getCompanyInfo: function() {
        
    }
}