var http, director, cool, bot, router, server, port;

http        = require('http');
director    = require('director');
cool        = require('cool-ascii-faces');
bot         = require('./bot.js');

router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: ping
  }
});

server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm Cool Guy.");
}

r = require('rethinkdb')
var username = 'cf484706-5cc6-4430-b04b-4b707ee33f09';
var password = 'cf01617300586418edb204ab2a9c2757c74ac671';
var name = 'cf484706-5cc6-4430-b04b-4b707ee33f09';
r.connect({ host: 'cf484706-5cc6-4430-b04b-4b707ee33f09.db.rdb.rethinkdb.cloud',
      port: 28015, username: username, password: password, name: name}, function(err, conn) {
  if(err) throw err;
  r.grant(username, {config:true});
  r.db('test').tableCreate('tv_shows').run(conn, function(err, res) {
    if(err) throw err;
    console.log(res);
    r.table('tv_shows').insert({ name: 'Star Trek TNG' }).run(conn, function(err, res)
    {
      if(err) throw err;
      console.log(res);
    });
  });
});