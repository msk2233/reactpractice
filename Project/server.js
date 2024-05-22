"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import http from 'http';
const http = require('http');
const app = (0, express_1.default)();
const server = http.createServer(app);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const logger = require("./logger");
app.set("view engine", "ejs");
const path = require("path");
const bodyParser = require("body-parser");
let port = process.env.PORT;
const userAuth = require("./routes/userAuthentication");
const route = require("./routes/bookSearchRoutes");
const bookpageroute = require("./routes/route2");
const userProfileRoute = require("./routes/userProfileRoutes");
const exp = require("constants");
app.use((0, cookie_parser_1.default)());
app.use("/", route);
app.use(userAuth);
app.use(express_1.default.static(__dirname + "/uploads"));
app.use(express_1.default.static(__dirname + "/comuploads"));
app.use(express_1.default.static(__dirname + "/public"));
app.use("/node_modules", express_1.default.static(__dirname + "/node_modules"));
app.use("/css", express_1.default.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/js", express_1.default.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use("/sweetalert2", express_1.default.static(path.join(__dirname, "node_modules/sweetalert2/dist")));
app.use("/charts", express_1.default.static(path.join(__dirname, "node_modules/apexcharts/dist/")));
app.use("/", require("./routes/bookDetail_route"));
app.use("/", userProfileRoute);
app.use("/", require("./routes/authorRoutes"));
app.use("/", require("./routes/issueBookRoutes"));
app.use("/", require("./routes/userAuthentication"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/", require("./routes/ticket"));
app.use(bookpageroute);
app.get('*', (req, res) => {
    res.render('wrongUrl');
});
const io = require("socket.io")(server);
// io.on("connection", (socket) => {
//   socket.on("comment", (cmt) => {
//     io.emit("repcmtsuccess", cmt);
//   });
//   socket.on("nestedcomment", (nescmt) => {
//     io.emit("repnescmtsuccess", nescmt);
//   });
//   socket.on("sensation", (event) => {
//     console.log(event);
//     io.emit("respSensation", event);
//   })
//   socket.on("nestedcomment",(nescmt)=>{
//     io.emit("repnescmtsuccess",nescmt);
// })
// socket.on("community",()=>{
//   io.emit("rescommunity");
// });
// });
server.listen(process.env.PORT, (err) => {
    if (err) {
        logger.error(`Error: other server is running in  ${port} ,change the port number`);
    }
    else {
        logger.info(`Server is running in port: ${port} `);
        app.use(userAuth);
    }
});
// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     socket.broadcast.emit(`chat-message-${msg.ticket}`, msg.msg);
//   });
// });
// io.on("end", (socket) => {
//   console.log("hii");
// });
