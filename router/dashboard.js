const express = require("express");
const router = express.Router();
const dashboardController = require('../controllers/dashboard/DashboardController');
const url = require('url');
const multer = require('multer');
const path = require('path');
const uploadDir = path.join(__dirname, '../', 'public', 'assets', 'data', 'tmp');
const upload = multer({ dest: uploadDir });
// const upload = multer({ dest: '/assets/data/img/' });

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

// router.get('/introduce', dashboardController.introduce);
router.get('/introduce/:comId', dashboardController.introduce);
router.get('/company_list', dashboardController.companyList);
router.get('/company_info/:comId', dashboardController.companyInfo);
router.get('/manage_menu', dashboardController.manageMenu);
router.get('/merchandise/:comId', dashboardController.merchandise);
router.get('/img_save_test', dashboardController.imgSaveTest);
router.get('/member_list', dashboardController.memberList);
router.get('/member_info/:memIdx', dashboardController.memberInfo);

router.post('/save_introduce_info', dashboardController.saveIntroduceInfo);
router.post('/add_menu', dashboardController.addMenu);
router.post('/mod_menu', dashboardController.modMenu);
router.post('/del_menu', dashboardController.delMenu);
router.post('/save_img', upload.single('file'), dashboardController.saveImg);
router.post('/get_sub_menu', dashboardController.getSubMenu);
router.post('/add_sub_menu', dashboardController.addSubMenu);
router.post('/add_member', dashboardController.addMember);

module.exports = router;