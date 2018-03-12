var express = require('express');
var router = express.Router();
var addarticle = require("../model/article");
var page = 0;
//
router.get('/', function(req, res, next) {
    page = 0;
    addarticle.find({},{__v:0},{skip:0,limit:3,sort:{ _id:-1}},function(error,info){
        if(!error){
            res.render('index', { list:info,page:1,isshow:true});
        }
    });
});
//
router.get('/next', function(req, res, next) {
    addarticle.count({},function(error,info){
        if(!error){
            if (page >= Math.floor(info/3)){
                page = Math.floor(info/3)
            }else{
                page++;
            };
            addarticle.find({},{__v:0},{skip:3*page,limit:3,sort:{ _id:-1}},function(error,info){
                if(!error){
                    res.render('index', { list:info,page:page+1,isshow:true});
                }
            });
        }
    })
});
//
router.get('/prev', function(req, res, next) {
    if(page == 0){
       page = 0;
    }else{
       page--;
    }
    addarticle.find({},{__v:0},{skip:3*page,limit:3,sort:{ _id:-1}},function(error,info){
        if(!error){
            res.render('index', { list:info,page:page+1,isshow:true});
        }
    });
});
//
function classify(obj) {
    router.get(obj.path, function(req, res, next) {
        page = 0;
        addarticle.find({classify:obj.classify},function(error,info){
            if(!error){
                res.render('index', { list:info,isshow:false});
            }
        });
    });
}
classify({path:'/html',classify:'HTML'});
classify({path:'/css',classify:'Css'});
classify({path:'/js',classify:'JavaScript'});
classify({path:'/mobile',classify:'移动端'});
classify({path:'/frame',classify:'框架'});
classify({path:'/other',classify:'其他'});
//
router.get('/like', function(req, res, next) {
    addarticle.update({_id:req.query.id},{$set:{like:req.query.num}},function(error,info){

    });
});

module.exports = router;
