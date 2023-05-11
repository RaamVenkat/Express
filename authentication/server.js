const express = require("express");
const app = express();

app.get("/",(req,res,next)=>{
    res.send("<h1>Hello World</h1>");
});

const port = process.env.PORT || 5002;
app.listen(port,()=>{
    console.log(`Server running in port ${port}`);
});