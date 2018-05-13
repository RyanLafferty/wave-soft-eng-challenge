const express = require('express');
var compression = require('compression')


const app = express();
const port = 3000;
app.use(compression());

app.use('/', express.static(__dirname + '/public'));

app.get('/*', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => console.log('App listening on port ' + port + '!'));
