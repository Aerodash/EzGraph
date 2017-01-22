var express = require('express');
var app = express();

app.use('/Vendor', express.static('Vendor'));
app.use('/_build', express.static('_build'));
app.use('/', express.static('.'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(3000);
console.log('listening on port 3000');