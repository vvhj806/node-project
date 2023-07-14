const express = require("express");
const router = express.Router();
const dashboardController = require('../controllers/dashboard/DashboardController');
const url = require('url');

router.use((req, res, next) => {
  bootstrap.init();
  bootstrap.initDefault();
  next();

  // 위 next 주석치고 밑에 주석해제하기 (로그인 안되어 있을때 로그인 페이지로 이동되게)
  // if(req.session.user && req.session.is_logined) {
  //   console.log('login');
  //   console.log(req.session);
  //   next();
  // } else {
  //   res.redirect('/auth');
  // }
});

router.use(express.static("public"));

router.get("/", (req, res) => {
  theme.addVendors(["amcharts", "amcharts-maps", "amcharts-stock"]);
  theme.addJavascriptFile("js/common/logout.js");
  res.render(theme.getPageViewPath("dashboards", "dashboard"), {
    currentLayout: theme.getLayoutPath("main"),
  });
});

router.get('/introduce/:comId', dashboardController.introduce);
// router.get('/introduce', dashboardController.introduce);

router.post('/save_introduce_info', dashboardController.saveIntroduceInfo);

module.exports = router;