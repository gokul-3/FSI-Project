const express = require("express");
const seqelize = require("seqelize")
const app = express();

app.listen(9000,()=>{
    console.log("Server started on Port: 9000");
});

app.get('/',(req,res)=>{
    res.send("<h2>Server is Up and Running</h2>");
});

