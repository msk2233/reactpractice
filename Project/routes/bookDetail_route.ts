// let route = require("express").Router();
import express from "express";
const route = express();
require("../middlewares/passport");
const passport = require("passport");
import multer from 'multer';
import storagecom from '../middlewares/multer2';
const uploadcom = multer({ storage: storagecom });
const { comvalidation } = require('../middlewares/comvalidation');

import {formpdf,community,contributebook,bookdetail,BookDetails,fetchcommunity,postincommunity,fetchcomment,fetchnestedcmt,postcomment,postnestedcomment,addtofav,fetchcontro,contribute_post}  from  "../controllers/bookDetail/bookDetail";
route.get('/book_in_detail', bookdetail);
route.get('/bookDetails', BookDetails);
route.get('/addtofav', addtofav);
route.get('/fetchcomment/', fetchcomment);
route.get('/fetchnestedcmt', fetchnestedcmt)
route.get('/postcomment',  postcomment)
route.get('/postnestedcomment', postnestedcomment)
route.get('/contribute_book', contributebook)
route.get('/fetch_contro', fetchcontro);
route.post('/contribute_post', contribute_post)
route.get('/form', formpdf);
route.get('/community',community);
route.get('/fetchcom', fetchcommunity);
route.post('/postcomupload', uploadcom.single("image"), comvalidation, postincommunity);

export default route;