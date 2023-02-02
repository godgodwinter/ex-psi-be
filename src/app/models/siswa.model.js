module.exports = (sequelize, Sequelize) => {
    const Siswa = sequelize.define("siswa", {
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        jk: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telp: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
        },
    }, {
        tableName: 'siswa',
        defaultScope: {
            attributes: { exclude: ['password'] },
        }

    });

    return Siswa;
};