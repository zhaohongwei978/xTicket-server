import sequelize from 'sequelize'
import db from '../config/mysqlConfig'

const user = db.defineModel('user', {
    id: {
        type: sequelize.STRING(45),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize.STRING(45),
        allowNull: false
    },
    age: {
        type: sequelize.INTEGER(11),
        allowNull: false
    },
    gender: {
        type: sequelize.STRING(15),
        allowNull: false
    },
    work: sequelize.STRING(45),
    email: sequelize.STRING(45),
    date: sequelize.DATE,
    type: sequelize.INTEGER(11),
}, {
    timestamps: false
})

export default user
