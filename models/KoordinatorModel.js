module.exports = (sequelize, Sequelize) => {
    return sequelize.define('M_KOORDINATOR', {
        code: {
            type: Sequelize.STRING,
        },
        nama_lengkap: {
            type: Sequelize.STRING,
        },
        alamat_lengkap: {
            type: Sequelize.STRING,
        },
    }, {
        freezeTableName: true,
        underscored: true
    });
}
