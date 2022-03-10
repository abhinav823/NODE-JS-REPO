const express = require("express");
const mongoose = require('mongoose');
// /const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const postRoutes = require("./routes/posts");
const SECRET = "RESTAPI";
var jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/restapi');
const app = express();

app.use("/api/v1/posts", (req, res, next) =>{
    var token = req.headers.authorization.split("test ")[1];
    if(!token){
        return res.status(401).json({
            status: "failed",
            message: "Token is missing"
        })
    }
    // verify the toke
    jwt.verify(token, SECRET, async function(err, decoded) {
        if(err){
            return res.status(401).json({
                status:"failed",
                message: "Invalid token"
            })
        }
        req.user = decoded.data;
        next();
    });
});

// app.use("/api/v1/users", userRoutes);
app.use("/api/v1", loginRoutes);
app.use("/api/v1", postRoutes);


app.listen(5000, () => console.log("server is started"));