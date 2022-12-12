var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer') 
var fs = require('fs')
router.post('/submitcompany',upload.any(),function(req,res,next){
pool.query('insert into company( categoryid, subcategoryid, companyname, icon) values(?,?,?,?)',[req.body.categoryid,req.body.subcategoryid,req.body.companyname,req.files[0].filename],function(error,result){
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

router.get('/display_all_company',function(req,res,next){
pool.query('select C.*,(select P.categoryname from category P where P.categoryid=C.categoryid) as categoryname , (select S.subcategoryname from subcategory S where S.subcategoryid=C.subcategoryid) as subcategoryname from company C',function(error,result){
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
    pool.query('update company set icon=? where companyid=?', [req.files[0].filename, req.body.companyid], function (error, result) {
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
    pool.query('update company set categoryid=?,subcategoryid=?,companyname=? where companyid=?', [req.body.categoryid, req.body.subcategoryid, req.body.companyname,req.body.companyid], function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Server Error' })
        }
        else {

            res.status(200).json({ status: true, message: 'Model Updated successfully' })
        }
    })

});

router.post('/delete_data', upload.any(), function (req, res, next) {
    // console.log(req.body.categoryname)
    pool.query('delete from company  where companyid=?', [req.body.companyid], function (error, result) {
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


router.post('/fetch_all_company_by_subcategory', function (req, res, next) {
    pool.query('select * from company  where subcategoryid=?', [req.body.subcategoryid], function (error, result) {
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