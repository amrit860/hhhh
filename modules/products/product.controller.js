const ProductQuery = require('./product.query');

function get(req, res, next) {
//     const conditin ={};
// if(req.loggedInUser.rle != 1){
//     cndition.vender=req.loggedInUser._id;
// }
    ProductQuery
        .find({})
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })
        console.log("product get>>",res);
}

function post(req, res, next) {
    console.log('req.body', req.body);
    console.log("req.file>>",req.file);

    console.log("req.files>>",req.files);
    const data = req.body;
    // data.vender=req.loggedInUser._id;
    // if(req.fileErr){
    //     return next({
    //         msg:"invalid file format"
    //     })
    // }
    // if(req.file){
    //     data.images=[req.file.filename]
    // }
    ProductQuery
        .insert(data)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })
}
function getById(req, res, next) {
    var condition = { _id: req.params.id };
    ProductQuery
        .find(condition)
        .then(function (data) {
            res.status(200).json(data[0]);
        })
        .catch(function (err) {
            next(err);
        })
}


function search(req, res, next) {
    const condition = {};
    const data = req.body;
    const searchCondition = ProductQuery.map_product_req(condition, data);
    console.log('search >>', searchCondition);
    ProductQuery
        .find(condition)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })
}




function put(req, res, next) {
    const data = req.body;
    data.vender=req.loggedInUser._id;
    if(req.fileErr){
        return next({
            msg:"invalid file format"
        })
    }
    ProductQuery
        .update(req.params.id, data)
        .then(function (data) {
            if (req.file) {
                // remove existing file
                fs.unlink(path.join(process.cwd(), 'uploads/images/' + data.oldImages[0]), function (err, done) {
                    if (err) {
                        console.log('err deleting file');
                    }
                    else {
                        console.log('file removed');
                    }
                });
                console.log('data.oldImages', data.oldImages);

            }
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })
}
function remove(req, res, next) {
    ProductQuery
        .remove(req.params.id)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

module.exports = {
    get,
    getById,
    search,
    post,
    put,
    remove
}