
const express = require('express');

const app = new express();
const port = 3000;
app.use(express.static('./'));

function toIndex(req, res) {
    res.sendFile(__dirname + '/chooseSickness.html')
}

app.get('/', toIndex);

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});
