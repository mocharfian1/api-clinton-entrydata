const UserAPI = require('./v1/user');
const CameraAPI = require('./v1/camera');
const HistoryAPI = require('./v1/history');
const GDriveAPI = require('./v1/gdrive');

module.exports = function (app) {
    app.use('/api/v1/user', UserAPI);
    app.use('/api/v1/camera', CameraAPI);
    app.use('/api/v1/history', HistoryAPI);
    app.use('/api/v1/upload_gdrive', GDriveAPI);
}
