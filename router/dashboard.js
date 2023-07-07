const express = require("express");
const router = express.Router();
const url = require('url');

router.use((req, res, next) => {
  bootstrap.init();
  bootstrap.initDefault();
  next();
});

router.get("/", (req, res) => {
  theme.addVendors(["amcharts", "amcharts-maps", "amcharts-stock"]);

  const queryData = url.parse(req.url, true).query;
  console.log(queryData.page);

  res.render(theme.getPageViewPath("dashboards", "dashboard"), {
    currentLayout: theme.getLayoutPath("default"),
  });
});

// router.get('/:page', function(req, res) {
//   res.send(req.params);
// });

module.exports = router;