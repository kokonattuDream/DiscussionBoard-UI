let express = require('express');
var serveStatic = require('serve-static');

let app = express();
app.use(serveStatic(__dirname + "/dist"));

let port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);