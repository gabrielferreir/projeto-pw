var express = require('express');
var router = express.Router();
const controller = require('../controllers/size');

/* GET users listing. */
router.post('/', controller.create);
router.put('/:id', controller.update);
router.get('/', controller.read);
router.delete('/:id', controller.remove);

module.exports = router;
