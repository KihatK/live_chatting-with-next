module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    User.associate = (db) => {
        db.User.hasMany(db.Chat);
    }

    return User;
}