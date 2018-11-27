var express = require('express');
var router = express.Router();
const controller = require('../controllers/animal');

/* GET users listing. */
router.post('/', controller.create);
router.get('/my', controller.myAnimals);
router.put('/:id', controller.update);
router.get('/:id', controller.read);
router.get('/', controller.readAll);
router.delete('/:id', controller.remove);

module.exports = router;
