var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer') /* GET home page. */
var fs=require('fs')

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

router.post('/fetch_all_subcategory_by_category', function (req, res, next) {
    pool.query('select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S where S.categoryid=?', [req.body.categoryid], function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Server Error', result: [] })
        }
        else {
            console.log("result", result)
            res.status(200).json({ status: true, data: result })
        }
    })

});

router.get('/display_all_cities', function (req, res, next) {
    pool.query("select * from cities", function (error, result) {
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
router.get('/all_feature', function (req, res, next) {
    pool.query("select * from featured", function (error, result) {
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