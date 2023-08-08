const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
    return res.send("<h1>Hello world</h1>")
})

app.listen(PORT, (error) => {
    if(error) {
        console.log(`error to start server ${error}`);
        return;
    }else{
        console.log(`server is running at port ${PORT}`);
    }
}) 