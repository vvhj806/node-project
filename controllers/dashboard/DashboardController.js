const express = require('express');
const Dash = require('../../models/dashboard/DashboardModel.js');
const Views = '../../views';

module.exports = {
    introduce: function (req, res, next) {
        const companyId = parseInt(req.params.comId, 10); 
        let title = '';
        let content = '';
        let saveState = 'i';

        Dash.getIntroduceInfo(companyId).then((result) => {
            if(result != [] && result != '' && result != null) {
                title = result[0].title;
                content = result[0].content;
                saveState = 'u';
            } 

            theme.addJavascriptFile("js/common/saveIntroduceInfo.js");
            res.render(theme.getPageViewPath("dashboards", "dashboard"), {
                currentLayout: theme.getLayoutPath("pages/introduce"),
                data: {page: 'introduce', comId: companyId, title: title, content: content, saveState:saveState}
            });
        });
    },
    saveIntroduceInfo: function(req, res, next) {
        Dash.saveIntroduceInfo(req.body.comId, req.body.title, req.body.content, req.body.saveState).then((result) => {
            if(result) {
                res.send({state: 200, message: '저장완료', data: result});
            }
        });
    },
    companyList: function(req, res, next) {
        const page = req.query.page || 1;
        const search = req.query.search || '';
        let totalPage = 0;
        let totalCnt = 0;

        Dash.getCompanyListCnt(search).then((result) => {
            totalPage = Math.floor(((result[0].cnt - 1) / 5) + 1);
            totalCnt = result[0].cnt;
            
            Dash.getCompanyList(page, search).then((result) => {
                res.render(theme.getPageViewPath("dashboards", "dashboard"), {
                    currentLayout: theme.getLayoutPath("pages/company_list"),
                    data: {list: result, currentPage: page, totalPages: totalPage, totalCnt: totalCnt, search: search}
                });
            });
        });
    },
    companyInfo: function(req, res, next) {
        const companyId = parseInt(req.params.comId, 10); 

        if(companyId == '0') {
            // 새로운 회사 등록
        }
        
        res.render(theme.getPageViewPath("dashboards", "dashboard"), {
            currentLayout: theme.getLayoutPath("pages/company_info"),
        });
    }
};