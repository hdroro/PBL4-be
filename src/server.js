import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/conectDB";
import cors from "cors";
const session = require("express-session");
require("dotenv").config();

let app = express();

const corsOptions = {
  origin: "http://192.168.241.219:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/public", express.static("src/public"));

app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB.connect();

viewEngine(app);

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, "192.168.241.219", () => {
  console.log(`Server is running on http://192.168.241.219:${port}`);
});
