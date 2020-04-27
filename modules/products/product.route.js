const ProductController = require('./product.controller');
const router = require('express').Router();
const upload =require("./../../middleware/imageuploader");



router.route('/')
    .get(ProductController.get)
    .post(upload.single("img"),ProductController.post);



router.route('/search')
    .get(ProductController.search)
    .post(ProductController.search);

router.route('/:id')
    .get(ProductController.getById)
    .put(upload.single("img"),ProductController.put)
    .delete(ProductController.remove);

module.exports = router;