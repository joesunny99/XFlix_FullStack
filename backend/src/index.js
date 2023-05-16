const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");

const videoRoutes = require("./routes/video.routes");
const { nextTick } = require("process");
dotenv.config();
app.use(express.json());

app.use(cors());
// let PORTNO = 8082;
// let DB_URI = "mongodb://127.0.0.1:27017/xflix";

// console.log(`Your port is ${process.env.PORTNO}`);
// let DB_URI=process.env.DB_URI;
// let PORTNO =  process.env.PORTNO;

const {PORTNO, DB_URI} = process.env;

// console.log(process.env);

mongoose.connect(DB_URI)
    .then(()=> console.log("Connected to ", DB_URI))
    .catch(()=> console.log("Failed DB connection"))

// app.get("/",(req,res)=>{
//     console.log(req.params);
//     res.json(req.query);
// })


app.use("/v1/videos",videoRoutes);

app.all("*", (req,res, next)=>{
    let err = new Error(`Route ${req.path} does not exist`);
    err.statusCode = 400;
    next(err);
})

app.use((err,req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        message:message,
    });
})

app.listen(PORTNO,()=>{
    console.log("listening on on port ", PORTNO)
})