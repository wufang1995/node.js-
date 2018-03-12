var express = require('express');
var router = express.Router();
var addarticle = require("../model/article");
//
function adminListRender() {
    router.get('/', function(req, res, next) {
        if(req.session.istrue){
            addarticle.find({author:req.session.istrue.username},function(error,info){
                if(!error){
                    res.render('admin', { name: req.session.istrue.username,list:info });
                }
            });
        }else{
            res.redirect("/login");
        };
    });
}
adminListRender();
//
router.get("/logout",function(req,res){
    //注销
    req.session.destroy(function(error){
        if(!error){
            res.redirect("/login");
        }
    })
});
//
router.get('/:id', function(req, res, next) {
    addarticle.remove({_id:req.params.id},function(error,info){
        if(req.session.istrue){
            addarticle.find({author:req.session.istrue.username},function(error,info){
                if(!error){
                    res.render('admin', { name: req.session.istrue.username,list:info });
                }
            });
        }else{
            res.redirect("/login");
        };
    });
});
//
router.get("/revamp/:id",function(req,res){
        if(req.session.istrue){
            addarticle.find({_id:req.params.id},function(error,info){
                if(!error){
                    res.render('addarticle', { name: req.session.istrue.username,list:info,headline:'修改文章',isshow:true});
                }
            });
        }else{
            res.redirect("/login");
        };
});
module.exports = router;