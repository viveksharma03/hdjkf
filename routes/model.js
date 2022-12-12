var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer') 
var fs = require('fs')

router.post('/submitmodel',upload.any(),function(req,res,next){
    pool.query('insert into model( categoryid, subcategoryid,companyid, modelname,modelyear, icon) values(?,?,?,?,?,?)',[req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.modelname,req.body.modelyear,req.files[0].filename],function(error,result){
        if(error){
            console.log("error",error)
         res.status(500).json({status:false,message:'ServerError'})
        }
        else{
            console.log("result",result)
            res.status(200).json({status:true,message:'Company Submitted Successfully'})
        }
    
    })
    
    })

    router.get('/display_all_model',function(req,res,next){
        pool.query('select M.*,(select C.categoryname from category C where C.categoryid=M.categoryid) as categoryname , (select S.subcategoryname from subcategory S where S.subcategoryid=M.subcategoryid) as subcategoryname , (select P.companyname from company P where P.companyid=M.companyid) as companyname from model M',function(error,result){
            if (error) {
                console.log('error',error)
                res.status(500).json({status:false,message:'Server Error'})
            }
            else{
                console.log('result',result)
                res.status(200).json({status:true,data:result})
            }
        })
        
        })
        router.post('/edit_picture', upload.any(), function (req, res, next) {
            // console.log(req.body.categoryname)
            pool.query('update model set icon=? where modelid=?', [req.files[0].filename, req.body.modelid], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(500).json({ status: false, message: 'Server Error' })
                }
                else {
                    fs.unlinkSync(`D:/MERN/react/majorProject/backend/paynrent_backend/public/images/${req.body.oldicon}`)
                    res.status(200).json({ status: true, message: 'SubCategory Submitted successfully' })
                }
            })
        
        });

        router.post('/delete_data', upload.any(), function (req, res, next) {
            // console.log(req.body.categoryname)
            pool.query('delete from model  where modelid=?', [req.body.modelid], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(500).json({ status: false, message: 'Server Error' })
                }
                else {
                    fs.unlinkSync(`D:/MERN/react/majorProject/backend/paynrent_backend/public/images/${req.body.oldicon}`)
                    res.status(200).json({ status: true, message: 'SubCategory Submitted successfully' })
                }
            })
        
        });
        router.post('/edit_data', function (req, res, next) {
            // console.log(req.body.categoryname)
            pool.query('update model set categoryid=?,subcategoryid=?,companyid=?,modelname=?,modelyear=? where modelid=?', [req.body.categoryid, req.body.subcategoryid, req.body.companyid, req.body.modelname,req.body.modelyear,req.body.modelid], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(500).json({ status: false, message: 'Server Error' })
                }
                else {
        
                    res.status(200).json({ status: true, message: 'Model Updated successfully' })
                }
            })
        
        });
        router.post('/fetch_all_model_by_company', function (req, res, next) {
            // console.log(req.body.categoryname)
            pool.query('select * from model where companyid=?', [req.body.companyid], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(500).json({ status: false, message: 'Server Error', result: [] })
                }
                else {
                    console.log("result", result)
                    res.status(200).json({ status: true, result: result })
                }
            })
        
        });       
module.exports=router