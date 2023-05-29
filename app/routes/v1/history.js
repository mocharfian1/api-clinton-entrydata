const router = require('express').Router();
const controllerHistoryApi = require('../../controllers/v1/history');

router.get('/', controllerHistoryApi.getHistory);

module.exports = router