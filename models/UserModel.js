module.exports = (sequelize, Sequelize) => {
    return sequelize.define('M_USER', {
        telp: {
            type: Sequelize.DECIMAL,
        },
        nama_lengkap: {
            type: Sequelize.STRING,
        },
        no_ktp: {
            type: Sequelize.STRING,
        },
        no_kk: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        tempat_lahir: {
            type: Sequelize.STRING,
        },
        tanggal_lahir: {
            type: Sequelize.STRING,
        },
        koordinator: {
            type: Sequelize.INTEGER,
        },
        provinsi: {
            type: Sequelize.STRING,
        },
        kabkota: {
            type: Sequelize.STRING,
        },
        kecamatan: {
            type: Sequelize.STRING,
        },
        kelurahan: {
            type: Sequelize.STRING,
        },
        rt: {
            type: Sequelize.STRING,
        },
        rw: {
            type: Sequelize.STRING,
        },
        alamat_lengkap: {
            type: Sequelize.STRING,
        },
        deleted_at: {
            type: Sequelize.STRING,
        },
    }, {
        freezeTableName: true,
        underscored: true
    });
}
