const Sequelize = require('sequelize');
const { Model, DataTypes } = Sequelize;

module.exports = class Visit extends Model {
    static init(sequelize) {
        return super.init({
            visit_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            start_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            detail: {
                type: DataTypes.TEXT,
            }, 
            capacity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            underscored: true,
            modelName: 'Visit',
            tableName: 'visits',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Visit.belongsTo(db.Company, { foreignKey: 'company_id', targetKey: 'company_id' });
    }
};