const express = require('express');
const Dash = require('../../models/dashboard/DashboardModel.js');
const Views = '../../views';

module.exports = {
    introduce: function (req, res, next) {
        const companyId = 1;
        let title = '';
        let content = '';

        Dash.getIntroduceInfo(companyId).then((result) => {
            if(result != [] && result != '' && result != null) {
                title = result[0].title;
                content = result[0].content;
            } 

            theme.addJavascriptFile("js/common/saveIntroduceInfo.js");
            res.render(theme.getPageViewPath("dashboards", "dashboard"), {
                currentLayout: theme.getLayoutPath("pages/introduce"),
                data: {page: 'introduce', title: title, content: content}
            });
        });
    },
    saveIntroduceInfo: function(req, res, next) {
        const companyId = 1;

        Dash.saveIntroduceInfo(companyId, req.body.title, req.body.content).then((result) => {
            if(result) {
                res.send({
                    state: 200,
                    message: '저장완료',
                    data: result
                });
            }
        });
    }
};