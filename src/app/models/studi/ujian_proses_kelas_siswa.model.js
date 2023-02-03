module.exports = (sequelize, Sequelize) => {
    const ujian_proses_kelas_siswa = sequelize.define("ujian_proses_kelas_siswa", {
        // data
        hasil_akhir: {
            type: Sequelize.INT,
            allowNull: true,
        },

        // settings
        status: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "Aktif"
        },

        // relasi
        siswa_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        ujian_proses_kelas_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },

        // timestamp
        created_at: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updated_at: {
            field: 'updated_at',
            type: Sequelize.DATE,
        },
    }, {

        name: {
            singular: 'ujian_proses_kelas_siswa',
            plural: 'ujian_proses_kelas_siswa',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'ujian_proses_kelas_siswa',
        underscored: true,
        modelName: 'ujian_proses_kelas_siswa'

    });

    return ujian_proses_kelas_siswa;
};