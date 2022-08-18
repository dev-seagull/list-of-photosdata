const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send('API is running successfuly!');
})

app.listen(7777, () => console.log('Server is listening to port 7777'));