let express = require('express');
let serveStatic = require('serve-static');
let  history = require('connect-history-api-fallback');

let app = express();
app.use(history());
app.use(serveStatic(__dirname + "/dist"));

let port = process.env.PORT || 8080;
app.listen(port);
console.log('server started '+ port);