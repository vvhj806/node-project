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
    getCompanyInfo: function(comId) {
        const sql = `SELECT * FROM company`;

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
    getAllMenus: function() {
        const sql = `SELECT * FROM menu WHERE del_yn = 'n'`;

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
    addMenu: function(menuNm, useYn) {
        const sql = `INSERT INTO menu (menu_nm, use_yn) VALUES ('${menuNm}', '${useYn}')`;

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
    modMenu: function(idx, menu_nm, use_yn) {
        const sql = `UPDATE menu SET menu_nm = '${menu_nm}', use_yn = '${use_yn}' WHERE idx = '${idx}'`;

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
    delMenu: function(idx){
        const sql = `UPDATE menu SET del_yn = 'y' WHERE idx = '${idx}'`;

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
    getSubMenu: function(menuIdx) {
        const sql = `SELECT * FROM sub_menu WHERE menu_idx = ${menuIdx} AND del_yn = 'n'`;

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
    addSubMenu: function(menuIdx, subMenuNm) {
        const sql = `INSERT INTO sub_menu (menu_idx, menu_nm) VALUES ('${menuIdx}', '${subMenuNm}')`;

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
    getMemberList: function(page, search = '') {
        const countPerPage = 5;
        const offset = (page - 1) * countPerPage;
        let sql = `SELECT * FROM member WHERE del_yn = 'n'`;

        if (search) {
            sql += ` AND id LIKE '%${search}%'`;
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
    getMemberListCnt: function(search = '') {
        let sql = `SELECT count(*) as cnt FROM member WHERE del_yn = 'n'`;

        if(search) {
            sql += ` AND id LIKE '%${search}%'`;
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
    addMember: function(member_id, mamber_pass, member_name, company_name, member_email, member_tel, company_number, company_address, memo) {
        const sql = `INSERT INTO member (id, password, name, tel, email, memo, add_date) 
                     VALUES ('${member_id}', '${mamber_pass}', '${member_name}', '${member_tel}', '${member_email}', '${memo}', now())
                     `;

        return new Promise((resolve, reject) => {
            const con = mysql.createConnection(db);
            con.query(sql, (err, result, field) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
            con.end();
        });
    },
    addCompany: function(mem_idx, company_name, company_number, company_address, memo) {
        const sql = `INSERT INTO company (mem_idx, company_name, business_number, address, memo, add_date) 
                      VALUES ('${mem_idx}', '${company_name}', '${company_number}', '${company_address}', '${memo}', now())
                      `;

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
    }
}