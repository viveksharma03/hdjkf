var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer') /* GET home page. */
var fs=require('fs')
router.post('/categorysubmit', upload.any(), function (req, res, next) {
    // console.log(req.body.categoryname)
    pool.query('insert into category(categoryname,icon) values(?,?)', [req.body.categoryname, req.files[0].filename], function (error, result) {
        if (error) {
            // console.log(error)
            res.status(500).json({ status: false, message: 'Server Error' })
        }
        else {
            res.status(200).json({ status: true, message: 'Category Submitted successfully' })
        }
    })

});


router.post('/edit_picture', upload.any(), function (req, res, next) {
    // console.log(req.body.categoryname)
    pool.query('update  category set icon=? where categoryid=?', [req.files[0].filename,req.body.categoryid,], function (error, result) {
        if (error) {
            // console.log(error)
            res.status(500).json({ status: false, message: 'Server Error'})
        }
        else {
fs.unlinkSync(`D:/MERN/react/majorProject/backend/paynrent_backend/public/images/${req.body.oldicon}`)
            res.status(200).json({ status: true, message: 'Icon Updated successfully'})
        }
    })

});


router.post('/edit_data', function (req, res, next) {
    // console.log(req.body.categoryname)
    pool.query('update  category set categoryname=? where categoryid=?', [req.body.categoryname,req.body.categoryid,], function (error, result) {
        if (error) {
            // console.log(error)
            res.status(500).json({ status: false, message: 'Server Error'})
        }
        else {
            res.status(200).json({ status: true, message: 'Category Updated successfully'})
        }
    })

});


router.post('/delete_data', function (req, res, next) {
    // console.log(req.body.categoryname)
    pool.query('delete from category where categoryid=?', [req.body.categoryid], function (error, result) {
        if (error) {
            // console.log(error)
            res.status(500).json({ status: false, message: 'Server Error'})
        }
        else {
            fs.unlinkSync(`D:/MERN/react/majorProject/backend/paynrent_backend/public/images/${req.body.oldicon}`)
            res.status(200).json({ status: true, message: 'Category Deleted successfully'})
        }

    })

});


router.get('/display_all_category', function (req, res, next) {
    pool.query("select * from category", function (error, result) {
        console.log(result)
        if (error) {
            console.log("error", error)
            res.status(500).json({ status: false, message: 'Server Error' })

        }
        else {
            console.log(result)
            res.status(200).json({ status: true, data: result })

        }
    })

})


module.exports = router;
