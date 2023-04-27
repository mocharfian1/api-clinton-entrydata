const router = require('express').Router();

const controllerUserApi = require('../../controllers/v1/user');

router.get('/list/all', controllerUserApi.getListAllUser);
router.post('/register/submit', controllerUserApi.registerUser);
router.get('/list/all', controllerUserApi.getListAllUser);

module.exports = router
