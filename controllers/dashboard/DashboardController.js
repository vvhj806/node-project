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
    }
};