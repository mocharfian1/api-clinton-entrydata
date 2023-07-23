const router = require('express').Router();
const controllerGDriveApi = require('../../controllers/v1/gdrive');

router.get('/', controllerGDriveApi.uploadToDrive);

module.exports = router