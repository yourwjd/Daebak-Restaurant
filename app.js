const express = require('express');
const path = require('path');
const morgan = require('morgan'); 
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const likesRouter = require('./routes/likes');
const reservationsRouter = require('./routes/reservations');

const app = express();

app.use('/likes', likesRouter);

//포트 설정
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

//시퀄라이즈 연동
sequelize.sync({ force: false })
.then(()=>{
    console.log('데이터베이스 연결 성공')
})
.catch((err)=>{
    console.error(err);
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//라우팅
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/likes', likesRouter);
app.use('/reservations', reservationsRouter);

app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (req.accepts('json')) {
      res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
      });
    } else {
      res.render('error');
    }
  });
  
//npm start
app.listen(app.get('port'), ()=>{
    console.log(`${app.get('port')}번 포트에서 대기 중`);
    
});