var express = require('express');
var router = express.Router();
var addarticle = require("../model/article");
//
router.get('/:id', function(req, res, next) {
    addarticle.find({_id:req.params.id},function(error,info){
        if(!error){
            res.render('detail', {list:info[0]});
        }
    });
});
//
module.exports = router;