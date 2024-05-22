import express from "express";
let app = express();
import cookieParser from 'cookie-parser';
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

var router = require('./router.ts')
// import router from './routes';

app.use('/',router);
const port = 8080;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
