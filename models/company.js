const Sequelize = require('sequelize');
const { Model, DataTypes } = Sequelize;

module.exports = class Company extends Model {
    static init(sequelize) {
        return super.init({
            company_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
                // unique: true,
            },
            explanation: {
                type: DataTypes.TEXT,
            }, 
            website_url: {
                type: DataTypes.STRING,
            },
            logo_url: {
                type: DataTypes.STRING,
            },
        }, {
            sequelize,
            underscored: true,
            modelName: 'Company',
            tableName: 'companys',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Company.hasMany(db.Visit, { foreignKey: 'company_id', sourceKey: 'company_id' });
        db.Company.hasMany(db.Video, { foreignKey: 'company_id', sourceKey: 'company_id' });
    }
};