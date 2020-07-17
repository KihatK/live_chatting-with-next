module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        owner: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    Room.associate = (db) => {
        db.Room.hasMany(db.Chat);
    }

    return Room;
}