var express = require('express');
var router = express.Router();
var userModel = require("../model/user");
//
router.get('/', function(req, res, next) {
    res.render('login', { isshow: false });
});
//
router.post("/",function(req,res){
    userModel.find({
        username:req.body.username,
        password:req.body.password
    },function(error,info){
        if(!error){
            if(info.length>0){
                req.session.istrue = info[0];
                res.redirect("/admin");
            }else{
                res.render("login",{isshow:true});
            }
        }
    })
})
//
router.get('/register', function(req, res, next) {
    res.render('register', { isshow:false });
});
//
module.exports = router;