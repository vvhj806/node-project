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
                req.session.user = id;
                req.session.is_logined = true;
                req.session.save();

                console.log(req.session);
                // console.log(result);

                res.send({
                    state: 200,
                    message: '로그인되었습니다.',
                    data: result
                });
            }
        });
    },
    logout: function (req, res, next) {
        req.session.destroy();

        console.log(req.session);

        res.send({
            state: 200,
            message: '로그아웃 되었습니다.',
        });
    }
}