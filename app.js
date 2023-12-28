const express = require('express');
const path = require('path');
const favicon = require('express-favicon');
const app = express();
const port = 3000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(favicon(__dirname + '/assets/img/favicon.ico'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Nam insider vô cổng http://localhost:${port}`);
});
