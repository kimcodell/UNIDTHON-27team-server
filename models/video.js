const Sequelize = require('sequelize');
const { Model, DataTypes } = Sequelize;

module.exports = class Video extends Model {
    static init(sequelize) {
        return super.init({
            video_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            thumbnails_image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            video_url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            underscored: true,
            modelName: 'Video',
            tableName: 'videos',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Visit.belongsTo(db.Company, { foreignKey: 'company_id', targetKey: 'company_id' });
    }
};