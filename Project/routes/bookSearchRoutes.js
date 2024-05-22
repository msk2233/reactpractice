const express=require("express");

const { index ,order,genre,search,page,searchFilterPagination,genreFilter,bookSearch} = require("../controllers/bookSearch");

const { BookDetails,bookdetail,addtofav,contributebook, contribute_post,fetchcontro} = require("../controllers/bookDetail/bookDetail");

const router=express.Router();

require("../middlewares/passport");

const passport = require("passport");

router.all("/booksearch",passport.authenticate('jwt',{session:false,failureRedirect :'/login'}),index);

router.get("/booksearch/page/:direction/:index",passport.authenticate('jwt',{session:false,failureRedirect :'/login'}),page);

router.get("/booksearch/head/:direction/:index/:option/:input",passport.authenticate('jwt',{session:false,failureRedirect :'/login'}),search);

router.get('/booksearch/order/:direction/:index/:column/:order',passport.authenticate('jwt',{session:false,failureRedirect :'/login'}),order);

router.get('/booksearch/order/:direction/:index/:genre',passport.authenticate('jwt',{session:false,failureRedirect :'/login'}),genre);

router.get('/booksearch/order/:direction/:index/:option/:input/:column/:order',passport.authenticate('jwt',{session:false,failureRedirect :'/login'}),searchFilterPagination);

router.get('/booksearch/order/:direction/:index/:column/:order/:genre',passport.authenticate('jwt',{session:false,failureRedirect :'/login'}),genreFilter);

router.get('/bookindetail',bookdetail);

router.get('/contributebook',passport.authenticate('jwt',{session:false,failureRedirect :'/login'}),contributebook)

router.get('/fetchcontro',fetchcontro);

router.get('/bookDetails',BookDetails) ; 

router.get('/addtofav',addtofav)

router.post('/contribute_post',contribute_post)

module.exports=router;