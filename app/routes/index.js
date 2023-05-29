const UserAPI = require('./v1/user');
const CameraAPI = require('./v1/camera');
const HistoryAPI = require('./v1/history');

module.exports = function (app) {
    app.use('/api/v1/user', UserAPI);
    app.use('/api/v1/camera', CameraAPI);
    app.use('/api/v1/history', HistoryAPI);
}
