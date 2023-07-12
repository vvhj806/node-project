const express = require("express");
const router = express.Router();
const url = require('url');

router.use((req, res, next) => {
  bootstrap.init();
  bootstrap.initDefault();
  next();

  if(req.session.user && req.session.is_logined) {
    console.log('로그인 되었음');
    console.log(req.session);
  } else {
    // 로그인 페이지로 보내기
    console.log('로그인 페이지로 보내기');
  }
});

router.get("/", (req, res) => {
  theme.addVendors(["amcharts", "amcharts-maps", "amcharts-stock"]);

  // const queryData = url.parse(req.url, true).query;
  // console.log(queryData.page);
  
  theme.addJavascriptFile("js/common/logout.js");
  res.render(theme.getPageViewPath("dashboards", "dashboard"), {
    currentLayout: theme.getLayoutPath("main"),
  });
});

// router.get('/:page', function(req, res) {
//   res.send(req.params);
// });

module.exports = router;