const express = require("express");
const app = express();

const port = 9007
app.get("/", (req, res) => {
    res.sendFile('/index.html', { root: __dirname });
});
app.get("/dontclick", (req, res) => {
    res.sendFile('/rickroll.html', { root: __dirname });
});
app.use(express.static(__dirname + '/'));
app.listen(port, () => console.log(`Self page in port ${port}`));
module.exports = app;