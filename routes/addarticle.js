var express = require('express');
var router = express.Router();
var addarticle = require("../model/article");
router.get('/', function(req, res, next) {
        if(req.session.istrue){
            res.render('addarticle', { name: req.session.istrue.username,headline:'添加文章',isshow:false,list:[{title:'',content:''}]});
        }else{
            res.redirect("/login");
        }
});
//
router.post('/', function(req, res, next) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1>9 ?date.getMonth()+1 :'0'+(date.getMonth()+1);
    var day = date.getDate()>9 ?date.getDate() :'0'+date.getDate();
    addarticle.create({
        author:req.session.istrue.username,
        title:req.body.title,
        content:req.body.editor,
        classify:req.body.classify,
        time:year+'-'+month+'-'+day,
        comment:0,
        like:0
    },function(error,info){
        if(!error){
            res.redirect("/");
        }
    })
});
//
router.get('/revamp',function(req,res){
        addarticle.update({_id:req.query.id},{classify:req.query.classify,title:req.query.title,content:req.query.editor},function(error,info){
            if(!error){
               res.redirect('/admin');
            }
        });
});
module.exports = router;
