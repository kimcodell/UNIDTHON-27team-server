const Sequelize = require('sequelize');
const { Model, DataTypes } = Sequelize;

module.exports = class Reservation extends Model {
    static init(sequelize) {
        return super.init({
            status: {
                type: DataTypes.ENUM('reserved', 'cancelled', 'done'),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'Reservation',
            tableName: 'reservations',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Visit.belongsToMany(db.User, { through: Reservation, foreignKey: 'visit_id' });
        db.User.belongsToMany(db.Visit, { through: Reservation, foreignKey: 'user_id' });
    }
};