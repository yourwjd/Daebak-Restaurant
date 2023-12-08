const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan'); 
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const socket = require('socket.io');
const http = require('http');


dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const indexRouter = require('./routes');
const joinsRouter = require('./routes/joins');
const usersRouter = require('./routes/users');
const likesRouter = require('./routes/likes');
const reservationsRouter = require('./routes/reservations');
const gamesRouter = require('./routes/games');

const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socket(server)

passportConfig(); // 패스포트 설정
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
// app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use((req, res, next) => {
  res.locals.nick = req.session.nick || '';
  next();
});

app.use(passport.initialize());
app.use(passport.session());

//라우팅
app.use('/', pageRouter);
app.use('/auth', authRouter);

app.use('/', indexRouter);
app.use('/joins', joinsRouter);
app.use('/users', usersRouter);
app.use('/likes', likesRouter);
app.use('/reservations', reservationsRouter);
app.use('/games', gamesRouter);

app.get('/games/:id', function(request, response) {
  fs.readFile('./static/games.html', function(err, data) {
    if(err) {
      response.send('에러')
    } else {
      response.writeHead(200, {'Content-Type':'text/html'})
      response.write(data)
      response.end()
    }
  })
})

io.sockets.on('connection', function(socket) {

  /* 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌 */
  socket.on('newUser', function(nick) {
    console.log(nick + ' 님이 접속하였습니다.')

    /* 소켓에 이름 저장해두기 */
    socket.nick = nick

    /* 모든 소켓에게 전송 */
    io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: nick + '님이 접속하였습니다.'})
  })

  /* 전송한 메시지 받기 */
  socket.on('message', function(data) {
    /* 받은 데이터에 누가 보냈는지 이름을 추가 */
    data.nick = socket.nick
    
    console.log(data)

    /* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
    socket.broadcast.emit('update', data);
  })

})

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
  
io.sockets.on('connection', function(socket) {
  console.log('유저 접속 됨')

  socket.on('send', function(data) {
    console.log('전달된 메시지:', data.msg)
  })

  socket.on('disconnect', function() {
    console.log('접속 종료')
  })
})

/* 서버를 8080 포트로 listen */
server.listen(8080, function() {
  console.log('서버 실행 중..')
})

//npm start
// app.listen(app.get('port'), ()=>{
//     console.log(`${app.get('port')}번 포트에서 대기 중`);
    
// });