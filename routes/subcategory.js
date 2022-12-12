var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer') /* GET home page. */
var fs = require('fs')

router.post('/submitsubcategory', upload.any(), function (req, res, next) {
    // console.log(req.body.categoryname)
    pool.query('insert into subcategory(categoryid, subcategoryname, priority, icon) values(?,?,?,?)', [req.body.categoryid, req.body.subcategoryname, req.body.priority, req.files[0].filename], function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Server Error' })
        }
        else {
            res.status(200).json({ status: true, message: 'SubCategory Submitted successfully' })
        }
    })

});
router.post('/edit_picture', upload.any(), function (req, res, next) {
    // console.log(req.body.categoryname)
    pool.query('update subcategory set icon=? where subcategoryid=?', [req.files[0].filename, req.body.subcategoryid], function (error, result) {
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

router.post('/edit_data', upload.any(), function (req, res, next) {
    // console.log(req.body.categoryname)
    pool.query('update subcategory set categoryid=?,subcategoryname=?,priority=? where subcategoryid=?', [req.body.categoryid, req.body.subcategoryname, req.body.priority, req.body.subcategoryid], function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Server Error' })
        }
        else {

            res.status(200).json({ status: true, message: 'SubCategory Submitted successfully' })
        }
    })

});
router.post('/delete_data', upload.any(), function (req, res, next) {
    // console.log(req.body.categoryname)
    pool.query('delete from subcategory  where subcategoryid=?', [req.body.subcategoryid], function (error, result) {
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

router.get('/display_all_subcategory', function (req, res, next) {
    // console.log(req.body.categoryname)
    pool.query('select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid)as categoryname from subcategory S', function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Server Error' })
        }
        else {
            console.log(result)
            res.status(200).json({ status: true, data: result })
        }
    })

});
router.post('/fetch_all_subcategory_by_category', function (req, res, next) {
    pool.query('select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S where S.categoryid=?', [req.body.categoryid], function (error, result) {
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

module.exports = router