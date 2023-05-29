const router = require('express').Router();
const controllerCameraApi = require('../../controllers/v1/camera');

router.post('/', controllerCameraApi.upload);

module.exports = router