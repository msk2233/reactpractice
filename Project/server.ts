
import express,{Request,Response} from "express";
import dotenv from "dotenv";
dotenv.config();
import cookie from "cookie-parser";

const app = express();
import {Server} from 'socket.io';
import { Socket } from "dgram";
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");


import logger from './logger';
import * as path from 'path';
import  bodyParser from 'body-parser';;
let port = process.env.PORT;

// const userAuth = require("./routes/userAuthentication");
// const route = require("./routes/bookSearchRoutes");
// const bookpageroute = require("./routes/route2");
// const userProfileRoute = require("./routes/userProfileRoutes");

app.use(cookie());
// app.use("/", route);
app.use(express.static(__dirname + "/uploads"));
app.use(express.static(__dirname + "/comuploads"));
app.use(express.static(__dirname + "/public"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/sweetalert2",
  express.static(path.join(__dirname, "node_modules/sweetalert2/dist"))
);
app.use(
  "/charts",
  express.static(path.join(__dirname, "node_modules/apexcharts/dist/"))
);

import bookdetails from "./routes/bookDetail_route"
app.use("/",bookdetails);
// app.use("/", userProfileRoute);
// app.use("/", require("./routes/authorRoutes"));
// app.use("/", require("./routes/issueBookRoutes"));
// app.use("/", require("./routes/userAuthentication"));
// app.use("/admin", require("./routes/adminRoutes"));
// app.use("/", require("./routes/ticket"));
// app.use(bookpageroute);


app.get('*',(req,res)=>{
  res.render('wrongUrl');
});

  const server = app.listen(process.env.PORT, () => {
      logger.info(`Server is running in port: ${port} `);
      // app.use(userAuth);
  });

const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("comment", (cmt) => {
    io.emit("repcmtsuccess", cmt);
  });

  socket.on("nestedcomment", (nescmt) => {
    io.emit("repnescmtsuccess", nescmt);
  });

  socket.on("sensation", (event) => {
    console.log(event);
    io.emit("respSensation", event);
  })
  socket.on("nestedcomment",(nescmt)=>{
    io.emit("repnescmtsuccess",nescmt);
})
socket.on("community",()=>{
  io.emit("rescommunity");
});
socket.on("chat message", (msg) => {
  socket.broadcast.emit(`chat-message-${msg.ticket}`, msg.msg);
});
});

