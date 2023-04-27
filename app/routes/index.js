const UserAPI = require('./v1/user');

module.exports = function (app, cors) {
    app.use('/api/v1/user',cors, UserAPI);
}
