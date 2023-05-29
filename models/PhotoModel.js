module.exports = (sequelize, Sequelize) => {
    return sequelize.define('T_UPLOAD_PHOTO', {
        no_ktp:{
            type: Sequelize.STRING,
        },
        message:{
            type: Sequelize.STRING,
        },
        code:{
            type: Sequelize.STRING,
        },
        fieldname:{
            type: Sequelize.STRING,
        },
        originalname:{
            type: Sequelize.STRING,
        },
        encoding:{
            type: Sequelize.STRING,
        },
        mimetype:{
            type: Sequelize.STRING,
        },
        destination:{
            type: Sequelize.STRING,
        },
        filename:{
            type: Sequelize.STRING,
        },
        path:{
            type: Sequelize.STRING,
        },
        size:{
            type: Sequelize.STRING,
        },
        status:{
            type: Sequelize.STRING,
        }
    }, {
        freezeTableName: true,
        underscored: true
    });
}


