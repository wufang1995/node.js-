var express = require('express');
var router = express.Router();
var userModel = require("../model/user");
//
router.get('/', function(req, res, next) {
    if(req.session.istrue){
        res.render('changepass',{name: req.session.istrue.username,isshow:false});
    }else{
        res.redirect("/login");
    }
});
//
router.post('/', function(req, res, next) {
    if(req.session.istrue){
        userModel.find({username:req.session.istrue.username},function (error,info) {
            if(req.body.quondampass==info[0].password){
                if (req.body.newpass==req.body.affirmpass){
                    userModel.update({username:req.session.istrue.username},{password:req.body.newpass},function (error,info) {
                      if (!error){
                          res.redirect("/login");
                      }
                    });
                }else{
                    res.render('changepass',{name: req.session.istrue.username,isshow:true,content:'两次输入的密码不一致'});
                }
            }else{
                res.render('changepass',{name: req.session.istrue.username,isshow:true,content:'您输入的原密码不正确'});
            }
        })
    }else{
        res.redirect("/login");
    }
});
module.exports = router;
