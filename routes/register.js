var express = require('express');
var router = express.Router();
var userModel = require('../model/user');
//
router.get('/', function(req, res, next) {
    res.render('register', { isshow:false });
});
//
router.post('/', function(req, res, next){
    userModel.find({username:req.body.username},function(error,info){
        if (!error && info.length ==0){
            userModel.create({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password
            },function(error,info){
                if(!error){
                    res.redirect("/login");
                }
            })
        }else{
            res.render("register",{isshow:true});
        }
    });

});
//
router.get('/login', function(req, res, next) {
    res.render('login', { isshow: false });
});
module.exports = router;