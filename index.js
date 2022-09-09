const express = require('express'); // npm install express
const app = express();
const port = 3010;
const path = require('path');
app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
