module.exports = (sequelize, Sequelize) => {
    return sequelize.define('T_SESSION', {
        no_ktp: {
            type: Sequelize.STRING,
        },
        token: {
            type: Sequelize.STRING,
        },
        user_agent: {
            type: Sequelize.STRING,
        },
    }, {
        freezeTableName: true,
        underscored: true
    });
}
