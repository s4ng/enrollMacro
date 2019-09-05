var express = require('express');
var app = express();
var router = require('./router/main')(app);
let macro = require('./start');

app.use(express.urlencoded());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});

app.use(express.static('public'));
app.get('/', function(req, res){
  res.render('index.html');
});
 app.post('/api', (req, res) => {
    res.render('api.html');
    const userId = req.body.userId;
    const userPw = req.body.userPw;
    let tmp, enroll = {};
    tmp = req.body.e1;
    enroll[tmp.split('-')[0]] = tmp.split('-')[1]
    tmp = req.body.e2;
    enroll[tmp.split('-')[0]] = tmp.split('-')[1]
    tmp = req.body.e3;
    enroll[tmp.split('-')[0]] = tmp.split('-')[1]
    tmp = req.body.e4;
    enroll[tmp.split('-')[0]] = tmp.split('-')[1]
    tmp = req.body.e5;
    enroll[tmp.split('-')[0]] = tmp.split('-')[1]
    tmp = req.body.e6;
    enroll[tmp.split('-')[0]] = tmp.split('-')[1]
    tmp = req.body.e7;
    enroll[tmp.split('-')[0]] = tmp.split('-')[1]
    tmp = req.body.e8;
    enroll[tmp.split('-')[0]] = tmp.split('-')[1]
    tmp = req.body.e9;
    enroll[tmp.split('-')[0]] = tmp.split('-')[1]
    tmp = req.body.e10;
    enroll[tmp.split('-')[0]] = tmp.split('-')[1]
    
    macro.startMacro(enroll, userId, userPw);
    //...
    res.end()
  })