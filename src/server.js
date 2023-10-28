import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/conectDB';
import cors from 'cors';
const session = require('express-session');


let app = express();
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions))

app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
  })
);

require('dotenv').config();   // giup chay dc dong process.env

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



connectDB.connect();


viewEngine(app);


app.use((req, res, next) => {
  console.log(req.session);
  next();
});

initWebRoutes(app);


let port = process.env.PORT || 8081;  

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port);
})