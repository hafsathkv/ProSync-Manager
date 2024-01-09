const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const morgan = require('morgan'); // if update for production side
const getRawBody = require('raw-body');
const contentType = require('content-type')
require("dotenv").config();

//configuration file
require("./config/database");

/* ===== { routes } ====== */
const apiBranchRouter = require("./router/api_branch");
const apiAdminRouter = require("./router/api_admin");
const apiAuthRouter = require("./router/api_auth");

//system configuration middleware

///security configuration middleware
// app.use(function (req, res, next) {
//   getRawBody(req, {
//     length: req.headers['content-length'],
//     limit: '1kb',
//     encoding: contentType.parse(req).parameters.charset
//   }, function (err, string){
//     if (err) return next(err)
//     req.text = string
//     next()
//   })
// });
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(logger("dev"));
// app.use(morgan('combined', {stream: path.join(__dirname, '/logs/log.txt')})); //if use production side only
app.use(express.json({ limit: "10kb"}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist")));
app.use(
  session({
    name: "Set-Cookie",
    secret: process.env.COOKIE_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "lax",
      path: "/",
    },
  })
);

//router set-up middleware
app.use("/api/branch", apiBranchRouter);
app.use("/api/admin", apiAdminRouter);
app.use("/api/auth", apiAuthRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.status(err.status).json(err.message);
});



module.exports = app;
