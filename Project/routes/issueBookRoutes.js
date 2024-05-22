const express=require("express");
const { issueBook, returnBook, getAllBookWithCount } = require("../controllers/issueBook");
const router=express.Router();
router.post("/issueBook",issueBook);
router.post("/returnBook",returnBook);
router.get("/getAllBooks",getAllBookWithCount)

module.exports=router;
