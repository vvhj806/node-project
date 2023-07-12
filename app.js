// Imports
const themesettings = require("./_keenthemes/lib/themesettings.json");
const dashboardRouter = require("./router/dashboard");
const authRouter = require("./router/auth");
const systemRouter = require("./router/system");
const createKtThemeInstance = require("./_keenthemes/lib/theme");
const createKtBootstrapInstance = require(`./views/layout/${themesettings.name}/bootstrap`);
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

global.themesettings = themesettings;

const app = express();
const port = 3000;

// Mysql
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Axios 전송 값 body로 받기
app.use(express.json());

// Session
const session = require('express-session');	//세션관리용 미들웨어
const fileStore = require('session-file-store')(session);
app.use(session({
    secret: 'damapay0128!@',	// 암호화에 쓰일 키
    resave: false,	// 세션을 언제나 저장할지 설정함
    saveUninitialized: false,  
    cookie: {	
    //   httpOnly: true, 
      maxAge: 60*1000,
    },
    // secure: ture,	// https 환경에서만 session 정보를 주고받도록처리
    // store: new session.MemoryStore({ checkedPeriod: 60*1000 }),
    // store: new fileStore(), // 세션폴더안에 json 파일로 저장
}));

// Static Files
app.use(express.static('public'));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

// Set Templating Engine
app.use(expressLayouts);
app.set('layout', 'layout/master');
app.set('view engine', 'ejs');

const init = function (req, res, next) {
    global.theme = createKtThemeInstance();
    global.bootstrap = createKtBootstrapInstance();
    next();
}

app.use(init);
app.use('/auth', authRouter);
app.use('/', dashboardRouter);
app.use('/dashboards', dashboardRouter);
app.use('/system', systemRouter);

app.all('*', (req, res) => {
    res.status(404).render(theme.getPageViewPath("system", "not-found"), { currentLayout: theme.getLayoutPath("system") });
});

app.listen(port, () => console.info(`App listening on port ${port}`))