const router = require('express').Router();

const controllerUserApi = require('../../controllers/v1/user');

router.get('/list/all', controllerUserApi.getListAllUser);
router.post('/register/submit', controllerUserApi.registerUser);
router.get('/list/all', controllerUserApi.getListAllUser);

router.post('/login', controllerUserApi.loginUser);
router.post('/login/session', controllerUserApi.checkSessionSvc);

    router.get('/register/koordinator', controllerUserApi.getKoordinator);

module.exports = router
