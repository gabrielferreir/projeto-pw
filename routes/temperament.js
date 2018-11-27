var express = require('express');
var router = express.Router();
const controller = require('../controllers/temperament');

/* GET users listing. */
router.post('/', controller.create);
router.get('/', controller.read);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
