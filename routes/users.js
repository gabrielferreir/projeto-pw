var express = require('express');
var router = express.Router();
const controller = require('../controllers/users');

/* GET users listing. */
router.post('/', controller.create);
router.put('/:id', controller.update);
router.get('/:id', controller.read);
router.delete('/:id', controller.remove);
router.post('/login', controller.login);
router.get('/refazer/:token', controller.decode);

module.exports = router;
