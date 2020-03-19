const ProductController = require('./product.controller');
const router = require('express').Router();



router.route('/')
    .get(ProductController.get)
    .post(ProductController.post);



router.route('/search')
    .get(ProductController.search)
    .post(ProductController.search);

router.route('/:id')
    .get(ProductController.getById)
    .put(ProductController.put)
    .delete(ProductController.remove);

module.exports = router;