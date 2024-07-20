import express from "express"
const app = express();

const port = 1234
console.log(__dirname + '/');
app.get("/", (req, res) => {
    res.sendFile('/page.html', { root: __dirname });
});
app.get("/dontclick", (req, res) => {
    res.sendFile('/rickroll.html', { root: __dirname });
});
app.use(express.static(__dirname + '/'));
module.exports = app;