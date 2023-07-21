const express = require('express');
const Dash = require('../../models/dashboard/DashboardModel.js');
const Views = '../../views';
const fs = require('fs');
const path = require('path');

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
            // 정보 입력 후 INSERT

            res.render(theme.getPageViewPath("dashboards", "dashboard"), {
                currentLayout: theme.getLayoutPath("pages/company_info"),
                data: {companyId: companyId}
            });
        } else {
            // 기존회사 정보 띄워주기
            // 정보 입력 후 UPDATE

            res.render(theme.getPageViewPath("dashboards", "dashboard"), {
                currentLayout: theme.getLayoutPath("pages/company_info"),
                data: {companyId: companyId}
            });
        }
    },
    manageMenu: function(req, res, next) {
        Dash.getAllMenus().then((result) => {
            res.render(theme.getPageViewPath("dashboards", "dashboard"), {
                currentLayout: theme.getLayoutPath("pages/manage_menu"),
                data: {menuList: result}
            });
        })
    },
    addMenu: function(req, res, next) {
        Dash.addMenu(req.body.menuName, req.body.menuIsUsed).then((result) => {
            if(result) {
                res.send({state: 200, message: '저장완료', data: result});
            } else {
                res.send({state: 400, message: '저장실패', data: result});
            }
        });
    },
    modMenu: function(req, res, next) {
        Dash.modMenu(req.body.idx, req.body.menuName, req.body.menuIsUsed).then((result) => {
            if(result) {
                res.send({state: 200, message: '수정완료', data: result});
            } else {
                res.send({state: 400, message: '수정실패', data: result});
            }
        });
    },
    delMenu: function(req, res, next) {
        Dash.delMenu(req.body.idx).then((result) => {
            if(result) {
                res.send({state: 200, message: '삭제완료', data: result});
            } else {
                res.send({state: 400, message: '삭제실패', data: result});
            }
        });
    },
    merchandise: function(req, res, next) {
        const companyId = parseInt(req.params.comId, 10); 

        res.render(theme.getPageViewPath("dashboards", "dashboard"), {
            currentLayout: theme.getLayoutPath("pages/merchandise"),
        });
    },
    imgSaveTest: function(req, res, next) {
        res.render(theme.getPageViewPath("dashboards", "dashboard"), {
            currentLayout: theme.getLayoutPath("pages/img_save_test"),
        });
    },
    saveImg: function(req, res, next) {
        if (req.file) {
            console.log('파일 업로드 성공:');
            console.log('원본 파일 이름:', req.file.originalname);
            console.log('임시 파일 경로:', req.file.path);
            console.log('파일 크기:', req.file.size);

            // 이미지를 저장할 디렉토리 경로 설정
            const uploadDir = path.join(__dirname, '../../', 'public', 'assets', 'data', 'img');
            // 임시 파일을 저장할 경로
            const tempFilePath = req.file.path;
            // 원본 파일 이름
            const originalFileName = req.file.originalname;
            // 새로운 파일 이름 (예: 업로드 시간 기반으로 생성 가능)
            const newFileName = Date.now() + '_' + originalFileName;
            // 저장될 최종 파일 경로
            const newFilePath = path.join(uploadDir, newFileName);
            // 파일 이동 (임시 폴더에서 저장할 폴더로 이동)
            fs.renameSync(tempFilePath, newFilePath);

            console.log('이미지 저장 완료:', newFileName);

        } else {
            console.log('파일 업로드 실패: 파일이 없습니다.');
        }

        console.log(req.body.text);

        res.send('파일이 성공적으로 업로드되었습니다.');
    },
    getSubMenu: function(req, res, next) {
        Dash.getSubMenu(req.body.menuIdx).then((result) => {
            if(result) {
                res.send({state: 200, message: '성공', data: result});
            } else {
                res.send({state: 400, message: '실패', data: result});
            }
        });
    },
    addSubMenu: function(req, res, next) {
        Dash.addSubMenu(req.body.currMenuIdx, req.body.subMenuName).then((result) => {
            if(result) {
                res.send({state: 200, message: '성공', data: result});
            } else {
                res.send({state: 400, message: '실패', data: result});
            }
        });
    },
    memberList: function(req, res, next){
        const page = req.query.page || 1;
        const search = req.query.search || '';
        let totalPage = 0;
        let totalCnt = 0;

        Dash.getMemberListCnt(search).then((result) => {
            totalPage = Math.floor(((result[0].cnt - 1) / 5) + 1);
            totalCnt = result[0].cnt;
            
            Dash.getMemberList(page, search).then((result) => {
                res.render(theme.getPageViewPath("dashboards", "dashboard"), {
                    currentLayout: theme.getLayoutPath("pages/member_list"),
                    data: {list: result, currentPage: page, totalPages: totalPage, totalCnt: totalCnt, search: search}
                });
            });
        });
    },
    memberInfo: function(req, res, next) {
        const memIdx = parseInt(req.params.memIdx, 10); 

        if(memIdx == '0') {
            res.render(theme.getPageViewPath("dashboards", "dashboard"), {
                currentLayout: theme.getLayoutPath("pages/member_info"),
                data: {memIdx: memIdx}
            });
        } else {
            res.render(theme.getPageViewPath("dashboards", "dashboard"), {
                currentLayout: theme.getLayoutPath("pages/member_info"),
                data: {memIdx: memIdx}
            });
        }
    },
    addMember: function(req, res, next) {
        const member_id = req.body.member_id;
        const mamber_pass = req.body.mamber_pass;
        const member_name = req.body.member_name;
        const company_name = req.body.company_name;
        const member_email = req.body.member_email;
        const member_tel = req.body.member_tel;
        const company_number = req.body.company_number;
        const company_address = req.body.company_address;
        const memo = req.body.memo;

        Dash.addMember(member_id, mamber_pass, member_name, company_name, member_email, member_tel, company_number, company_address, memo).then((result) => {
            if(result) {
                Dash.addCompany(result, company_name, company_number, company_address, memo).then((result) => {
                    if(result) {
                        res.send({state: 200, message: '성공', data: result});
                    } else {
                        res.send({state: 400, message: '실패', data: result});
                    }
                });
            } else {
                res.send({state: 400, message: '실패', data: result});
            }
        });
    }
};