var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer') 
var fs = require('fs')
router.post('/submitvehicle',upload.any(),function(req,res,next){
    pool.query('insert into vehicle(categoryid, subcategoryid, companyid, modelid, vendorid, registrationnum, color, fueltype, rating, average, remark, capacity, itemstatus, feature, icon) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[ req.body.categoryid, req.body.subcategoryid, req.body.companyid, req.body.modelid, req.body.vendorid, req.body.registrationnum, req.body.color, req.body.fueltype, req.body.rating, req.body.average, req.body.remark, req.body.capacity, req.body.itemstatus, req.body.feature,req.files[0].filename],function(error,result){
        if(error){
            console.log("error",error)
         res.status(500).json({status:false,message:'ServerError'})
        }
        else{
            console.log("result",result)
            res.status(200).json({status:true,message:'Vehicle Submitted Successfully'})
        }
    })
    })

    router.get('/display_all_vehicle',function(req,res,next){
        pool.query('select V.*,(select C.categoryname from category C where C.categoryid=V.categoryid) as categoryname , (select S.subcategoryname from subcategory S where S.subcategoryid=V.subcategoryid) as subcategoryname , (select P.companyname from company P where P.companyid=V.companyid) as companyname, (select M.modelname from model M where M.modelid=V.modelid) as modelname from vehicle V',function(error,result){
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
            pool.query('update vehicle set icon=? where vehicleid=?', [req.files[0].filename, req.body.vehicleid], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(500).json({ status: false, message: 'Server Error' })
                }
                else {
                    fs.unlinkSync(`D:/MERN/react/majorProject/backend/paynrent_backend/public/images/${req.body.oldicon}`)
                    res.status(200).json({ status: true, message: 'Vehicle Submitted successfully' })
                }
            })
        
        });

        router.post('/edit_data', function (req, res, next) {
            // console.log(req.body.categoryname)
            pool.query('update vehicle set categoryid=?,subcategoryid=?,companyid=?,modelid=?, vendorid=?, registrationnum=?, color=?, fueltype=?, rating=?, average=?, remark=?, capacity=?, itemstatus=?, feature=? where vehicleid=?', [req.body.categoryid, req.body.subcategoryid, req.body.companyid,req.body.modelid, req.body.vendorid, req.body.registrationnum, req.body.color, req.body.fueltype, req.body.rating, req.body.average, req.body.remark, req.body.capacity, req.body.itemstatus, req.body.feature,req.body.vehicleid], function (error, result) {
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
            pool.query('delete from vehicle  where vehicleid=?', [req.body.vehicleid], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(500).json({ status: false, message: 'Server Error' })
                }
                else {
                    fs.unlinkSync(`D:/MERN/react/majorProject/backend/paynrent_backend/public/images/${req.body.oldicon}`)
                    res.status(200).json({ status: true, message: 'SVehicle Deleted successfully' })
                }
            })
        
        });
module.exports=router