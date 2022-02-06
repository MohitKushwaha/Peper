const express = require('express');
const app = express();
const port = 3000;
const path = require('path')

app.use(express.static('dist/peper/'))

app.get('*', (req,res) => {
    //res.send("Hello World");
    res.sendFile(path.resolve('dist/peper/index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});