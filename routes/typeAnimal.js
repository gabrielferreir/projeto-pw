var express = require('express');
var router = express.Router();
const controller = require('../controllers/typeAnimal');

/* GET users listing. */
router.post('/', controller.create);
router.put('/:id', controller.update);
router.get('/:id', controller.read);
router.get('/', controller.readAll);
router.delete('/:id', controller.remove);

module.exports = router;
