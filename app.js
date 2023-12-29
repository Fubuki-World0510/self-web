const express = require('express');
const path = require('path');
const app = express();

app.use('/favicon.ico', express.static(path.join(__dirname, 'assets/img/favicon.ico')));
    app.use('/assets', express.static(path.join(__dirname, 'assets')));
    app.use(express.favicon("./assets/img/favicon.ico"));
    app.get('/', (req, res) => {
        res.sendfile(path.join(__dirname, 'index.html'));
    });

    app.listen(3050, () => {
        console.log(`Nam insider vô cổng http://localhost:3050`);
    });