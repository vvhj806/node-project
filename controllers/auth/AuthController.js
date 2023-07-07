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
                    success: true,
                    message: '아이디 또는 비밀번호가 일치하지 않습니다.',
                    data: result
                });
            } else {
                res.send({
                    success: true,
                    message: '로그인 성공',
                    data: result
                });

                //세션 설정해주기

                console.log(result);
            }
        });
    }
}