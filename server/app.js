var koa = require('koa');
var static = require('koa-static');
var render = require('koa-ejs');
var router = require('koa-router')({
    prefix: '/'
});

var app = koa();

app.use(router.routes());
app.use(static(__dirname + '/..'));

render(app, {
    root: __dirname + '/../client/views',
    viewExt: 'ejs',
    layout: false,
    cache: false
});

router.get('/', function*() {
    yield this.render('index');
});


app.listen(3000);
