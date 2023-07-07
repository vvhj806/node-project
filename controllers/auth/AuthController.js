const express = require('express');
const Auth = require('../../models/auth/AuthModel.js');
const Views = '../../views';

module.exports = {
    login: function (req, res, next) {
        const id = req.body.id;
        const password = req.body.password;

        Auth.login(id, password).then((result) => {
            if(result == [] || result == '' || result == null) {
                res.send({
                    state: 201,
                    message: '아이디 또는 비밀번호가 일치하지 않습니다.',
                    data: result
                });
            } else {
                res.send({
                    state: 200,
                    message: '로그인되었습니다.',
                    data: result
                });

                //세션 설정해주기
                const timestamp = Date.now();
                req.session.user = id + '_' + timestamp;

                console.log(req.session.user);

                // console.log(result);
            }
        });
    },
    logout: function (req, res, next) {
        
    }
}